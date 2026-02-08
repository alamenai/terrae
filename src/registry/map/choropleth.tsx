"use client"

import type mapboxgl from "mapbox-gl"

import { useEffect, useId, useRef } from "react"
import { useMap } from "./hooks"

type ChoroplethColorStop = {
  value: number
  color: string
}

type ChoroplethColorScale = {
  stops: ChoroplethColorStop[]
  interpolation?: "linear" | "step"
  nullColor?: string
}

type ChoroplethFeature<P extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties> = GeoJSON.Feature<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  P
>

type ChoroplethData<P extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties> =
  | string
  | GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, P>

type ChoroplethClickEvent<P extends GeoJSON.GeoJsonProperties> = {
  feature: ChoroplethFeature<P>
  value: number | null
  coordinates: [number, number]
}

type ChoroplethHoverEvent<P extends GeoJSON.GeoJsonProperties> = {
  feature: ChoroplethFeature<P> | null
  value: number | null
  coordinates: [number, number] | null
}

type MapChoroplethProps<P extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties> = {
  data: ChoroplethData<P>
  valueProperty: keyof P | string
  colorScale: ChoroplethColorScale
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
  hoverEnabled?: boolean
  hoverFillOpacity?: number
  hoverStrokeColor?: string
  hoverStrokeWidth?: number
  neonAnimated?: boolean
  neonColors?: string[]
  neonDuration?: number
  onClick?: (event: ChoroplethClickEvent<P>) => void
  onHover?: (event: ChoroplethHoverEvent<P>) => void
}

const DEFAULT_FILL_OPACITY = 0.8
const DEFAULT_STROKE_COLOR = "#ffffff"
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_STROKE_OPACITY = 1
const DEFAULT_NULL_COLOR = "#cccccc"
const DEFAULT_HOVER_FILL_OPACITY = 1
const DEFAULT_HOVER_STROKE_COLOR = "#000000"
const DEFAULT_HOVER_STROKE_WIDTH = 4
const DEFAULT_NEON_COLORS = ["#00ffff", "#a855f7", "#ec4899", "#f97316", "#00ffff"]
const DEFAULT_NEON_DURATION = 8000

const buildColorExpression = (
  valueProperty: string,
  colorScale: ChoroplethColorScale
): mapboxgl.Expression | string => {
  const { stops, interpolation = "linear", nullColor = DEFAULT_NULL_COLOR } = colorScale

  if (stops.length === 0) {
    return nullColor
  }

  const sortedStops = [...stops].sort((a, b) => {
    return a.value - b.value
  })

  if (interpolation === "step") {
    const stepArgs: (string | number | mapboxgl.Expression)[] = [["get", valueProperty], nullColor]

    sortedStops.forEach((stop) => {
      stepArgs.push(stop.value, stop.color)
    })

    return ["step", ...stepArgs] as mapboxgl.Expression
  }

  const interpArgs: (string | number | mapboxgl.Expression)[] = []
  sortedStops.forEach((stop) => {
    interpArgs.push(stop.value, stop.color)
  })

  return [
    "case",
    ["==", ["get", valueProperty], null],
    nullColor,
    ["!", ["has", valueProperty]],
    nullColor,
    ["interpolate", ["linear"], ["get", valueProperty], ...interpArgs],
  ] as mapboxgl.Expression
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return [0, 0, 0]
  }
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b]
    .map((x) => {
      const hex = Math.round(x).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    })
    .join("")}`
}

const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  const r = rgb1[0] + (rgb2[0] - rgb1[0]) * factor
  const g = rgb1[1] + (rgb2[1] - rgb1[1]) * factor
  const b = rgb1[2] + (rgb2[2] - rgb1[2]) * factor
  return rgbToHex(r, g, b)
}

export const MapChoropleth = <P extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties>({
  data,
  valueProperty,
  colorScale,
  fillOpacity = DEFAULT_FILL_OPACITY,
  strokeColor = DEFAULT_STROKE_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeOpacity = DEFAULT_STROKE_OPACITY,
  hoverEnabled = false,
  hoverFillOpacity = DEFAULT_HOVER_FILL_OPACITY,
  hoverStrokeColor = DEFAULT_HOVER_STROKE_COLOR,
  hoverStrokeWidth = DEFAULT_HOVER_STROKE_WIDTH,
  neonAnimated = false,
  neonColors = DEFAULT_NEON_COLORS,
  neonDuration = DEFAULT_NEON_DURATION,
  onClick,
  onHover,
}: MapChoroplethProps<P>) => {
  const { map, isLoaded } = useMap()
  const id = useId()
  const sourceId = `choropleth-source-${id}`
  const fillLayerId = `choropleth-fill-layer-${id}`
  const strokeLayerId = `choropleth-stroke-layer-${id}`
  const initializedRef = useRef(false)
  const hoveredFeatureIdRef = useRef<string | number | null>(null)

  const dataRef = useRef(data)
  const valuePropertyRef = useRef(valueProperty)
  const colorScaleRef = useRef(colorScale)
  const fillOpacityRef = useRef(fillOpacity)
  const strokeColorRef = useRef(strokeColor)
  const strokeWidthRef = useRef(strokeWidth)
  const strokeOpacityRef = useRef(strokeOpacity)
  const hoverEnabledRef = useRef(hoverEnabled)
  const hoverFillOpacityRef = useRef(hoverFillOpacity)
  const hoverStrokeColorRef = useRef(hoverStrokeColor)
  const hoverStrokeWidthRef = useRef(hoverStrokeWidth)
  const onClickRef = useRef(onClick)
  const onHoverRef = useRef(onHover)
  const neonAnimatedRef = useRef(neonAnimated)
  const neonColorsRef = useRef(neonColors)
  const neonDurationRef = useRef(neonDuration)
  const animationFrameRef = useRef<number | undefined>(undefined)

  dataRef.current = data
  valuePropertyRef.current = valueProperty
  colorScaleRef.current = colorScale
  fillOpacityRef.current = fillOpacity
  strokeColorRef.current = strokeColor
  strokeWidthRef.current = strokeWidth
  strokeOpacityRef.current = strokeOpacity
  hoverEnabledRef.current = hoverEnabled
  hoverFillOpacityRef.current = hoverFillOpacity
  hoverStrokeColorRef.current = hoverStrokeColor
  hoverStrokeWidthRef.current = hoverStrokeWidth
  onClickRef.current = onClick
  onHoverRef.current = onHover
  neonAnimatedRef.current = neonAnimated
  neonColorsRef.current = neonColors
  neonDurationRef.current = neonDuration

  useEffect(() => {
    if (!map) {
      return
    }

    const addLayers = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(sourceId)) {
        return
      }

      mapInstance.addSource(sourceId, {
        type: "geojson",
        data: dataRef.current,
        generateId: true,
      })

      const layers = mapInstance.getStyle().layers
      let firstSymbolId: string | undefined
      if (layers) {
        for (const layer of layers) {
          if (layer.type === "symbol") {
            firstSymbolId = layer.id
            break
          }
        }
      }

      const colorExpression = buildColorExpression(String(valuePropertyRef.current), colorScaleRef.current)

      const initialFillColor = neonAnimatedRef.current ? neonColorsRef.current[0] || "#00ffff" : colorExpression

      mapInstance.addLayer(
        {
          id: fillLayerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": initialFillColor,
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              hoverFillOpacityRef.current,
              fillOpacityRef.current,
            ],
          },
        },
        firstSymbolId
      )

      mapInstance.addLayer(
        {
          id: strokeLayerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              hoverStrokeColorRef.current,
              strokeColorRef.current,
            ],
            "line-width": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              hoverStrokeWidthRef.current,
              strokeWidthRef.current,
            ],
            "line-opacity": strokeOpacityRef.current,
          },
        },
        firstSymbolId
      )

      initializedRef.current = true
    }

    const cleanupLayers = (mapInstance: mapboxgl.Map) => {
      try {
        if (mapInstance.getLayer(strokeLayerId)) {
          mapInstance.removeLayer(strokeLayerId)
        }
        if (mapInstance.getLayer(fillLayerId)) {
          mapInstance.removeLayer(fillLayerId)
        }
        if (mapInstance.getSource(sourceId)) {
          mapInstance.removeSource(sourceId)
        }
      } catch {
        // Layers may already be removed
      }
      initializedRef.current = false
    }

    const handleStyleLoad = () => {
      initializedRef.current = false
      addLayers(map)
    }

    if (isLoaded && !initializedRef.current) {
      addLayers(map)
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      cleanupLayers(map)
    }
  }, [map, isLoaded, sourceId, fillLayerId, strokeLayerId])

  useEffect(() => {
    if (!map || !initializedRef.current || typeof data === "string") {
      return
    }

    try {
      const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource
      if (source) {
        source.setData(data)
      }
    } catch {
      // Source may not exist during style transition
    }
  }, [map, sourceId, data])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      const colorExpression = buildColorExpression(String(valueProperty), colorScale)

      if (map.getLayer(fillLayerId)) {
        map.setPaintProperty(fillLayerId, "fill-color", colorExpression)
        map.setPaintProperty(fillLayerId, "fill-opacity", [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          hoverFillOpacity,
          fillOpacity,
        ])
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, fillLayerId, valueProperty, colorScale, fillOpacity, hoverFillOpacity])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(strokeLayerId)) {
        map.setPaintProperty(strokeLayerId, "line-color", [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          hoverStrokeColor,
          strokeColor,
        ])
        map.setPaintProperty(strokeLayerId, "line-width", [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          hoverStrokeWidth,
          strokeWidth,
        ])
        map.setPaintProperty(strokeLayerId, "line-opacity", strokeOpacity)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, strokeLayerId, strokeColor, strokeWidth, strokeOpacity, hoverStrokeColor, hoverStrokeWidth])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    const handleClick = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.GeoJSONFeature[] }) => {
      if (!onClickRef.current || !e.features || e.features.length === 0) {
        return
      }

      const mapFeature = e.features[0]
      const properties = (mapFeature.properties ?? {}) as NonNullable<P>
      const value = properties[String(valuePropertyRef.current) as string] as number | null

      const feature: ChoroplethFeature<P> = {
        type: "Feature",
        geometry: mapFeature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
        properties: properties as P,
      }

      onClickRef.current({
        feature,
        value: value ?? null,
        coordinates: [e.lngLat.lng, e.lngLat.lat],
      })
    }

    const handleMouseMove = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.GeoJSONFeature[] }) => {
      if (!e.features || e.features.length === 0) {
        if (hoveredFeatureIdRef.current !== null) {
          map.setFeatureState({ source: sourceId, id: hoveredFeatureIdRef.current }, { hover: false })
          hoveredFeatureIdRef.current = null

          if (onHoverRef.current) {
            onHoverRef.current({
              feature: null,
              value: null,
              coordinates: null,
            })
          }
        }
        return
      }

      const mapFeature = e.features[0]

      if (hoverEnabledRef.current && mapFeature.id !== undefined) {
        if (hoveredFeatureIdRef.current !== null && hoveredFeatureIdRef.current !== mapFeature.id) {
          map.setFeatureState({ source: sourceId, id: hoveredFeatureIdRef.current }, { hover: false })
        }

        map.setFeatureState({ source: sourceId, id: mapFeature.id }, { hover: true })
        hoveredFeatureIdRef.current = mapFeature.id
      }

      if (onHoverRef.current) {
        const properties = (mapFeature.properties ?? {}) as NonNullable<P>
        const value = properties[String(valuePropertyRef.current) as string] as number | null

        const feature: ChoroplethFeature<P> = {
          type: "Feature",
          geometry: mapFeature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
          properties: properties as P,
        }

        onHoverRef.current({
          feature,
          value: value ?? null,
          coordinates: [e.lngLat.lng, e.lngLat.lat],
        })
      }
    }

    const handleMouseLeave = () => {
      if (hoveredFeatureIdRef.current !== null) {
        map.setFeatureState({ source: sourceId, id: hoveredFeatureIdRef.current }, { hover: false })
        hoveredFeatureIdRef.current = null
      }

      if (onHoverRef.current) {
        onHoverRef.current({
          feature: null,
          value: null,
          coordinates: null,
        })
      }
    }

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer"
    }

    const handleMouseLeaveCanvas = () => {
      map.getCanvas().style.cursor = ""
    }

    map.on("click", fillLayerId, handleClick)
    map.on("mousemove", fillLayerId, handleMouseMove)
    map.on("mouseleave", fillLayerId, handleMouseLeave)
    map.on("mouseenter", fillLayerId, handleMouseEnter)
    map.on("mouseleave", fillLayerId, handleMouseLeaveCanvas)

    return () => {
      map.off("click", fillLayerId, handleClick)
      map.off("mousemove", fillLayerId, handleMouseMove)
      map.off("mouseleave", fillLayerId, handleMouseLeave)
      map.off("mouseenter", fillLayerId, handleMouseEnter)
      map.off("mouseleave", fillLayerId, handleMouseLeaveCanvas)
    }
  }, [map, fillLayerId, sourceId])

  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current || !neonAnimated) {
      return
    }

    const colors = neonColorsRef.current
    if (colors.length < 2) {
      return
    }

    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const duration = neonDurationRef.current
      const progress = (elapsed % duration) / duration
      const totalSegments = colors.length - 1
      const segmentProgress = progress * totalSegments
      const currentSegment = Math.floor(segmentProgress)
      const segmentFactor = segmentProgress - currentSegment
      const colorIndex = Math.min(currentSegment, colors.length - 2)
      const currentColor = interpolateColor(colors[colorIndex], colors[colorIndex + 1], segmentFactor)

      try {
        if (map.getLayer(fillLayerId)) {
          map.setPaintProperty(fillLayerId, "fill-color", currentColor)
        }
      } catch {
        // Layer may not exist
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [map, isLoaded, fillLayerId, neonAnimated])

  return null
}

export type {
  ChoroplethColorStop,
  ChoroplethColorScale,
  ChoroplethFeature,
  ChoroplethData,
  ChoroplethClickEvent,
  ChoroplethHoverEvent,
  MapChoroplethProps,
}
