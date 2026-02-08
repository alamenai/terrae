"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "./hooks"
import type { MapPath } from "./types"

type MapMarkerAnimatedProps = {
  /** Unique identifier for the marker */
  id: string
  /** Array of coordinates [[lng, lat], ...] defining the path */
  coordinates: MapPath
  /** Marker color */
  color?: string
  /** Marker size (radius in pixels) */
  size?: number
  /** Animation duration in milliseconds */
  duration?: number
  /** Auto-start animation on mount */
  autoStart?: boolean
  /** Loop animation */
  loop?: boolean
  /** Show the path/route line */
  showPath?: boolean
  /** Path line color */
  pathColor?: string
  /** Path line width */
  pathWidth?: number
  /** Callback when animation completes */
  onComplete?: () => void
}

export function MapMarkerAnimated({
  id,
  coordinates,
  color = "#3b82f6",
  size = 10,
  duration = 5000,
  autoStart = true,
  loop = false,
  showPath = false,
  pathColor = "#3b82f6",
  pathWidth = 4,
  onComplete,
}: MapMarkerAnimatedProps) {
  const { map, isLoaded } = useMap()
  const initializedRef = useRef(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Initialize marker and path layers
  useEffect(() => {
    if (!map || !isLoaded || initializedRef.current) return

    const markerSourceId = `${id}-marker-source`
    const markerLayerId = `${id}-marker`
    const pathSourceId = `${id}-path-source`
    const pathLayerId = `${id}-path`

    try {
      // Add marker source
      map.addSource(markerSourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: coordinates[0],
          },
        },
      })

      // Add marker layer
      map.addLayer({
        id: markerLayerId,
        type: "circle",
        source: markerSourceId,
        paint: {
          "circle-radius": size,
          "circle-color": color,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })

      // Add path if enabled
      if (showPath) {
        map.addSource(pathSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        })

        map.addLayer({
          id: pathLayerId,
          type: "line",
          source: pathSourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": pathColor,
            "line-width": pathWidth,
            "line-opacity": 0.6,
          },
        })
      }

      initializedRef.current = true
    } catch (error) {
      console.error("Error adding animated marker:", error)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (map) {
        try {
          if (map.getLayer && map.getLayer(markerLayerId)) map.removeLayer(markerLayerId)
          if (showPath && map.getLayer && map.getLayer(pathLayerId)) map.removeLayer(pathLayerId)
          if (map.getSource && map.getSource(markerSourceId)) map.removeSource(markerSourceId)
          if (showPath && map.getSource && map.getSource(pathSourceId)) map.removeSource(pathSourceId)
        } catch {
          // Silently catch errors during cleanup
        }
      }
      initializedRef.current = false
    }
  }, [map, isLoaded, id, coordinates, color, size, showPath, pathColor, pathWidth])

  // Animation logic
  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) return
    if (!autoStart && !isAnimating) return

    const markerSourceId = `${id}-marker-source`
    const startTime = Date.now()

    const animate = () => {
      // Guard: Check if map is still valid
      if (!map || !map.getStyle()) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = undefined
        }
        setIsAnimating(false)
        return
      }

      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Calculate position along the route
      const totalSegments = coordinates.length - 1
      const segmentIndex = progress * totalSegments
      const currentSegment = Math.floor(segmentIndex)
      const segmentProgress = segmentIndex % 1

      // Use the last segment when at 100% progress
      const segIndex = currentSegment >= totalSegments ? totalSegments - 1 : currentSegment
      const segProgress = currentSegment >= totalSegments ? 1 : segmentProgress

      // Calculate interpolated position
      const start = coordinates[segIndex]
      const end = coordinates[segIndex + 1]
      const lng = start[0] + (end[0] - start[0]) * segProgress
      const lat = start[1] + (end[1] - start[1]) * segProgress

      // Update marker position
      try {
        const markerSource = map.getSource(markerSourceId) as mapboxgl.GeoJSONSource
        if (markerSource) {
          markerSource.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          })
        }
      } catch {
        console.warn("Marker source no longer available, stopping animation")
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = undefined
        }
        setIsAnimating(false)
        return
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        onCompleteRef.current?.()

        if (loop) {
          loopTimerRef.current = setTimeout(() => {
            setIsAnimating(true)
          }, 500)
        }
      }
    }

    setIsAnimating(true)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (loopTimerRef.current !== null) {
        clearTimeout(loopTimerRef.current)
      }
    }
  }, [map, isLoaded, id, coordinates, duration, autoStart, isAnimating, loop])

  return null
}

/**
 * Hook to control animated marker playback
 */
export function useMarkerAnimatedControl() {
  const [isPlaying, setIsPlaying] = useState(false)

  const start = () => setIsPlaying(true)
  const stop = () => setIsPlaying(false)
  const toggle = () => setIsPlaying((prev) => !prev)

  return { start, stop, toggle, isPlaying }
}
