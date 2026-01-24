"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { useMap } from "./hooks"
import type { MapCoordinates, MapPath } from "./types"

type MapArcAnimatedProps = {
  id: string
  origin: MapCoordinates
  destination: MapCoordinates
  color?: string
  width?: number
  opacity?: number
  dashArray?: [number, number]
  height?: number
  segments?: number
  duration?: number
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
  showMarker?: boolean
  markerColor?: string
  showOriginMarker?: boolean
  originMarkerColor?: string
  showDestinationMarker?: boolean
  destinationMarkerColor?: string
  onComplete?: () => void
}

const DEFAULT_COLOR = "#3b82f6"
const DEFAULT_WIDTH = 4
const DEFAULT_OPACITY = 1
const DEFAULT_HEIGHT = 0.3
const DEFAULT_SEGMENTS = 50
const DEFAULT_DURATION = 2000
const DEFAULT_AUTO_START = true
const DEFAULT_LOOP = false
const DEFAULT_LOOP_DELAY = 500
const DEFAULT_SHOW_MARKER = true
const DEFAULT_SHOW_ORIGIN_MARKER = true
const DEFAULT_SHOW_DESTINATION_MARKER = true
const MARKER_RADIUS = 8
const TRAVELING_MARKER_RADIUS = 6

const generateArcPath = (
  origin: MapCoordinates,
  destination: MapCoordinates,
  height: number,
  segments: number
): MapPath => {
  const path: MapPath = []

  const dx = destination[0] - origin[0]
  const dy = destination[1] - origin[1]
  const distance = Math.sqrt(dx * dx + dy * dy)

  const perpX = -dy / distance
  const perpY = dx / distance

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const offset = Math.sin(t * Math.PI) * distance * height

    path.push([origin[0] + dx * t + perpX * offset, origin[1] + dy * t + perpY * offset])
  }

  return path
}

export const MapArcAnimated = ({
  id,
  origin,
  destination,
  color = DEFAULT_COLOR,
  width = DEFAULT_WIDTH,
  opacity = DEFAULT_OPACITY,
  dashArray,
  height = DEFAULT_HEIGHT,
  segments = DEFAULT_SEGMENTS,
  duration = DEFAULT_DURATION,
  autoStart = DEFAULT_AUTO_START,
  loop = DEFAULT_LOOP,
  loopDelay = DEFAULT_LOOP_DELAY,
  showMarker = DEFAULT_SHOW_MARKER,
  markerColor,
  showOriginMarker = DEFAULT_SHOW_ORIGIN_MARKER,
  originMarkerColor,
  showDestinationMarker = DEFAULT_SHOW_DESTINATION_MARKER,
  destinationMarkerColor,
  onComplete,
}: MapArcAnimatedProps) => {
  const { map, isLoaded } = useMap()

  const initializedRef = useRef(false)
  const styleLoadedRef = useRef(false)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const startTimeRef = useRef<number>(0)

  const originRef = useRef(origin)
  const destinationRef = useRef(destination)
  const heightRef = useRef(height)
  const segmentsRef = useRef(segments)
  const durationRef = useRef(duration)
  const showMarkerRef = useRef(showMarker)
  const showOriginMarkerRef = useRef(showOriginMarker)
  const showDestinationMarkerRef = useRef(showDestinationMarker)
  const onCompleteRef = useRef(onComplete)
  const autoStartRef = useRef(autoStart)

  originRef.current = origin
  destinationRef.current = destination
  heightRef.current = height
  segmentsRef.current = segments
  durationRef.current = duration
  showMarkerRef.current = showMarker
  showOriginMarkerRef.current = showOriginMarker
  showDestinationMarkerRef.current = showDestinationMarker
  onCompleteRef.current = onComplete
  autoStartRef.current = autoStart

  const [isAnimating, setIsAnimating] = useState(false)

  const sourceId = `${id}-source`
  const layerId = `${id}-layer`
  const travelingMarkerSourceId = `${id}-traveling-marker-source`
  const travelingMarkerLayerId = `${id}-traveling-marker`
  const originMarkerSourceId = `${id}-origin-marker-source`
  const originMarkerLayerId = `${id}-origin-marker`
  const destinationMarkerSourceId = `${id}-destination-marker-source`
  const destinationMarkerLayerId = `${id}-destination-marker`

  useEffect(() => {
    if (!map) {
      return
    }

    const addLineSource = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(sourceId)) {
        return
      }

      mapInstance.addSource(sourceId, {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } },
      })

      mapInstance.addLayer({
        id: layerId,
        type: "line",
        source: sourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": color,
          "line-width": width,
          "line-opacity": opacity,
          ...(dashArray && { "line-dasharray": dashArray }),
        },
      })
    }

    const addOriginMarker = (mapInstance: mapboxgl.Map) => {
      if (!showOriginMarkerRef.current || mapInstance.getSource(originMarkerSourceId)) {
        return
      }

      mapInstance.addSource(originMarkerSourceId, {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: originRef.current } },
      })

      mapInstance.addLayer({
        id: originMarkerLayerId,
        type: "circle",
        source: originMarkerSourceId,
        paint: {
          "circle-radius": MARKER_RADIUS,
          "circle-color": originMarkerColor || color,
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
        },
      })
    }

    const addDestinationMarker = (mapInstance: mapboxgl.Map) => {
      if (!showDestinationMarkerRef.current || mapInstance.getSource(destinationMarkerSourceId)) {
        return
      }

      mapInstance.addSource(destinationMarkerSourceId, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      })

      mapInstance.addLayer({
        id: destinationMarkerLayerId,
        type: "circle",
        source: destinationMarkerSourceId,
        paint: {
          "circle-radius": MARKER_RADIUS,
          "circle-color": destinationMarkerColor || color,
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
        },
      })
    }

    const addTravelingMarker = (mapInstance: mapboxgl.Map) => {
      if (!showMarkerRef.current || mapInstance.getSource(travelingMarkerSourceId)) {
        return
      }

      mapInstance.addSource(travelingMarkerSourceId, {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: originRef.current } },
      })

      mapInstance.addLayer({
        id: travelingMarkerLayerId,
        type: "circle",
        source: travelingMarkerSourceId,
        paint: {
          "circle-radius": TRAVELING_MARKER_RADIUS,
          "circle-color": markerColor || color,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })
    }

    const addSources = (mapInstance: mapboxgl.Map) => {
      try {
        addLineSource(mapInstance)
        addOriginMarker(mapInstance)
        addDestinationMarker(mapInstance)
        addTravelingMarker(mapInstance)
        initializedRef.current = true
      } catch (error) {
        console.error("Error adding arc animated:", error)
      }
    }

    const cleanupResources = (mapInstance: mapboxgl.Map) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
      }

      try {
        if (mapInstance.getLayer(layerId)) {
          mapInstance.removeLayer(layerId)
        }
        if (mapInstance.getLayer(travelingMarkerLayerId)) {
          mapInstance.removeLayer(travelingMarkerLayerId)
        }
        if (mapInstance.getLayer(originMarkerLayerId)) {
          mapInstance.removeLayer(originMarkerLayerId)
        }
        if (mapInstance.getLayer(destinationMarkerLayerId)) {
          mapInstance.removeLayer(destinationMarkerLayerId)
        }
        if (mapInstance.getSource(sourceId)) {
          mapInstance.removeSource(sourceId)
        }
        if (mapInstance.getSource(travelingMarkerSourceId)) {
          mapInstance.removeSource(travelingMarkerSourceId)
        }
        if (mapInstance.getSource(originMarkerSourceId)) {
          mapInstance.removeSource(originMarkerSourceId)
        }
        if (mapInstance.getSource(destinationMarkerSourceId)) {
          mapInstance.removeSource(destinationMarkerSourceId)
        }
      } catch {
        // Already removed
      }

      initializedRef.current = false
    }

    const handleStyleLoad = () => {
      styleLoadedRef.current = true
      initializedRef.current = false
      addSources(map)

      if (autoStartRef.current) {
        setIsAnimating(true)
      }
    }

    const handleStyleDataLoading = () => {
      styleLoadedRef.current = false
    }

    if (isLoaded && !initializedRef.current) {
      addSources(map)
      styleLoadedRef.current = true
    }

    map.on("style.load", handleStyleLoad)
    map.on("styledataloading", handleStyleDataLoading)

    return () => {
      map.off("style.load", handleStyleLoad)
      map.off("styledataloading", handleStyleDataLoading)
      cleanupResources(map)
    }
  }, [
    map,
    isLoaded,
    id,
    sourceId,
    layerId,
    travelingMarkerSourceId,
    travelingMarkerLayerId,
    originMarkerSourceId,
    originMarkerLayerId,
    destinationMarkerSourceId,
    destinationMarkerLayerId,
    color,
    width,
    opacity,
    dashArray,
    markerColor,
    originMarkerColor,
    destinationMarkerColor,
  ])

  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) {
      return
    }
    if (!autoStart && !isAnimating) {
      return
    }

    startTimeRef.current = Date.now()

    const arcPath = generateArcPath(originRef.current, destinationRef.current, heightRef.current, segmentsRef.current)

    const updateLineSource = (coordinates: MapPath) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        const lineSource = map.getSource(sourceId) as mapboxgl.GeoJSONSource
        if (lineSource) {
          lineSource.setData({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates },
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const updateTravelingMarkerPosition = (position: MapCoordinates) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        const markerSource = map.getSource(travelingMarkerSourceId) as mapboxgl.GeoJSONSource
        if (markerSource) {
          markerSource.setData({
            type: "Feature",
            properties: {},
            geometry: { type: "Point", coordinates: position },
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const updateDestinationMarker = (visible: boolean) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        const markerSource = map.getSource(destinationMarkerSourceId) as mapboxgl.GeoJSONSource
        if (markerSource) {
          markerSource.setData({
            type: "FeatureCollection",
            features: visible
              ? [{ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: destinationRef.current } }]
              : [],
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      setIsAnimating(false)
    }

    const animate = () => {
      if (!map || !styleLoadedRef.current) {
        stopAnimation()
        return
      }

      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(elapsed / durationRef.current, 1)
      const pointIndex = Math.floor(progress * (arcPath.length - 1)) + 1
      const visiblePath = arcPath.slice(0, pointIndex)

      const segmentProgress = (progress * (arcPath.length - 1)) % 1
      if (pointIndex < arcPath.length && segmentProgress > 0) {
        const start = arcPath[pointIndex - 1]
        const end = arcPath[pointIndex]
        visiblePath.push([
          start[0] + (end[0] - start[0]) * segmentProgress,
          start[1] + (end[1] - start[1]) * segmentProgress,
        ])
      }

      try {
        updateLineSource(visiblePath)

        if (showMarkerRef.current && visiblePath.length > 0) {
          updateTravelingMarkerPosition(visiblePath[visiblePath.length - 1])
        }

        if (progress >= 1 && showDestinationMarkerRef.current) {
          updateDestinationMarker(true)
        }
      } catch {
        stopAnimation()
        return
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      setIsAnimating(false)
      onCompleteRef.current?.()

      if (loop) {
        loopTimeoutRef.current = setTimeout(() => {
          updateLineSource([])
          updateDestinationMarker(false)
          setIsAnimating(true)
        }, loopDelay)
      }
    }

    setIsAnimating(true)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
      }
    }
  }, [
    map,
    isLoaded,
    id,
    sourceId,
    travelingMarkerSourceId,
    destinationMarkerSourceId,
    autoStart,
    loop,
    loopDelay,
    isAnimating,
  ])

  return null
}

export const useArcAnimatedControl = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return {
    isPlaying,
    start: () => setIsPlaying(true),
    stop: () => setIsPlaying(false),
    toggle: () => setIsPlaying((prev) => !prev),
  }
}
