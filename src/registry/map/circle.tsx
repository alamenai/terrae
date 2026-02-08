"use client"

import type mapboxgl from "mapbox-gl"

import { useEffect, useId, useRef } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates, MapPath } from "./types"

type MapCircleProps = {
  center: MapCoordinates
  radius: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
  dashArray?: [number, number]
  segments?: number
  draggable?: boolean
  cursor?: string
  onDragStart?: (center: MapCoordinates) => void
  onDrag?: (center: MapCoordinates) => void
  onDragEnd?: (center: MapCoordinates) => void
}

const DEFAULT_FILL_COLOR = "#3b82f6"
const DEFAULT_FILL_OPACITY = 0
const DEFAULT_STROKE_COLOR = "#3b82f6"
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_STROKE_OPACITY = 1
const DEFAULT_SEGMENTS = 64
const EARTH_RADIUS_METERS = 6371008.8

const generateCircleCoordinates = (center: MapCoordinates, radiusMeters: number, segments: number): MapPath => {
  const [lng, lat] = center
  const coordinates: MapPath = []

  const latRadians = (lat * Math.PI) / 180
  const lngRadians = (lng * Math.PI) / 180
  const angularDistance = radiusMeters / EARTH_RADIUS_METERS

  for (let i = 0; i <= segments; i++) {
    const bearing = (2 * Math.PI * i) / segments

    const pointLat = Math.asin(
      Math.sin(latRadians) * Math.cos(angularDistance) +
        Math.cos(latRadians) * Math.sin(angularDistance) * Math.cos(bearing)
    )

    const pointLng =
      lngRadians +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRadians),
        Math.cos(angularDistance) - Math.sin(latRadians) * Math.sin(pointLat)
      )

    coordinates.push([(pointLng * 180) / Math.PI, (pointLat * 180) / Math.PI])
  }

  return coordinates
}

export const MapCircle = ({
  center,
  radius,
  fillColor = DEFAULT_FILL_COLOR,
  fillOpacity = DEFAULT_FILL_OPACITY,
  strokeColor = DEFAULT_STROKE_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeOpacity = DEFAULT_STROKE_OPACITY,
  dashArray,
  segments = DEFAULT_SEGMENTS,
  draggable = false,
  cursor,
  onDragStart,
  onDrag,
  onDragEnd,
}: MapCircleProps) => {
  const { map, isLoaded } = useMap()
  const id = useId()
  const sourceId = `circle-source-${id}`
  const fillLayerId = `circle-fill-layer-${id}`
  const strokeLayerId = `circle-stroke-layer-${id}`
  const initializedRef = useRef(false)
  const isDraggingRef = useRef(false)

  const centerRef = useRef(center)
  const radiusRef = useRef(radius)
  const segmentsRef = useRef(segments)
  const fillColorRef = useRef(fillColor)
  const fillOpacityRef = useRef(fillOpacity)
  const strokeColorRef = useRef(strokeColor)
  const strokeWidthRef = useRef(strokeWidth)
  const strokeOpacityRef = useRef(strokeOpacity)
  const dashArrayRef = useRef(dashArray)

  centerRef.current = center
  radiusRef.current = radius
  segmentsRef.current = segments
  fillColorRef.current = fillColor
  fillOpacityRef.current = fillOpacity
  strokeColorRef.current = strokeColor
  strokeWidthRef.current = strokeWidth
  strokeOpacityRef.current = strokeOpacity
  dashArrayRef.current = dashArray

  const onDragStartRef = useRef(onDragStart)
  const onDragRef = useRef(onDrag)
  const onDragEndRef = useRef(onDragEnd)
  onDragStartRef.current = onDragStart
  onDragRef.current = onDrag
  onDragEndRef.current = onDragEnd

  useEffect(() => {
    if (!map) {
      return
    }

    const addLayers = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(sourceId)) {
        return
      }

      const coordinates = generateCircleCoordinates(centerRef.current, radiusRef.current, segmentsRef.current)

      mapInstance.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
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
        const coordinates = generateCircleCoordinates(center, radius, segments)
        source.setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        })
      }
    } catch {
      // Source may not exist during style transition
    }
  }, [map, sourceId, center, radius, segments])

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

  useEffect(() => {
    if (!map || !isLoaded || !draggable) {
      return
    }

    const defaultCursor = cursor || "grab"
    const draggingCursor = "grabbing"

    const handleMouseEnter = () => {
      if (!isDraggingRef.current) {
        map.getCanvas().style.cursor = defaultCursor
      }
    }

    const handleMouseLeave = () => {
      if (!isDraggingRef.current) {
        map.getCanvas().style.cursor = ""
      }
    }

    const handleMouseDown = (e: mapboxgl.MapLayerMouseEvent) => {
      e.preventDefault()
      isDraggingRef.current = true
      map.getCanvas().style.cursor = draggingCursor
      map.dragPan.disable()

      const currentCenter = centerRef.current
      onDragStartRef.current?.(currentCenter)
    }

    const handleMouseMove = (e: mapboxgl.MapMouseEvent) => {
      if (!isDraggingRef.current) {
        return
      }

      const newCenter: MapCoordinates = [e.lngLat.lng, e.lngLat.lat]
      onDragRef.current?.(newCenter)
    }

    const handleMouseUp = (e: mapboxgl.MapMouseEvent) => {
      if (!isDraggingRef.current) {
        return
      }

      isDraggingRef.current = false
      map.getCanvas().style.cursor = defaultCursor
      map.dragPan.enable()

      const newCenter: MapCoordinates = [e.lngLat.lng, e.lngLat.lat]
      onDragEndRef.current?.(newCenter)
    }

    map.on("mouseenter", fillLayerId, handleMouseEnter)
    map.on("mouseleave", fillLayerId, handleMouseLeave)
    map.on("mousedown", fillLayerId, handleMouseDown)
    map.on("mousemove", handleMouseMove)
    map.on("mouseup", handleMouseUp)

    return () => {
      map.off("mouseenter", fillLayerId, handleMouseEnter)
      map.off("mouseleave", fillLayerId, handleMouseLeave)
      map.off("mousedown", fillLayerId, handleMouseDown)
      map.off("mousemove", handleMouseMove)
      map.off("mouseup", handleMouseUp)
      try {
        map.getCanvas().style.cursor = ""
        if (isDraggingRef.current) {
          map.dragPan.enable()
        }
      } catch {
        // Map may be destroyed during cleanup
      }
      isDraggingRef.current = false
    }
  }, [map, isLoaded, draggable, fillLayerId, cursor])

  return null
}
