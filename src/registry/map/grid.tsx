"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useMap } from "./hooks"

type GridLabel = {
  id: string
  text: string
  position: { x: number; y: number }
  type: "lat" | "lng"
}

type GridLinesResult = {
  latitudeLines: GeoJSON.Feature<GeoJSON.LineString>[]
  longitudeLines: GeoJSON.Feature<GeoJSON.LineString>[]
  labels: GridLabel[]
}

type MapGridProps = {
  id?: string
  latitudeInterval?: number
  longitudeInterval?: number
  lineColor?: string
  lineOpacity?: number
  lineWidth?: number
  showLabels?: boolean
  labelColor?: string
  labelSize?: number
  labelBackground?: string
}

const DEFAULT_ID = "map-grid"
const DEFAULT_LATITUDE_INTERVAL = 10
const DEFAULT_LONGITUDE_INTERVAL = 10
const DEFAULT_LINE_COLOR = "#ffffff"
const DEFAULT_LINE_OPACITY = 0.3
const DEFAULT_LINE_WIDTH = 1
const DEFAULT_LABEL_COLOR = "#ffffff"
const DEFAULT_LABEL_SIZE = 10
const DEFAULT_LABEL_BACKGROUND = "rgba(0, 0, 0, 0.5)"

const MIN_LATITUDE = -90
const MAX_LATITUDE = 90
const MIN_RENDER_LATITUDE = -85
const MAX_RENDER_LATITUDE = 85
const LONGITUDE_WRAP = 180
const LONGITUDE_CYCLE = 360

const LABEL_OFFSET_X = 8
const LABEL_OFFSET_Y = 16
const LABEL_PADDING = "2px 4px"
const LABEL_BORDER_RADIUS = "2px"

const createLatitudeFeature = (latitude: number, west: number, east: number): GeoJSON.Feature<GeoJSON.LineString> => {
  return {
    type: "Feature",
    properties: { latitude },
    geometry: {
      type: "LineString",
      coordinates: [
        [west, latitude],
        [east, latitude],
      ],
    },
  }
}

const createLongitudeFeature = (
  longitude: number,
  south: number,
  north: number
): GeoJSON.Feature<GeoJSON.LineString> => {
  const normalizedLongitude =
    ((((longitude + LONGITUDE_WRAP) % LONGITUDE_CYCLE) + LONGITUDE_CYCLE) % LONGITUDE_CYCLE) - LONGITUDE_WRAP

  return {
    type: "Feature",
    properties: { longitude: normalizedLongitude },
    geometry: {
      type: "LineString",
      coordinates: [
        [longitude, Math.max(south, MIN_RENDER_LATITUDE)],
        [longitude, Math.min(north, MAX_RENDER_LATITUDE)],
      ],
    },
  }
}

const createLatitudeLabel = (latitude: number, west: number, map: mapboxgl.Map): GridLabel => {
  const point = map.project([west, latitude])
  const direction = latitude >= 0 ? "N" : "S"

  return {
    id: `lat-${latitude}`,
    text: `${Math.abs(latitude)}°${direction}`,
    position: { x: point.x + LABEL_OFFSET_X, y: point.y },
    type: "lat",
  }
}

const createLongitudeLabel = (longitude: number, north: number, map: mapboxgl.Map): GridLabel => {
  const normalizedLongitude =
    ((((longitude + LONGITUDE_WRAP) % LONGITUDE_CYCLE) + LONGITUDE_CYCLE) % LONGITUDE_CYCLE) - LONGITUDE_WRAP
  const point = map.project([longitude, north])
  const direction = normalizedLongitude >= 0 ? "E" : "W"

  return {
    id: `lng-${longitude}`,
    text: `${Math.abs(normalizedLongitude)}°${direction}`,
    position: { x: point.x, y: point.y + LABEL_OFFSET_Y },
    type: "lng",
  }
}

const generateGridLines = (
  bounds: mapboxgl.LngLatBounds,
  latitudeInterval: number,
  longitudeInterval: number,
  map: mapboxgl.Map
): GridLinesResult => {
  const latitudeLines: GeoJSON.Feature<GeoJSON.LineString>[] = []
  const longitudeLines: GeoJSON.Feature<GeoJSON.LineString>[] = []
  const labels: GridLabel[] = []

  const south = bounds.getSouth()
  const north = bounds.getNorth()
  const west = bounds.getWest()
  const east = bounds.getEast()

  const startLatitude = Math.floor(south / latitudeInterval) * latitudeInterval
  const endLatitude = Math.ceil(north / latitudeInterval) * latitudeInterval

  for (let latitude = startLatitude; latitude <= endLatitude; latitude += latitudeInterval) {
    if (latitude >= MIN_LATITUDE && latitude <= MAX_LATITUDE) {
      latitudeLines.push(createLatitudeFeature(latitude, west, east))
      labels.push(createLatitudeLabel(latitude, west, map))
    }
  }

  const startLongitude = Math.floor(west / longitudeInterval) * longitudeInterval
  const endLongitude = Math.ceil(east / longitudeInterval) * longitudeInterval

  for (let longitude = startLongitude; longitude <= endLongitude; longitude += longitudeInterval) {
    longitudeLines.push(createLongitudeFeature(longitude, south, north))
    labels.push(createLongitudeLabel(longitude, north, map))
  }

  return { latitudeLines, longitudeLines, labels }
}

const createLabelElement = (
  label: GridLabel,
  labelColor: string,
  labelSize: number,
  labelBackground: string
): HTMLDivElement => {
  const element = document.createElement("div")
  element.className = "map-grid-label"

  const translateX = label.type === "lng" ? "-50%" : "0"
  const translateY = label.type === "lat" ? "-50%" : "0"

  element.style.cssText = `
    position: absolute;
    left: ${label.position.x}px;
    top: ${label.position.y}px;
    color: ${labelColor};
    font-size: ${labelSize}px;
    background: ${labelBackground};
    padding: ${LABEL_PADDING};
    border-radius: ${LABEL_BORDER_RADIUS};
    pointer-events: none;
    white-space: nowrap;
    font-family: monospace;
    transform: translate(${translateX}, ${translateY});
  `
  element.textContent = label.text

  return element
}

const updateSourceData = (map: mapboxgl.Map, sourceId: string, geoJson: GeoJSON.FeatureCollection) => {
  const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource | undefined

  if (source) {
    source.setData(geoJson)
  } else {
    map.addSource(sourceId, { type: "geojson", data: geoJson })
  }
}

const addLineLayer = (
  map: mapboxgl.Map,
  layerId: string,
  sourceId: string,
  lineColor: string,
  lineOpacity: number,
  lineWidth: number
) => {
  if (map.getLayer(layerId)) {
    return
  }

  map.addLayer({
    id: layerId,
    type: "line",
    source: sourceId,
    paint: {
      "line-color": lineColor,
      "line-opacity": lineOpacity,
      "line-width": lineWidth,
    },
  })
}

const cleanupLayers = (
  map: mapboxgl.Map,
  latLayerId: string,
  lngLayerId: string,
  latSourceId: string,
  lngSourceId: string
) => {
  if (!map || !map.getStyle()) {
    return
  }

  if (map.getLayer(latLayerId)) {
    map.removeLayer(latLayerId)
  }
  if (map.getLayer(lngLayerId)) {
    map.removeLayer(lngLayerId)
  }
  if (map.getSource(latSourceId)) {
    map.removeSource(latSourceId)
  }
  if (map.getSource(lngSourceId)) {
    map.removeSource(lngSourceId)
  }
}

export const MapGrid = ({
  id = DEFAULT_ID,
  latitudeInterval = DEFAULT_LATITUDE_INTERVAL,
  longitudeInterval = DEFAULT_LONGITUDE_INTERVAL,
  lineColor = DEFAULT_LINE_COLOR,
  lineOpacity = DEFAULT_LINE_OPACITY,
  lineWidth = DEFAULT_LINE_WIDTH,
  showLabels = true,
  labelColor = DEFAULT_LABEL_COLOR,
  labelSize = DEFAULT_LABEL_SIZE,
  labelBackground = DEFAULT_LABEL_BACKGROUND,
}: MapGridProps) => {
  const { map, isLoaded } = useMap()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const lineColorRef = useRef(lineColor)
  lineColorRef.current = lineColor
  const lineOpacityRef = useRef(lineOpacity)
  lineOpacityRef.current = lineOpacity
  const lineWidthRef = useRef(lineWidth)
  lineWidthRef.current = lineWidth
  const showLabelsRef = useRef(showLabels)
  showLabelsRef.current = showLabels
  const labelColorRef = useRef(labelColor)
  labelColorRef.current = labelColor
  const labelSizeRef = useRef(labelSize)
  labelSizeRef.current = labelSize
  const labelBackgroundRef = useRef(labelBackground)
  labelBackgroundRef.current = labelBackground

  const latSourceId = `${id}-lat-source`
  const lngSourceId = `${id}-lng-source`
  const latLayerId = `${id}-lat-layer`
  const lngLayerId = `${id}-lng-layer`

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    if (latitudeInterval <= 0 || longitudeInterval <= 0) {
      return
    }

    let frameId: number

    const updateGrid = () => {
      cancelAnimationFrame(frameId)

      frameId = requestAnimationFrame(() => {
        const bounds = map.getBounds()
        if (!bounds) {
          return
        }

        const { latitudeLines, longitudeLines, labels } = generateGridLines(
          bounds,
          latitudeInterval,
          longitudeInterval,
          map
        )

        const latGeoJson: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: latitudeLines,
        }

        const lngGeoJson: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: longitudeLines,
        }

        updateSourceData(map, latSourceId, latGeoJson)
        updateSourceData(map, lngSourceId, lngGeoJson)
        addLineLayer(map, latLayerId, latSourceId, lineColorRef.current, lineOpacityRef.current, lineWidthRef.current)
        addLineLayer(map, lngLayerId, lngSourceId, lineColorRef.current, lineOpacityRef.current, lineWidthRef.current)

        if (containerRef.current) {
          containerRef.current.innerHTML = ""

          if (showLabelsRef.current) {
            for (const label of labels) {
              const element = createLabelElement(
                label,
                labelColorRef.current,
                labelSizeRef.current,
                labelBackgroundRef.current
              )
              containerRef.current?.appendChild(element)
            }
          }
        }
      })
    }

    updateGrid()

    map.on("move", updateGrid)

    return () => {
      cancelAnimationFrame(frameId)
      map.off("move", updateGrid)
      cleanupLayers(map, latLayerId, lngLayerId, latSourceId, lngSourceId)
    }
  }, [map, isLoaded, latitudeInterval, longitudeInterval, latSourceId, lngSourceId, latLayerId, lngLayerId])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    if (map.getLayer(latLayerId)) {
      map.setPaintProperty(latLayerId, "line-color", lineColor)
      map.setPaintProperty(latLayerId, "line-opacity", lineOpacity)
      map.setPaintProperty(latLayerId, "line-width", lineWidth)
    }
    if (map.getLayer(lngLayerId)) {
      map.setPaintProperty(lngLayerId, "line-color", lineColor)
      map.setPaintProperty(lngLayerId, "line-opacity", lineOpacity)
      map.setPaintProperty(lngLayerId, "line-width", lineWidth)
    }
  }, [map, isLoaded, lineColor, lineOpacity, lineWidth, latLayerId, lngLayerId])

  if (!isLoaded || !map) {
    return null
  }

  const mapContainer = map.getContainer()

  return createPortal(
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />,
    mapContainer
  )
}
