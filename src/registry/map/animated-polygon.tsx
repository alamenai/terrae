"use client"

import { useEffect, useRef, useState } from "react"
import type mapboxgl from "mapbox-gl"
import { mapgl } from "./map-library"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type AnimationMode = "draw" | "fill" | "draw-then-fill"

type MapAnimatedPolygonProps = {
  id: string
  coordinates: MapCoordinates[]
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
  fillColor?: string
  fillOpacity?: number
  duration?: number
  fillDuration?: number
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
  animationMode?: AnimationMode
  onDrawComplete?: () => void
  onFillComplete?: () => void
  onComplete?: () => void
}

const DEFAULT_STROKE_COLOR = "#3b82f6"
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_STROKE_OPACITY = 1
const DEFAULT_FILL_COLOR = "#3b82f6"
const DEFAULT_FILL_OPACITY = 0.3
const DEFAULT_DURATION = 2000
const DEFAULT_FILL_DURATION = 1000
const DEFAULT_AUTO_START = true
const DEFAULT_LOOP = false
const DEFAULT_LOOP_DELAY = 1000
const DEFAULT_ANIMATION_MODE: AnimationMode = "draw-then-fill"

export const MapAnimatedPolygon = ({
  id,
  coordinates,
  strokeColor = DEFAULT_STROKE_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  strokeOpacity = DEFAULT_STROKE_OPACITY,
  fillColor = DEFAULT_FILL_COLOR,
  fillOpacity = DEFAULT_FILL_OPACITY,
  duration = DEFAULT_DURATION,
  fillDuration = DEFAULT_FILL_DURATION,
  autoStart = DEFAULT_AUTO_START,
  loop = DEFAULT_LOOP,
  loopDelay = DEFAULT_LOOP_DELAY,
  animationMode = DEFAULT_ANIMATION_MODE,
  onDrawComplete,
  onFillComplete,
  onComplete,
}: MapAnimatedPolygonProps) => {
  const { map, isLoaded } = useMap()

  const initializedRef = useRef(false)
  const styleLoadedRef = useRef(false)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const startTimeRef = useRef<number>(0)

  const coordinatesRef = useRef(coordinates)
  const durationRef = useRef(duration)
  const fillDurationRef = useRef(fillDuration)
  const onDrawCompleteRef = useRef(onDrawComplete)
  const onFillCompleteRef = useRef(onFillComplete)
  const onCompleteRef = useRef(onComplete)

  coordinatesRef.current = coordinates
  durationRef.current = duration
  fillDurationRef.current = fillDuration
  onDrawCompleteRef.current = onDrawComplete
  onFillCompleteRef.current = onFillComplete
  onCompleteRef.current = onComplete

  const [isAnimating, setIsAnimating] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<"idle" | "drawing" | "filling">("idle")

  const lineSourceId = `${id}-line-source`
  const lineLayerId = `${id}-line`
  const fillSourceId = `${id}-fill-source`
  const fillLayerId = `${id}-fill`

  useEffect(() => {
    if (!map) {
      return
    }

    const addLineSources = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(lineSourceId)) {
        return
      }

      mapInstance.addSource(lineSourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [] },
        },
      })

      mapInstance.addLayer({
        id: lineLayerId,
        type: "line",
        source: lineSourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": strokeColor,
          "line-width": strokeWidth,
          "line-opacity": strokeOpacity,
        },
      })
    }

    const addFillSources = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(fillSourceId)) {
        return
      }

      mapInstance.addSource(fillSourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "Polygon", coordinates: [[]] },
        },
      })

      mapInstance.addLayer(
        {
          id: fillLayerId,
          type: "fill",
          source: fillSourceId,
          paint: {
            "fill-color": fillColor,
            "fill-opacity": 0,
          },
        },
        lineLayerId
      )
    }

    const addSources = (mapInstance: mapboxgl.Map) => {
      try {
        addLineSources(mapInstance)
        if (animationMode !== "draw") {
          addFillSources(mapInstance)
        }
        initializedRef.current = true
      } catch (error) {
        console.error("Error adding animated polygon:", error)
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
        if (mapInstance.getLayer(lineLayerId)) {
          mapInstance.removeLayer(lineLayerId)
        }
        if (mapInstance.getLayer(fillLayerId)) {
          mapInstance.removeLayer(fillLayerId)
        }
        if (mapInstance.getSource(lineSourceId)) {
          mapInstance.removeSource(lineSourceId)
        }
        if (mapInstance.getSource(fillSourceId)) {
          mapInstance.removeSource(fillSourceId)
        }
      } catch {
        // Resources may already be removed
      }

      initializedRef.current = false
    }

    const handleStyleLoad = () => {
      styleLoadedRef.current = true
      initializedRef.current = false
      addSources(map)

      if (autoStart) {
        setIsAnimating(true)
        setAnimationPhase(animationMode === "fill" ? "filling" : "drawing")
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
  }, [map, isLoaded, id, animationMode, strokeColor, strokeWidth, strokeOpacity, fillColor])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(lineLayerId)) {
        map.setPaintProperty(lineLayerId, "line-color", strokeColor)
        map.setPaintProperty(lineLayerId, "line-width", strokeWidth)
        map.setPaintProperty(lineLayerId, "line-opacity", strokeOpacity)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, id, strokeColor, strokeWidth, strokeOpacity])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(fillLayerId)) {
        map.setPaintProperty(fillLayerId, "fill-color", fillColor)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, id, fillColor])

  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) {
      return
    }
    if (!autoStart && !isAnimating) {
      return
    }

    startTimeRef.current = Date.now()

    const closedCoordinates = [...coordinatesRef.current]
    if (
      closedCoordinates.length > 0 &&
      (closedCoordinates[0][0] !== closedCoordinates[closedCoordinates.length - 1][0] ||
        closedCoordinates[0][1] !== closedCoordinates[closedCoordinates.length - 1][1])
    ) {
      closedCoordinates.push(closedCoordinates[0])
    }

    const updateLineSource = (visibleCoordinates: MapCoordinates[]) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        const lineSource = map.getSource(lineSourceId) as mapboxgl.GeoJSONSource
        if (lineSource) {
          lineSource.setData({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: visibleCoordinates },
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const updateFillSource = (fillCoordinates: MapCoordinates[]) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        const source = map.getSource(fillSourceId) as mapboxgl.GeoJSONSource
        if (source) {
          source.setData({
            type: "Feature",
            properties: {},
            geometry: { type: "Polygon", coordinates: [fillCoordinates] },
          })
        }
      } catch {
        // Map may be in an invalid state
      }
    }

    const updateFillOpacity = (opacity: number) => {
      if (!map || !map.getStyle()) {
        return
      }
      try {
        if (map.getLayer(fillLayerId)) {
          map.setPaintProperty(fillLayerId, "fill-opacity", opacity)
        }
      } catch {
        // Layer may not exist during style transition
      }
    }

    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      setIsAnimating(false)
      setAnimationPhase("idle")
    }

    const resetAnimation = () => {
      updateLineSource([])
      updateFillSource([])
      updateFillOpacity(0)
    }

    const animate = () => {
      if (!map || !styleLoadedRef.current) {
        stopAnimation()
        return
      }

      const elapsed = Date.now() - startTimeRef.current

      if (animationPhase === "drawing") {
        const drawProgress = Math.min(elapsed / durationRef.current, 1)
        const totalPoints = closedCoordinates.length
        const currentPointIndex = Math.floor(drawProgress * (totalPoints - 1))
        const segmentProgress = (drawProgress * (totalPoints - 1)) % 1
        const visibleCoordinates = closedCoordinates.slice(0, currentPointIndex + 1)

        if (currentPointIndex < totalPoints - 1 && segmentProgress > 0) {
          const start = closedCoordinates[currentPointIndex]
          const end = closedCoordinates[currentPointIndex + 1]
          visibleCoordinates.push([
            start[0] + (end[0] - start[0]) * segmentProgress,
            start[1] + (end[1] - start[1]) * segmentProgress,
          ])
        }

        try {
          updateLineSource(visibleCoordinates)
        } catch {
          stopAnimation()
          return
        }

        if (drawProgress >= 1) {
          onDrawCompleteRef.current?.()

          if (animationMode === "draw") {
            setIsAnimating(false)
            setAnimationPhase("idle")
            onCompleteRef.current?.()

            if (loop) {
              loopTimeoutRef.current = setTimeout(() => {
                resetAnimation()
                setIsAnimating(true)
                setAnimationPhase("drawing")
              }, loopDelay)
            }
            return
          }

          startTimeRef.current = Date.now()
          setAnimationPhase("filling")
          updateFillSource(closedCoordinates)
          animationFrameRef.current = requestAnimationFrame(animate)
          return
        }

        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (animationPhase === "filling") {
        const fillProgress = Math.min(elapsed / fillDurationRef.current, 1)
        const currentFillOpacity = fillOpacity * fillProgress

        try {
          if (animationMode === "fill") {
            updateLineSource(closedCoordinates)
            updateFillSource(closedCoordinates)
          }
          updateFillOpacity(currentFillOpacity)
        } catch {
          stopAnimation()
          return
        }

        if (fillProgress >= 1) {
          onFillCompleteRef.current?.()
          setIsAnimating(false)
          setAnimationPhase("idle")
          onCompleteRef.current?.()

          if (loop) {
            loopTimeoutRef.current = setTimeout(() => {
              resetAnimation()
              setIsAnimating(true)
              setAnimationPhase(animationMode === "fill" ? "filling" : "drawing")
            }, loopDelay)
          }
          return
        }

        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    setIsAnimating(true)
    if (animationPhase === "idle") {
      setAnimationPhase(animationMode === "fill" ? "filling" : "drawing")
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
      }
    }
  }, [map, isLoaded, id, autoStart, loop, loopDelay, animationMode, fillOpacity, isAnimating, animationPhase])

  return null
}
