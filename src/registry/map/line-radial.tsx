"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type mapboxgl from "mapbox-gl"
import { mapgl } from "./map-library"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type LineCurvature = number | "auto"

type RadialDestination =
  | MapCoordinates
  | {
      coordinates: MapCoordinates
      color?: string
      label?: string
    }

type MapLineRadialProps = {
  id: string
  origin: MapCoordinates
  destinations: RadialDestination[]
  color?: string
  width?: number
  opacity?: number
  dashArray?: [number, number]
  curvature?: LineCurvature
  curveSegments?: number
  duration?: number
  staggerDelay?: number
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
  showOriginMarker?: boolean
  originMarkerColor?: string
  originMarkerIcon?: ReactNode
  originMarkerPulse?: boolean
  showDestinationMarkers?: boolean
  destinationMarkerColor?: string
  destinationMarkerIcon?: ReactNode
  showTravelingMarker?: boolean
  travelingMarkerColor?: string
  travelingMarkerIcon?: ReactNode
  onLineComplete?: (index: number, destination: MapCoordinates) => void
  onComplete?: () => void
}

const DEFAULT_COLOR = "#3b82f6"
const DEFAULT_WIDTH = 2
const DEFAULT_OPACITY = 0.8
const DEFAULT_CURVATURE = 0.3
const DEFAULT_CURVE_SEGMENTS = 50
const DEFAULT_DURATION = 2000
const DEFAULT_STAGGER_DELAY = 200
const DEFAULT_AUTO_START = true
const DEFAULT_LOOP = false
const DEFAULT_LOOP_DELAY = 1000
const DEFAULT_SHOW_ORIGIN_MARKER = true
const DEFAULT_ORIGIN_MARKER_COLOR = "#ef4444"
const DEFAULT_ORIGIN_MARKER_PULSE = true
const DEFAULT_SHOW_DESTINATION_MARKERS = true
const DEFAULT_SHOW_TRAVELING_MARKER = false

const ORIGIN_MARKER_SIZE = 32
const ORIGIN_MARKER_RADIUS = 10
const DESTINATION_MARKER_SIZE = 24
const DESTINATION_MARKER_RADIUS = 6
const PULSE_RADIUS = 20
const TRAVELING_MARKER_RADIUS = 6

const getDestinationCoordinates = (destination: RadialDestination): MapCoordinates => {
  if (Array.isArray(destination)) {
    return destination
  }
  return destination.coordinates
}

const getDestinationColor = (destination: RadialDestination): string | undefined => {
  if (Array.isArray(destination)) {
    return undefined
  }
  return destination.color
}

const calculateCurvature = (
  origin: MapCoordinates,
  destination: MapCoordinates,
  baseCurvature: LineCurvature
): number => {
  if (baseCurvature !== "auto") {
    return baseCurvature
  }

  const deltaLongitude = destination[0] - origin[0]
  const deltaLatitude = destination[1] - origin[1]
  const distance = Math.sqrt(deltaLongitude * deltaLongitude + deltaLatitude * deltaLatitude)

  return Math.min(0.5, Math.max(0.1, distance / 100))
}

const generateCurvedPath = (
  origin: MapCoordinates,
  destination: MapCoordinates,
  curvature: number,
  segments: number
): MapCoordinates[] => {
  const path: MapCoordinates[] = []

  const deltaLongitude = destination[0] - origin[0]
  const deltaLatitude = destination[1] - origin[1]

  const midpointLongitude = origin[0] + deltaLongitude / 2
  const midpointLatitude = origin[1] + deltaLatitude / 2

  const perpendicularLongitude = -deltaLatitude * curvature
  const perpendicularLatitude = deltaLongitude * curvature

  const controlPointLongitude = midpointLongitude + perpendicularLongitude
  const controlPointLatitude = midpointLatitude + perpendicularLatitude

  for (let segmentIndex = 0; segmentIndex <= segments; segmentIndex++) {
    const interpolationFactor = segmentIndex / segments

    const longitude =
      (1 - interpolationFactor) * (1 - interpolationFactor) * origin[0] +
      2 * (1 - interpolationFactor) * interpolationFactor * controlPointLongitude +
      interpolationFactor * interpolationFactor * destination[0]
    const latitude =
      (1 - interpolationFactor) * (1 - interpolationFactor) * origin[1] +
      2 * (1 - interpolationFactor) * interpolationFactor * controlPointLatitude +
      interpolationFactor * interpolationFactor * destination[1]

    path.push([longitude, latitude])
  }

  return path
}

export const MapLineRadial = ({
  id,
  origin,
  destinations,
  color = DEFAULT_COLOR,
  width = DEFAULT_WIDTH,
  opacity = DEFAULT_OPACITY,
  dashArray,
  curvature = DEFAULT_CURVATURE,
  curveSegments = DEFAULT_CURVE_SEGMENTS,
  duration = DEFAULT_DURATION,
  staggerDelay = DEFAULT_STAGGER_DELAY,
  autoStart = DEFAULT_AUTO_START,
  loop = DEFAULT_LOOP,
  loopDelay = DEFAULT_LOOP_DELAY,
  showOriginMarker = DEFAULT_SHOW_ORIGIN_MARKER,
  originMarkerColor = DEFAULT_ORIGIN_MARKER_COLOR,
  originMarkerIcon,
  originMarkerPulse = DEFAULT_ORIGIN_MARKER_PULSE,
  showDestinationMarkers = DEFAULT_SHOW_DESTINATION_MARKERS,
  destinationMarkerColor,
  destinationMarkerIcon,
  showTravelingMarker = DEFAULT_SHOW_TRAVELING_MARKER,
  travelingMarkerColor,
  travelingMarkerIcon,
  onLineComplete,
  onComplete,
}: MapLineRadialProps) => {
  const { map, isLoaded } = useMap()

  const initializedRef = useRef(false)
  const styleLoadedRef = useRef(false)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const htmlOriginMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const originMarkerElementRef = useRef<HTMLDivElement | null>(null)
  const htmlDestinationMarkersRef = useRef<mapboxgl.Marker[]>([])
  const destinationMarkerElementsRef = useRef<HTMLDivElement[]>([])
  const htmlTravelingMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const travelingMarkerElementRef = useRef<HTMLDivElement | null>(null)
  const startTimeRef = useRef<number>(0)
  const lineProgressRef = useRef<number[]>([])

  const originRef = useRef(origin)
  const destinationsRef = useRef(destinations)
  const curvatureRef = useRef(curvature)
  const curveSegmentsRef = useRef(curveSegments)
  const durationRef = useRef(duration)
  const staggerDelayRef = useRef(staggerDelay)
  const showTravelingMarkerRef = useRef(showTravelingMarker)
  const destinationMarkerIconRef = useRef(destinationMarkerIcon)
  const travelingMarkerIconRef = useRef(travelingMarkerIcon)
  const onLineCompleteRef = useRef(onLineComplete)
  const onCompleteRef = useRef(onComplete)

  originRef.current = origin
  destinationsRef.current = destinations
  curvatureRef.current = curvature
  curveSegmentsRef.current = curveSegments
  durationRef.current = duration
  staggerDelayRef.current = staggerDelay
  showTravelingMarkerRef.current = showTravelingMarker
  destinationMarkerIconRef.current = destinationMarkerIcon
  travelingMarkerIconRef.current = travelingMarkerIcon
  onLineCompleteRef.current = onLineComplete
  onCompleteRef.current = onComplete

  const [isAnimating, setIsAnimating] = useState(false)
  const [isOriginMarkerMounted, setIsOriginMarkerMounted] = useState(false)
  const [isTravelingMarkerMounted, setIsTravelingMarkerMounted] = useState(false)
  const [destinationMarkersMounted, setDestinationMarkersMounted] = useState<boolean[]>([])

  const linesSourceId = `${id}-lines-source`
  const linesLayerId = `${id}-lines`
  const originMarkerSourceId = `${id}-origin-marker-source`
  const originMarkerLayerId = `${id}-origin-marker`
  const originPulseSourceId = `${id}-origin-pulse-source`
  const originPulseLayerId = `${id}-origin-pulse`
  const destinationMarkersSourceId = `${id}-destination-markers-source`
  const destinationMarkersLayerId = `${id}-destination-markers`
  const travelingMarkerSourceId = `${id}-traveling-marker-source`
  const travelingMarkerLayerId = `${id}-traveling-marker`

  useEffect(() => {
    if (!map) {
      return
    }

    const addLinesSource = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(linesSourceId)) {
        return
      }

      mapInstance.addSource(linesSourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      })

      mapInstance.addLayer({
        id: linesLayerId,
        type: "line",
        source: linesSourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": ["coalesce", ["get", "color"], color],
          "line-width": width,
          "line-opacity": opacity,
          ...(dashArray && { "line-dasharray": dashArray }),
        },
      })
    }

    const addOriginMarker = (mapInstance: mapboxgl.Map) => {
      if (!showOriginMarker) {
        return
      }

      if (originMarkerIcon) {
        if (htmlOriginMarkerRef.current) {
          return
        }

        const markerElement = document.createElement("div")
        markerElement.style.width = `${ORIGIN_MARKER_SIZE}px`
        markerElement.style.height = `${ORIGIN_MARKER_SIZE}px`
        markerElement.style.borderRadius = "50%"
        markerElement.style.backgroundColor = originMarkerColor
        markerElement.style.display = "flex"
        markerElement.style.alignItems = "center"
        markerElement.style.justifyContent = "center"
        markerElement.style.boxShadow = "0 0 0 3px white"

        originMarkerElementRef.current = markerElement
        htmlOriginMarkerRef.current = new mapgl.Marker(markerElement).setLngLat(originRef.current).addTo(mapInstance)
        setIsOriginMarkerMounted(true)
      } else {
        if (mapInstance.getSource(originMarkerSourceId)) {
          return
        }

        mapInstance.addSource(originMarkerSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "Point", coordinates: originRef.current },
          },
        })

        mapInstance.addLayer({
          id: originMarkerLayerId,
          type: "circle",
          source: originMarkerSourceId,
          paint: {
            "circle-radius": ORIGIN_MARKER_RADIUS,
            "circle-color": originMarkerColor,
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff",
          },
        })

        if (originMarkerPulse) {
          mapInstance.addSource(originPulseSourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "Point", coordinates: originRef.current },
            },
          })

          mapInstance.addLayer(
            {
              id: originPulseLayerId,
              type: "circle",
              source: originPulseSourceId,
              paint: {
                "circle-radius": PULSE_RADIUS,
                "circle-color": originMarkerColor,
                "circle-opacity": 0.3,
              },
            },
            originMarkerLayerId
          )
        }
      }
    }

    const addDestinationMarkers = (mapInstance: mapboxgl.Map) => {
      if (!showDestinationMarkers) {
        return
      }

      if (destinationMarkerIcon) {
        destinationsRef.current.forEach((destination, index) => {
          if (htmlDestinationMarkersRef.current[index]) {
            return
          }

          const coordinates = getDestinationCoordinates(destination)
          const markerElement = document.createElement("div")
          markerElement.style.width = `${DESTINATION_MARKER_SIZE}px`
          markerElement.style.height = `${DESTINATION_MARKER_SIZE}px`
          markerElement.style.borderRadius = "50%"
          markerElement.style.backgroundColor = destinationMarkerColor || color
          markerElement.style.display = "flex"
          markerElement.style.alignItems = "center"
          markerElement.style.justifyContent = "center"
          markerElement.style.boxShadow = "0 0 0 2px white"
          markerElement.style.opacity = "0"

          destinationMarkerElementsRef.current[index] = markerElement
          htmlDestinationMarkersRef.current[index] = new mapgl.Marker(markerElement)
            .setLngLat(coordinates)
            .addTo(mapInstance)
        })
        setDestinationMarkersMounted(new Array(destinationsRef.current.length).fill(true))
      } else {
        if (mapInstance.getSource(destinationMarkersSourceId)) {
          return
        }

        mapInstance.addSource(destinationMarkersSourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        })

        mapInstance.addLayer({
          id: destinationMarkersLayerId,
          type: "circle",
          source: destinationMarkersSourceId,
          paint: {
            "circle-radius": DESTINATION_MARKER_RADIUS,
            "circle-color": ["coalesce", ["get", "color"], destinationMarkerColor || color],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        })
      }
    }

    const addTravelingMarker = (mapInstance: mapboxgl.Map) => {
      if (!showTravelingMarker) {
        return
      }

      if (travelingMarkerIcon) {
        if (htmlTravelingMarkerRef.current) {
          return
        }

        const markerElement = document.createElement("div")
        markerElement.style.width = `${DESTINATION_MARKER_SIZE}px`
        markerElement.style.height = `${DESTINATION_MARKER_SIZE}px`
        markerElement.style.borderRadius = "50%"
        markerElement.style.backgroundColor = travelingMarkerColor || color
        markerElement.style.display = "flex"
        markerElement.style.alignItems = "center"
        markerElement.style.justifyContent = "center"

        travelingMarkerElementRef.current = markerElement
        htmlTravelingMarkerRef.current = new mapgl.Marker(markerElement).setLngLat(originRef.current).addTo(mapInstance)
        setIsTravelingMarkerMounted(true)
      } else {
        if (mapInstance.getSource(travelingMarkerSourceId)) {
          return
        }

        mapInstance.addSource(travelingMarkerSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "Point", coordinates: originRef.current },
          },
        })

        mapInstance.addLayer({
          id: travelingMarkerLayerId,
          type: "circle",
          source: travelingMarkerSourceId,
          paint: {
            "circle-radius": TRAVELING_MARKER_RADIUS,
            "circle-color": travelingMarkerColor || color,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        })
      }
    }

    const addSources = (mapInstance: mapboxgl.Map) => {
      try {
        addLinesSource(mapInstance)
        addOriginMarker(mapInstance)
        addDestinationMarkers(mapInstance)
        addTravelingMarker(mapInstance)
        initializedRef.current = true
      } catch (error) {
        console.error("Error adding radial lines:", error)
      }
    }

    const cleanupResources = (mapInstance: mapboxgl.Map) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (htmlOriginMarkerRef.current) {
        htmlOriginMarkerRef.current.remove()
        htmlOriginMarkerRef.current = null
      }

      htmlDestinationMarkersRef.current.forEach((marker) => {
        marker?.remove()
      })
      htmlDestinationMarkersRef.current = []
      destinationMarkerElementsRef.current = []

      if (htmlTravelingMarkerRef.current) {
        htmlTravelingMarkerRef.current.remove()
        htmlTravelingMarkerRef.current = null
      }

      try {
        if (mapInstance.getLayer(linesLayerId)) {
          mapInstance.removeLayer(linesLayerId)
        }
        if (mapInstance.getLayer(originMarkerLayerId)) {
          mapInstance.removeLayer(originMarkerLayerId)
        }
        if (mapInstance.getLayer(originPulseLayerId)) {
          mapInstance.removeLayer(originPulseLayerId)
        }
        if (mapInstance.getLayer(destinationMarkersLayerId)) {
          mapInstance.removeLayer(destinationMarkersLayerId)
        }
        if (mapInstance.getLayer(travelingMarkerLayerId)) {
          mapInstance.removeLayer(travelingMarkerLayerId)
        }
        if (mapInstance.getSource(linesSourceId)) {
          mapInstance.removeSource(linesSourceId)
        }
        if (mapInstance.getSource(originMarkerSourceId)) {
          mapInstance.removeSource(originMarkerSourceId)
        }
        if (mapInstance.getSource(originPulseSourceId)) {
          mapInstance.removeSource(originPulseSourceId)
        }
        if (mapInstance.getSource(destinationMarkersSourceId)) {
          mapInstance.removeSource(destinationMarkersSourceId)
        }
        if (mapInstance.getSource(travelingMarkerSourceId)) {
          mapInstance.removeSource(travelingMarkerSourceId)
        }
      } catch {
        // Resources may already be removed
      }

      originMarkerElementRef.current = null
      travelingMarkerElementRef.current = null
      setIsOriginMarkerMounted(false)
      setIsTravelingMarkerMounted(false)
      setDestinationMarkersMounted([])
      initializedRef.current = false
    }

    const handleStyleLoad = () => {
      styleLoadedRef.current = true
      initializedRef.current = false
      addSources(map)

      if (autoStart) {
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
  }, [map, isLoaded, id])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(linesLayerId)) {
        map.setPaintProperty(linesLayerId, "line-width", width)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, id, width])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(linesLayerId)) {
        map.setPaintProperty(linesLayerId, "line-opacity", opacity)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, id, opacity])

  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) {
      return
    }
    if (!autoStart && !isAnimating) {
      return
    }

    startTimeRef.current = Date.now()
    lineProgressRef.current = new Array(destinationsRef.current.length).fill(0)
    const completedLinesRef = { current: new Set<number>() }

    const curvedPaths = destinationsRef.current.map((destination) => {
      const coordinates = getDestinationCoordinates(destination)
      const lineCurvature = calculateCurvature(originRef.current, coordinates, curvatureRef.current)
      return generateCurvedPath(originRef.current, coordinates, lineCurvature, curveSegmentsRef.current)
    })

    const totalDuration = durationRef.current + staggerDelayRef.current * (destinationsRef.current.length - 1)

    const updateLinesSource = (features: GeoJSON.Feature[]) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        const linesSource = map.getSource(linesSourceId) as mapboxgl.GeoJSONSource
        if (linesSource) {
          linesSource.setData({
            type: "FeatureCollection",
            features,
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const updateDestinationMarkersSource = (completedIndices: number[]) => {
      if (destinationMarkerIconRef.current) {
        completedIndices.forEach((index) => {
          const markerElement = destinationMarkerElementsRef.current[index]
          if (markerElement) {
            markerElement.style.opacity = "1"
          }
        })
        return
      }

      if (!map || !map.getStyle()) {
        return
      }
      try {
        const markersSource = map.getSource(destinationMarkersSourceId) as mapboxgl.GeoJSONSource
        if (markersSource) {
          const features = completedIndices.map((index) => {
            const destination = destinationsRef.current[index]
            const coordinates = getDestinationCoordinates(destination)
            const destinationColor = getDestinationColor(destination)
            return {
              type: "Feature" as const,
              properties: { color: destinationColor },
              geometry: { type: "Point" as const, coordinates: coordinates },
            }
          })
          markersSource.setData({
            type: "FeatureCollection",
            features,
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const updateTravelingMarkerPosition = (position: MapCoordinates) => {
      if (travelingMarkerIconRef.current && htmlTravelingMarkerRef.current) {
        htmlTravelingMarkerRef.current.setLngLat(position)
        return
      }

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
      const overallProgress = Math.min(elapsed / totalDuration, 1)

      const features: GeoJSON.Feature[] = []
      let activeLineIndex = -1
      let activeLineProgress = 0

      destinationsRef.current.forEach((destination, index) => {
        const lineStartTime = index * staggerDelayRef.current
        const lineElapsed = Math.max(0, elapsed - lineStartTime)
        const lineProgress = Math.min(lineElapsed / durationRef.current, 1)

        lineProgressRef.current[index] = lineProgress

        if (lineProgress > 0) {
          const path = curvedPaths[index]
          const pointCount = Math.floor(lineProgress * (path.length - 1)) + 1
          const visiblePath = path.slice(0, pointCount)

          const segmentProgress = (lineProgress * (path.length - 1)) % 1
          if (pointCount < path.length && segmentProgress > 0) {
            const startPoint = path[pointCount - 1]
            const endPoint = path[pointCount]
            visiblePath.push([
              startPoint[0] + (endPoint[0] - startPoint[0]) * segmentProgress,
              startPoint[1] + (endPoint[1] - startPoint[1]) * segmentProgress,
            ])
          }

          const destinationColor = getDestinationColor(destination)
          features.push({
            type: "Feature",
            properties: { color: destinationColor },
            geometry: { type: "LineString", coordinates: visiblePath },
          })

          if (lineProgress < 1) {
            activeLineIndex = index
            activeLineProgress = lineProgress
          }

          if (lineProgress >= 1 && !completedLinesRef.current.has(index)) {
            completedLinesRef.current.add(index)
            const coordinates = getDestinationCoordinates(destination)
            onLineCompleteRef.current?.(index, coordinates)
          }
        }
      })

      try {
        updateLinesSource(features)
        updateDestinationMarkersSource(Array.from(completedLinesRef.current))

        if (showTravelingMarkerRef.current && activeLineIndex >= 0) {
          const path = curvedPaths[activeLineIndex]
          const pointIndex = Math.floor(activeLineProgress * (path.length - 1))
          const segmentProgress = (activeLineProgress * (path.length - 1)) % 1
          const startPoint = path[pointIndex]
          const endPoint = path[Math.min(pointIndex + 1, path.length - 1)]
          const position: MapCoordinates = [
            startPoint[0] + (endPoint[0] - startPoint[0]) * segmentProgress,
            startPoint[1] + (endPoint[1] - startPoint[1]) * segmentProgress,
          ]
          updateTravelingMarkerPosition(position)
        }
      } catch {
        stopAnimation()
        return
      }

      if (overallProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      setIsAnimating(false)
      onCompleteRef.current?.()

      if (loop) {
        loopTimeoutRef.current = setTimeout(() => {
          completedLinesRef.current.clear()
          destinationMarkerElementsRef.current.forEach((markerElement) => {
            if (markerElement) {
              markerElement.style.opacity = "0"
            }
          })
          updateLinesSource([])
          updateDestinationMarkersSource([])
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
  }, [map, isLoaded, id, autoStart, loop, loopDelay, isAnimating])

  const renderOriginMarkerIcon = () => {
    if (originMarkerIcon && isOriginMarkerMounted && originMarkerElementRef.current) {
      return createPortal(originMarkerIcon, originMarkerElementRef.current)
    }
    return null
  }

  const renderTravelingMarkerIcon = () => {
    if (travelingMarkerIcon && isTravelingMarkerMounted && travelingMarkerElementRef.current) {
      return createPortal(travelingMarkerIcon, travelingMarkerElementRef.current)
    }
    return null
  }

  const renderDestinationMarkerIcons = () => {
    if (!destinationMarkerIcon || destinationMarkersMounted.length === 0) {
      return null
    }

    return destinationMarkerElementsRef.current.map((markerElement, index) => {
      if (markerElement && destinationMarkersMounted[index]) {
        return createPortal(destinationMarkerIcon, markerElement, `dest-icon-${index}`)
      }
      return null
    })
  }

  return (
    <>
      {renderOriginMarkerIcon()}
      {renderTravelingMarkerIcon()}
      {renderDestinationMarkerIcons()}
    </>
  )
}
