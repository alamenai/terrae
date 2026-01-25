"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import mapboxgl from "mapbox-gl"
import { useMap } from "./hooks"
import type { MapPath } from "./types"

type MarkerState = {
  position: [number, number]
  bearing: number
}

type MapCameraFollowProps = {
  path: MapPath
  duration?: number
  zoom?: number
  pitch?: number
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
  marker?: boolean | ReactNode
  markerSize?: number
  onComplete?: () => void
}

const DEFAULT_DURATION = 20000
const DEFAULT_ZOOM = 14
const DEFAULT_PITCH = 60
const DEFAULT_LOOP_DELAY = 1000
const DEFAULT_MARKER_SIZE = 48

const calculateBearing = (from: [number, number], to: [number, number]): number => {
  const dLon = ((to[0] - from[0]) * Math.PI) / 180
  const lat1 = (from[1] * Math.PI) / 180
  const lat2 = (to[1] * Math.PI) / 180

  const y = Math.sin(dLon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)

  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

const interpolatePosition = (path: MapPath, progress: number): [number, number] => {
  const totalSegments = path.length - 1
  const segmentProgress = progress * totalSegments
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1)
  const segmentFraction = segmentProgress - segmentIndex

  const start = path[segmentIndex]
  const end = path[segmentIndex + 1]

  return [start[0] + (end[0] - start[0]) * segmentFraction, start[1] + (end[1] - start[1]) * segmentFraction]
}

const DefaultNavigationMarker = ({ size }: { size: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L8 40L24 32L40 40L24 4Z" fill="#3b82f6" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export const MapCameraFollow = ({
  path,
  duration = DEFAULT_DURATION,
  zoom = DEFAULT_ZOOM,
  pitch = DEFAULT_PITCH,
  autoStart = true,
  loop = false,
  loopDelay = DEFAULT_LOOP_DELAY,
  marker,
  markerSize = DEFAULT_MARKER_SIZE,
  onComplete,
}: MapCameraFollowProps) => {
  const { map, isLoaded } = useMap()

  const animationFrameRef = useRef<number>()
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const startTimeRef = useRef(0)
  const pausedProgressRef = useRef(0)
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  const propsRef = useRef({ path, duration, zoom, pitch, onComplete, autoStart })
  propsRef.current = { path, duration, zoom, pitch, onComplete, autoStart }

  const [markerState, setMarkerState] = useState<MarkerState | null>(null)
  const [markerElement, setMarkerElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!map || !isLoaded || marker === undefined) {
      return
    }

    const el = document.createElement("div")
    el.style.display = "flex"
    el.style.alignItems = "center"
    el.style.justifyContent = "center"

    const mapboxMarker = new mapboxgl.Marker({
      element: el,
      rotationAlignment: "map",
      pitchAlignment: "map",
    })

    markerRef.current = mapboxMarker
    setMarkerElement(el)

    return () => {
      mapboxMarker.remove()
      markerRef.current = null
      setMarkerElement(null)
    }
  }, [map, isLoaded, marker])

  useEffect(() => {
    if (!markerState || !markerRef.current || !map) {
      return
    }

    markerRef.current.setLngLat(markerState.position).setRotation(markerState.bearing).addTo(map)
  }, [map, markerState])

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    const cancelAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
        loopTimeoutRef.current = undefined
      }
    }

    if (!autoStart) {
      cancelAnimation()
      return
    }

    if (propsRef.current.path.length < 2) {
      return
    }

    startTimeRef.current = Date.now() - pausedProgressRef.current * propsRef.current.duration

    const animate = () => {
      if (!map || !propsRef.current.autoStart) {
        cancelAnimation()
        return
      }

      const { path, duration, zoom, pitch, onComplete } = propsRef.current
      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      pausedProgressRef.current = progress

      const currentPosition = interpolatePosition(path, progress)
      const lookAheadPosition = interpolatePosition(path, Math.min(progress + 0.02, 1))
      const bearing = calculateBearing(currentPosition, lookAheadPosition)

      setMarkerState({ position: currentPosition, bearing })

      try {
        map.easeTo({
          center: currentPosition,
          bearing,
          pitch,
          zoom,
          duration: 0,
        })
      } catch {
        cancelAnimation()
        return
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      pausedProgressRef.current = 0
      onComplete?.()

      if (loop) {
        loopTimeoutRef.current = setTimeout(() => {
          startTimeRef.current = Date.now()
          animationFrameRef.current = requestAnimationFrame(animate)
        }, loopDelay)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return cancelAnimation
  }, [map, isLoaded, autoStart, loop, loopDelay])

  if (marker !== undefined && markerElement) {
    return createPortal(marker === true ? <DefaultNavigationMarker size={markerSize} /> : marker, markerElement)
  }

  return null
}

export const useCameraFollowControl = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const start = () => {
    setIsPlaying(true)
  }

  const stop = () => {
    setIsPlaying(false)
  }

  const toggle = () => {
    setIsPlaying((prev) => !prev)
  }

  return { isPlaying, start, stop, toggle }
}
