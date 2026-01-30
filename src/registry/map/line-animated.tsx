"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type mapboxgl from "mapbox-gl"
import { mapgl } from "./map-library"
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
  const styleLoadedRef = useRef(false)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const htmlMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const markerElementRef = useRef<HTMLDivElement | null>(null)
  const startTimeRef = useRef<number>(0)
  const durationRef = useRef(duration)
  const pathRef = useRef(path)
  const colorRef = useRef(color)
  const widthRef = useRef(width)
  const opacityRef = useRef(opacity)
  const dashArrayRef = useRef(dashArray)
  const showMarkerRef = useRef(showMarker)
  const markerColorRef = useRef(markerColor)
  const markerBorderlessRef = useRef(markerBorderless)
  const markerIconRef = useRef(markerIcon)
  const onCompleteRef = useRef(onComplete)
  const autoStartRef = useRef(autoStart)

  durationRef.current = duration
  pathRef.current = path
  colorRef.current = color
  widthRef.current = width
  opacityRef.current = opacity
  dashArrayRef.current = dashArray
  showMarkerRef.current = showMarker
  markerColorRef.current = markerColor
  markerBorderlessRef.current = markerBorderless
  markerIconRef.current = markerIcon
  onCompleteRef.current = onComplete
  autoStartRef.current = autoStart

  const [isAnimating, setIsAnimating] = useState(false)
  const [isMarkerMounted, setIsMarkerMounted] = useState(false)
  const hasCompletedRef = useRef(false)

  const sourceId = `${id}-source`
  const lineLayerId = `${id}-line`
  const markerSourceId = `${id}-marker-source`
  const markerLayerId = `${id}-marker`

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
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [] },
        },
      })

      mapInstance.addLayer({
        id: lineLayerId,
        type: "line",
        source: sourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": colorRef.current,
          "line-width": widthRef.current,
          "line-opacity": opacityRef.current,
          ...(dashArrayRef.current && { "line-dasharray": dashArrayRef.current }),
        },
      })
    }

    const addHtmlMarker = (mapInstance: mapboxgl.Map) => {
      if (htmlMarkerRef.current) {
        return
      }

      const el = document.createElement("div")
      el.style.width = "32px"
      el.style.height = "32px"
      el.style.borderRadius = "50%"
      el.style.backgroundColor = markerColorRef.current
      el.style.display = "flex"
      el.style.alignItems = "center"
      el.style.justifyContent = "center"

      if (!markerBorderlessRef.current) {
        el.style.boxShadow = "0 0 0 3px white"
      }

      markerElementRef.current = el
      htmlMarkerRef.current = new mapgl.Marker(el).setLngLat(pathRef.current[0]).addTo(mapInstance)
      setIsMarkerMounted(true)
    }

    const addCircleMarker = (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource(markerSourceId)) {
        return
      }

      mapInstance.addSource(markerSourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: pathRef.current[0] },
        },
      })

      mapInstance.addLayer({
        id: markerLayerId,
        type: "circle",
        source: markerSourceId,
        paint: {
          "circle-radius": 8,
          "circle-color": markerColorRef.current,
          "circle-stroke-width": markerBorderlessRef.current ? 0 : 3,
          "circle-stroke-color": "#ffffff",
        },
      })
    }

    const addSources = (mapInstance: mapboxgl.Map) => {
      try {
        addLineSource(mapInstance)

        if (showMarkerRef.current) {
          if (markerIconRef.current) {
            addHtmlMarker(mapInstance)
          } else {
            addCircleMarker(mapInstance)
          }
        }

        initializedRef.current = true
      } catch (error) {
        console.error("Error adding animated line:", error)
      }
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
        if (mapInstance.getLayer(markerLayerId)) {
          mapInstance.removeLayer(markerLayerId)
        }
        if (mapInstance.getSource(sourceId)) {
          mapInstance.removeSource(sourceId)
        }
        if (mapInstance.getSource(markerSourceId)) {
          mapInstance.removeSource(markerSourceId)
        }
      } catch {
        // Layer or source may already be removed
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
  }, [map, isLoaded, sourceId, lineLayerId, markerSourceId, markerLayerId])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(lineLayerId)) {
        map.setPaintProperty(lineLayerId, "line-color", color)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, lineLayerId, color])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(lineLayerId)) {
        map.setPaintProperty(lineLayerId, "line-width", width)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, lineLayerId, width])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (map.getLayer(lineLayerId)) {
        map.setPaintProperty(lineLayerId, "line-opacity", opacity)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, lineLayerId, opacity])

  useEffect(() => {
    if (!map || !initializedRef.current || !dashArray) {
      return
    }

    try {
      if (map.getLayer(lineLayerId)) {
        map.setPaintProperty(lineLayerId, "line-dasharray", dashArray)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, lineLayerId, dashArray])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (markerIconRef.current && htmlMarkerRef.current) {
        htmlMarkerRef.current.getElement().style.backgroundColor = markerColor
      } else if (map.getLayer(markerLayerId)) {
        map.setPaintProperty(markerLayerId, "circle-color", markerColor)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, markerLayerId, markerColor])

  useEffect(() => {
    if (!map || !initializedRef.current) {
      return
    }

    try {
      if (markerIconRef.current && htmlMarkerRef.current) {
        htmlMarkerRef.current.getElement().style.boxShadow = markerBorderless ? "none" : "0 0 0 3px white"
      } else if (map.getLayer(markerLayerId)) {
        map.setPaintProperty(markerLayerId, "circle-stroke-width", markerBorderless ? 0 : 3)
      }
    } catch {
      // Layer may not exist during style transition
    }
  }, [map, markerLayerId, markerBorderless])

  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) {
      return
    }
    if (!autoStart && !isAnimating) {
      return
    }
    if (!isAnimating && hasCompletedRef.current) {
      return
    }

    startTimeRef.current = Date.now()

    const updateLineSource = (coordinates: MapPath) => {
      const lineSource = map.getSource(sourceId) as mapboxgl.GeoJSONSource
      if (lineSource) {
        lineSource.setData({
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates },
        })
      }
    }

    const updateMarkerPosition = (position: [number, number]) => {
      if (markerIconRef.current && htmlMarkerRef.current) {
        htmlMarkerRef.current.setLngLat(position)
        return
      }

      const markerSource = map.getSource(markerSourceId) as mapboxgl.GeoJSONSource
      if (markerSource) {
        markerSource.setData({
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: position },
        })
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
      const totalPoints = pathRef.current.length
      const currentPointIndex = Math.floor(progress * (totalPoints - 1))
      const segmentProgress = (progress * (totalPoints - 1)) % 1
      const visibleCoordinates = pathRef.current.slice(0, currentPointIndex + 1)

      if (currentPointIndex < totalPoints - 1 && segmentProgress > 0) {
        const start = pathRef.current[currentPointIndex]
        const end = pathRef.current[currentPointIndex + 1]
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

      if (showMarkerRef.current && visibleCoordinates.length > 0) {
        try {
          const lastPoint = visibleCoordinates[visibleCoordinates.length - 1]
          updateMarkerPosition(lastPoint as [number, number])
        } catch {
          stopAnimation()
          return
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      setIsAnimating(false)
      hasCompletedRef.current = true
      onCompleteRef.current?.()

      if (loop) {
        setTimeout(() => {
          hasCompletedRef.current = false
          setIsAnimating(true)
        }, LOOP_RESTART_DELAY_MS)
      }
    }

    setIsAnimating(true)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [map, isLoaded, sourceId, markerSourceId, autoStart, loop, isAnimating])

  if (markerIcon && isMarkerMounted && markerElementRef.current) {
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
