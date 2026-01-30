"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type mapboxgl from "mapbox-gl"
import { mapgl } from "./map-library"
import { useMap } from "./hooks"
import type { MapCoordinates, MapPath } from "./types"

type HeadType = "none" | "circle" | "square" | "arrow"

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
  headType?: HeadType
  headSize?: number
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
const DEFAULT_HEAD_TYPE: HeadType = "circle"
const DEFAULT_HEAD_SIZE = 16
const DEFAULT_SHOW_ORIGIN_MARKER = false
const DEFAULT_SHOW_DESTINATION_MARKER = false
const MARKER_RADIUS = 8

type HeadSvgProps = {
  type: HeadType
  size: number
  color: string
}

const HeadSvg = ({ type, size, color }: HeadSvgProps) => {
  if (type === "none") {
    return null
  }

  if (type === "arrow") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <polygon points="28,16 8,4 8,28" fill={color} />
      </svg>
    )
  }

  if (type === "square") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" fill={color} />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill={color} stroke="white" strokeWidth="3" />
    </svg>
  )
}

const calculateBearing = (from: MapCoordinates, to: MapCoordinates): number => {
  const dLon = ((to[0] - from[0]) * Math.PI) / 180
  const lat1 = (from[1] * Math.PI) / 180
  const lat2 = (to[1] * Math.PI) / 180

  const y = Math.sin(dLon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)

  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

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
  headType = DEFAULT_HEAD_TYPE,
  headSize = DEFAULT_HEAD_SIZE,
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
  const htmlMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const markerElementRef = useRef<HTMLDivElement | null>(null)

  const originRef = useRef(origin)
  const destinationRef = useRef(destination)
  const heightRef = useRef(height)
  const segmentsRef = useRef(segments)
  const durationRef = useRef(duration)
  const headTypeRef = useRef(headType)
  const showOriginMarkerRef = useRef(showOriginMarker)
  const showDestinationMarkerRef = useRef(showDestinationMarker)
  const onCompleteRef = useRef(onComplete)
  const autoStartRef = useRef(autoStart)

  originRef.current = origin
  destinationRef.current = destination
  heightRef.current = height
  segmentsRef.current = segments
  durationRef.current = duration
  headTypeRef.current = headType
  showOriginMarkerRef.current = showOriginMarker
  showDestinationMarkerRef.current = showDestinationMarker
  onCompleteRef.current = onComplete
  autoStartRef.current = autoStart

  const [isAnimating, setIsAnimating] = useState(false)
  const [isMarkerMounted, setIsMarkerMounted] = useState(false)

  const sourceId = `${id}-source`
  const layerId = `${id}-layer`
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

    const addHeadMarker = (mapInstance: mapboxgl.Map) => {
      if (headTypeRef.current === "none" || htmlMarkerRef.current) {
        return
      }

      const el = document.createElement("div")
      el.style.display = "flex"
      el.style.alignItems = "center"
      el.style.justifyContent = "center"

      markerElementRef.current = el
      htmlMarkerRef.current = new mapgl.Marker({
        element: el,
        rotationAlignment: "map",
        pitchAlignment: "map",
        anchor: "center",
      })
        .setLngLat(originRef.current)
        .addTo(mapInstance)
      setIsMarkerMounted(true)
    }

    const addSources = (mapInstance: mapboxgl.Map) => {
      try {
        addLineSource(mapInstance)
        addOriginMarker(mapInstance)
        addDestinationMarker(mapInstance)
        addHeadMarker(mapInstance)
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

      if (htmlMarkerRef.current) {
        htmlMarkerRef.current.remove()
        htmlMarkerRef.current = null
      }

      try {
        if (mapInstance.getLayer(layerId)) {
          mapInstance.removeLayer(layerId)
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
        if (mapInstance.getSource(originMarkerSourceId)) {
          mapInstance.removeSource(originMarkerSourceId)
        }
        if (mapInstance.getSource(destinationMarkerSourceId)) {
          mapInstance.removeSource(destinationMarkerSourceId)
        }
      } catch {
        // Already removed
      }

      markerElementRef.current = null
      setIsMarkerMounted(false)
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
    originMarkerSourceId,
    originMarkerLayerId,
    destinationMarkerSourceId,
    destinationMarkerLayerId,
    color,
    width,
    opacity,
    dashArray,
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

    const updateHeadPosition = (position: MapCoordinates, nextPosition?: MapCoordinates) => {
      if (!htmlMarkerRef.current) {
        return
      }

      htmlMarkerRef.current.setLngLat(position)

      if (nextPosition && headTypeRef.current === "arrow") {
        const bearing = calculateBearing(position, nextPosition)
        htmlMarkerRef.current.setRotation(bearing - 90)
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

        if (headTypeRef.current !== "none" && visiblePath.length > 0) {
          const currentPosition = visiblePath[visiblePath.length - 1]
          const nextPointIndex = Math.min(pointIndex + 1, arcPath.length - 1)
          const nextPosition = arcPath[nextPointIndex]
          updateHeadPosition(currentPosition, nextPosition)
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
  }, [map, isLoaded, id, sourceId, destinationMarkerSourceId, autoStart, loop, loopDelay, isAnimating])

  if (headType !== "none" && isMarkerMounted && markerElementRef.current) {
    return createPortal(<HeadSvg type={headType} size={headSize} color={color} />, markerElementRef.current)
  }

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
