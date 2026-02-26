"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type mapboxgl from "mapbox-gl"
import { Footprints } from "lucide-react"
import { mapgl } from "./map-library"
import { useMap } from "./hooks"
import type { MapPath, MapCoordinates } from "./types"

type FootprintStep = {
  coordinates: MapCoordinates
  bearing: number
  isLeft: boolean
}

type MarkerEntry = {
  marker: mapboxgl.Marker
  element: HTMLDivElement
}

type FootprintControl = {
  start: () => void
  reset: () => void
  isActive: boolean
}

type FootprintProps = {
  entry: MarkerEntry
  step: FootprintStep
  color: string
  size: number
  className?: string
}

type MapAnimatedFootprintProps = {
  path: MapPath
  id?: string
  color?: string
  size?: number
  stepSpacing?: number
  staggerDelay?: number
  duration?: number
  autoStart?: boolean
  loop?: boolean
  className?: string
}

const footprintControls = new Map<string, FootprintControl>()

const DEFAULT_COLOR = "#000000"
const DEFAULT_SIZE = 20
const DEFAULT_STEP_SPACING = 48
const DEFAULT_STAGGER_DELAY = 200
const DEFAULT_DURATION = 400
const METERS_PER_DEGREE_LATITUDE = 111320
const LATERAL_OFFSET = 0.4

const approximateDistance = (from: MapCoordinates, to: MapCoordinates) => {
  const latitudeRadians = (from[1] * Math.PI) / 180
  const deltaX = (to[0] - from[0]) * Math.cos(latitudeRadians) * METERS_PER_DEGREE_LATITUDE
  const deltaY = (to[1] - from[1]) * METERS_PER_DEGREE_LATITUDE

  return Math.sqrt(deltaX ** 2 + deltaY ** 2)
}

const approximateBearing = (from: MapCoordinates, to: MapCoordinates) => {
  const latitudeRadians = (from[1] * Math.PI) / 180
  const deltaX = (to[0] - from[0]) * Math.cos(latitudeRadians)
  const deltaY = to[1] - from[1]

  return ((Math.atan2(deltaX, deltaY) * 180) / Math.PI + 360) % 360
}

const interpolateCoordinate = (from: MapCoordinates, to: MapCoordinates, fraction: number): MapCoordinates => {
  return [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction]
}

const generateSteps = (path: MapPath, stepSpacing: number): FootprintStep[] => {
  if (path.length < 2) {
    return []
  }

  const steps: FootprintStep[] = []
  let distanceAccumulated = 0
  let stepIndex = 0

  for (let segmentIndex = 0; segmentIndex < path.length - 1; segmentIndex++) {
    const fromCoordinate = path[segmentIndex]
    const toCoordinate = path[segmentIndex + 1]
    const segmentDistance = approximateDistance(fromCoordinate, toCoordinate)
    const bearing = approximateBearing(fromCoordinate, toCoordinate)

    let distanceIntoSegment = stepSpacing - distanceAccumulated

    while (distanceIntoSegment <= segmentDistance) {
      const fraction = distanceIntoSegment / segmentDistance
      const coordinates = interpolateCoordinate(fromCoordinate, toCoordinate, fraction)

      steps.push({
        coordinates,
        bearing,
        isLeft: stepIndex % 2 === 0,
      })

      stepIndex++
      distanceIntoSegment += stepSpacing
    }

    distanceAccumulated = segmentDistance - (distanceIntoSegment - stepSpacing)
  }

  return steps
}

const createMarkers = (steps: FootprintStep[], map: mapboxgl.Map): MarkerEntry[] => {
  const markers: MarkerEntry[] = []

  for (const step of steps) {
    const container = document.createElement("div")
    container.style.opacity = "0"
    container.style.visibility = "hidden"
    container.style.pointerEvents = "none"

    const marker = new mapgl.Marker({
      element: container,
      anchor: "center",
    })
      .setLngLat(step.coordinates)
      .addTo(map)

    marker.getElement().style.pointerEvents = "none"
    markers.push({ marker, element: container })
  }

  return markers
}

const removeMarkers = (markers: MarkerEntry[]) => {
  for (const entry of markers) {
    entry.marker.remove()
  }
}

export const MapAnimatedFootprint = ({
  path,
  id = "footprint",
  color = DEFAULT_COLOR,
  size = DEFAULT_SIZE,
  stepSpacing = DEFAULT_STEP_SPACING,
  staggerDelay = DEFAULT_STAGGER_DELAY,
  duration = DEFAULT_DURATION,
  autoStart = true,
  loop = false,
  className,
}: MapAnimatedFootprintProps) => {
  const { map, isLoaded } = useMap()
  const [markers, setMarkers] = useState<MarkerEntry[]>([])
  const autoStartRef = useRef(autoStart)
  autoStartRef.current = autoStart

  const steps = useMemo(() => {
    return generateSteps(path, stepSpacing)
  }, [path, stepSpacing])

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    const createdMarkers = createMarkers(steps, map)
    setMarkers([...createdMarkers])

    return () => {
      removeMarkers(createdMarkers)
      setMarkers([])
    }
  }, [map, isLoaded, steps])

  useEffect(() => {
    if (markers.length === 0) {
      return
    }

    let animations: Animation[] = []
    let intervalId: ReturnType<typeof setInterval> | null = null
    let active = false

    const startAnimations = () => {
      for (const animation of animations) {
        animation.cancel()
      }

      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }

      for (const entry of markers) {
        entry.element.style.visibility = "visible"
      }

      animations = markers.map((entry, index) => {
        return entry.element.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration,
          delay: index * staggerDelay,
          fill: "both",
          easing: "ease-in",
        })
      })

      active = true

      if (loop) {
        const totalCycleDuration = markers.length * staggerDelay + duration
        intervalId = setInterval(startAnimations, totalCycleDuration)
      }
    }

    const resetAnimations = () => {
      for (const animation of animations) {
        animation.cancel()
      }
      animations = []
      active = false

      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }

      for (const entry of markers) {
        entry.element.style.opacity = "0"
        entry.element.style.visibility = "hidden"
      }
    }

    const control: FootprintControl = {
      start: startAnimations,
      reset: resetAnimations,
      get isActive() {
        return active
      },
    }

    footprintControls.set(id, control)

    if (autoStartRef.current) {
      startAnimations()
    }

    return () => {
      resetAnimations()
      footprintControls.delete(id)
    }
  }, [id, loop, markers, staggerDelay, duration])

  return (
    <>
      {markers.map((entry, index) => {
        const step = steps[index]
        if (!step) {
          return null
        }
        return (
          <Footprint key={`${id}-${index}`} entry={entry} step={step} color={color} size={size} className={className} />
        )
      })}
    </>
  )
}

const Footprint = ({ entry, step, color, size, className }: FootprintProps) => {
  const lateralOffset = step.isLeft ? -LATERAL_OFFSET : LATERAL_OFFSET
  const rotationDeg = step.bearing
  const scaleX = step.isLeft ? 1 : -1

  return createPortal(
    <div
      className={className}
      style={{
        transform: `rotate(${rotationDeg}deg) translateX(${lateralOffset}em) scaleX(${scaleX})`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Footprints size={size} />
    </div>,
    entry.element
  )
}

const CONTROL_UPDATE_INTERVAL = 100

export const useFootprintControl = (id: string): FootprintControl | null => {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      forceUpdate((previous) => {
        return previous + 1
      })
    }, CONTROL_UPDATE_INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return footprintControls.get(id) || null
}
