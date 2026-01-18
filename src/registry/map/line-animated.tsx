"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import mapboxgl from "mapbox-gl"
import { useMap } from "./hooks"
import type { MapPath } from "./types"

type MapLineAnimatedProps = {
  id: string
  path: MapPath
  color?: string
  width?: number
  opacity?: number
  dashArray?: [number, number]
  duration?: number
  showMarker?: boolean
  markerColor?: string
  markerIcon?: ReactNode
  markerBorderless?: boolean
  autoStart?: boolean
  loop?: boolean
  onComplete?: () => void
}

const DEFAULT_COLOR = "#3b82f6"
const DEFAULT_WIDTH = 4
const DEFAULT_OPACITY = 1
const DEFAULT_DURATION = 3000
const DEFAULT_SHOW_MARKER = true
const DEFAULT_MARKER_COLOR = "#3b82f6"
const DEFAULT_MARKER_BORDERLESS = false
const DEFAULT_AUTO_START = true
const DEFAULT_LOOP = false
const LOOP_RESTART_DELAY_MS = 500

export const MapLineAnimated = ({
  id,
  path,
  color = DEFAULT_COLOR,
  width = DEFAULT_WIDTH,
  opacity = DEFAULT_OPACITY,
  dashArray,
  duration = DEFAULT_DURATION,
  showMarker = DEFAULT_SHOW_MARKER,
  markerColor = DEFAULT_MARKER_COLOR,
  markerIcon,
  markerBorderless = DEFAULT_MARKER_BORDERLESS,
  autoStart = DEFAULT_AUTO_START,
  loop = DEFAULT_LOOP,
  onComplete,
}: MapLineAnimatedProps) => {
  const { map, isLoaded } = useMap()
  const initializedRef = useRef(false)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const htmlMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const markerElementRef = useRef<HTMLDivElement | null>(null)
  const startTimeRef = useRef<number>(0)

  const durationRef = useRef(duration)
  const pathRef = useRef(path)
  const showMarkerRef = useRef(showMarker)
  const markerIconRef = useRef(markerIcon)
  const onCompleteRef = useRef(onComplete)

  durationRef.current = duration
  pathRef.current = path
  showMarkerRef.current = showMarker
  markerIconRef.current = markerIcon
  onCompleteRef.current = onComplete

  const [isAnimating, setIsAnimating] = useState(false)
  const [markerReady, setMarkerReady] = useState(false)

  const sourceId = `${id}-source`
  const lineLayerId = `${id}-line`
  const markerSourceId = `${id}-marker-source`
  const markerLayerId = `${id}-marker`

  const addLineSource = (mapInstance: mapboxgl.Map) => {
    mapInstance.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    })

    mapInstance.addLayer({
      id: lineLayerId,
      type: "line",
      source: sourceId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": color,
        "line-width": width,
        "line-opacity": opacity,
        ...(dashArray && { "line-dasharray": dashArray }),
      },
    })
  }

  const addHtmlMarker = (mapInstance: mapboxgl.Map) => {
    const el = document.createElement("div")
    el.style.width = "32px"
    el.style.height = "32px"
    el.style.borderRadius = "50%"
    el.style.backgroundColor = markerColor
    el.style.display = "flex"
    el.style.alignItems = "center"
    el.style.justifyContent = "center"
    if (!markerBorderless) {
      el.style.boxShadow = "0 0 0 3px white"
    }
    markerElementRef.current = el

    const marker = new mapboxgl.Marker(el).setLngLat(path[0]).addTo(mapInstance)
    htmlMarkerRef.current = marker
    setMarkerReady(true)
  }

  const addCircleMarker = (mapInstance: mapboxgl.Map) => {
    mapInstance.addSource(markerSourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: path[0],
        },
      },
    })

    mapInstance.addLayer({
      id: markerLayerId,
      type: "circle",
      source: markerSourceId,
      paint: {
        "circle-radius": 8,
        "circle-color": markerColor,
        "circle-stroke-width": markerBorderless ? 0 : 3,
        "circle-stroke-color": "#ffffff",
      },
    })
  }

  const cleanupResources = (mapInstance: mapboxgl.Map) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (htmlMarkerRef.current) {
      htmlMarkerRef.current.remove()
      htmlMarkerRef.current = null
    }
    try {
      if (mapInstance.getLayer(lineLayerId)) {
        mapInstance.removeLayer(lineLayerId)
      }
      if (!markerIcon && showMarker && mapInstance.getLayer(markerLayerId)) {
        mapInstance.removeLayer(markerLayerId)
      }
      if (mapInstance.getSource(sourceId)) {
        mapInstance.removeSource(sourceId)
      }
      if (!markerIcon && showMarker && mapInstance.getSource(markerSourceId)) {
        mapInstance.removeSource(markerSourceId)
      }
    } catch {
      // Layer or source may already be removed
    }
    markerElementRef.current = null
    setMarkerReady(false)
    initializedRef.current = false
  }

  useEffect(() => {
    if (!map || !isLoaded || initializedRef.current) {
      return
    }

    try {
      addLineSource(map)

      if (showMarker) {
        if (markerIcon) {
          addHtmlMarker(map)
        } else {
          addCircleMarker(map)
        }
      }

      initializedRef.current = true
    } catch (error) {
      console.error("Error adding animated line:", error)
    }

    return () => {
      if (map) {
        cleanupResources(map)
      }
    }
  }, [map, isLoaded])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }
    if (!map.getLayer(lineLayerId)) {
      return
    }
    map.setPaintProperty(lineLayerId, "line-color", color)
  }, [map, lineLayerId, color])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }
    if (!map.getLayer(lineLayerId)) {
      return
    }
    map.setPaintProperty(lineLayerId, "line-width", width)
  }, [map, lineLayerId, width])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }
    if (!map.getLayer(lineLayerId)) {
      return
    }
    map.setPaintProperty(lineLayerId, "line-opacity", opacity)
  }, [map, lineLayerId, opacity])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }
    if (!map.getLayer(lineLayerId)) {
      return
    }
    if (dashArray) {
      map.setPaintProperty(lineLayerId, "line-dasharray", dashArray)
    }
  }, [map, lineLayerId, dashArray])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    if (markerIconRef.current && htmlMarkerRef.current) {
      const el = htmlMarkerRef.current.getElement()
      el.style.backgroundColor = markerColor
    } else if (map.getLayer(markerLayerId)) {
      map.setPaintProperty(markerLayerId, "circle-color", markerColor)
    }
  }, [map, markerLayerId, markerColor])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    if (markerIconRef.current && htmlMarkerRef.current) {
      const el = htmlMarkerRef.current.getElement()
      el.style.boxShadow = markerBorderless ? "none" : "0 0 0 3px white"
    } else if (map.getLayer(markerLayerId)) {
      map.setPaintProperty(markerLayerId, "circle-stroke-width", markerBorderless ? 0 : 3)
    }
  }, [map, markerLayerId, markerBorderless])

  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) {
      return
    }
    if (!autoStart && !isAnimating) {
      return
    }

    startTimeRef.current = Date.now()

    const animate = () => {
      if (!map || !map.getStyle()) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = undefined
        }
        setIsAnimating(false)
        return
      }

      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(elapsed / durationRef.current, 1)

      const totalPoints = pathRef.current.length
      const currentPointIndex = Math.floor(progress * (totalPoints - 1))
      const segmentProgress = (progress * (totalPoints - 1)) % 1

      const visibleCoordinates = pathRef.current.slice(0, currentPointIndex + 1)

      if (currentPointIndex < totalPoints - 1 && segmentProgress > 0) {
        const start = pathRef.current[currentPointIndex]
        const end = pathRef.current[currentPointIndex + 1]
        const interpolatedPoint: [number, number] = [
          start[0] + (end[0] - start[0]) * segmentProgress,
          start[1] + (end[1] - start[1]) * segmentProgress,
        ]
        visibleCoordinates.push(interpolatedPoint)
      }

      try {
        const lineSource = map.getSource(sourceId) as mapboxgl.GeoJSONSource
        if (lineSource) {
          lineSource.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: visibleCoordinates,
            },
          })
        }
      } catch {
        console.warn("Line source no longer available, stopping animation")
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = undefined
        }
        setIsAnimating(false)
        return
      }

      if (showMarkerRef.current && visibleCoordinates.length > 0) {
        const lastPoint = visibleCoordinates[visibleCoordinates.length - 1]

        if (markerIconRef.current && htmlMarkerRef.current) {
          htmlMarkerRef.current.setLngLat(lastPoint as [number, number])
        } else {
          try {
            const markerSource = map.getSource(markerSourceId) as mapboxgl.GeoJSONSource
            if (markerSource) {
              markerSource.setData({
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: lastPoint,
                },
              })
            }
          } catch {
            setIsAnimating(false)
            return
          }
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        onCompleteRef.current?.()

        if (loop) {
          setTimeout(() => {
            setIsAnimating(true)
          }, LOOP_RESTART_DELAY_MS)
        }
      }
    }

    setIsAnimating(true)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [map, isLoaded, autoStart, loop, isAnimating])

  // Portal required to render React content into Mapbox's imperatively-created marker element
  if (markerIcon && markerReady && markerElementRef.current) {
    return createPortal(markerIcon, markerElementRef.current)
  }

  return null
}

export const useLineAnimatedControl = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const start = () => {
    setIsPlaying(true)
  }

  const stop = () => {
    setIsPlaying(false)
  }

  const toggle = () => {
    setIsPlaying((prev) => {
      return !prev
    })
  }

  return { start, stop, toggle, isPlaying }
}
