"use client"

import type mapboxgl from "mapbox-gl"

import { useEffect, useId, useRef } from "react"
import { useMap } from "./hooks"
import type { MapPath } from "./types"

type MapPolygonProps = {
  coordinates: MapPath
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
  dashArray?: [number, number]
}

const DEFAULT_FILL_COLOR = "#3b82f6"
const DEFAULT_FILL_OPACITY = 0.4
const DEFAULT_STROKE_COLOR = "#3b82f6"
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_STROKE_OPACITY = 1

const getClosedCoordinates = (coords: MapPath): MapPath => {
  if (coords.length < 3) {
    return coords
  }

  const first = coords[0]
  const last = coords[coords.length - 1]

  if (first[0] === last[0] && first[1] === last[1]) {
    return coords
  }

  return [...coords, first]
}

export const MapPolygon = ({
  coordinates,
  fillColor = DEFAULT_FILL_COLOR,
  fillOpacity = DEFAULT_FILL_OPACITY,
  strokeColor = DEFAULT_STROKE_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeOpacity = DEFAULT_STROKE_OPACITY,
  dashArray,
}: MapPolygonProps) => {
  const { map, isLoaded } = useMap()
  const id = useId()
  const sourceId = `polygon-source-${id}`
  const fillLayerId = `polygon-fill-layer-${id}`
  const strokeLayerId = `polygon-stroke-layer-${id}`
  const initializedRef = useRef(false)

  const coordinatesRef = useRef(coordinates)
  const fillColorRef = useRef(fillColor)
  const fillOpacityRef = useRef(fillOpacity)
  const strokeColorRef = useRef(strokeColor)
  const strokeWidthRef = useRef(strokeWidth)
  const strokeOpacityRef = useRef(strokeOpacity)
  const dashArrayRef = useRef(dashArray)

  coordinatesRef.current = coordinates
  fillColorRef.current = fillColor
  fillOpacityRef.current = fillOpacity
  strokeColorRef.current = strokeColor
  strokeWidthRef.current = strokeWidth
  strokeOpacityRef.current = strokeOpacity
  dashArrayRef.current = dashArray

  useEffect(() => {
    if (!map) {
      return
    }

    const addLayers = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(sourceId)) {
        return
      }

      const closedCoordinates = getClosedCoordinates(coordinatesRef.current)

      mapInstance.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [closedCoordinates],
          },
        },
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

      mapInstance.addLayer(
        {
          id: fillLayerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": fillColorRef.current,
            "fill-opacity": fillOpacityRef.current,
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
            "line-color": strokeColorRef.current,
            "line-width": strokeWidthRef.current,
            "line-opacity": strokeOpacityRef.current,
            ...(dashArrayRef.current && { "line-dasharray": dashArrayRef.current }),
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
    if (!map || !initializedRef.current) {
      return
    }

    try {
      const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource
      if (source) {
        const closedCoordinates = getClosedCoordinates(coordinates)
        source.setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [closedCoordinates],
          },
        })
      }
    } catch {
      // Source may not exist during style transition
    }
  }, [map, sourceId, coordinates])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(fillLayerId)) {
        map.setPaintProperty(fillLayerId, "fill-color", fillColor)
        map.setPaintProperty(fillLayerId, "fill-opacity", fillOpacity)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, fillLayerId, fillColor, fillOpacity])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(strokeLayerId)) {
        map.setPaintProperty(strokeLayerId, "line-color", strokeColor)
        map.setPaintProperty(strokeLayerId, "line-width", strokeWidth)
        map.setPaintProperty(strokeLayerId, "line-opacity", strokeOpacity)
        if (dashArray) {
          map.setPaintProperty(strokeLayerId, "line-dasharray", dashArray)
        }
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, strokeLayerId, strokeColor, strokeWidth, strokeOpacity, dashArray])

  return null
}
