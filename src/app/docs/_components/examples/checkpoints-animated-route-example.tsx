"use client"

import { useState, useEffect, useRef } from "react"
import { Map, MapLineAnimated, MapMarker, MarkerContent } from "@/registry/map"
import { MapCoordinates } from "@/registry/map/types"
import { Check, Circle, Drone } from "lucide-react"

type CheckpointMarkerProps = {
  coordinates: MapCoordinates
  isChecked: boolean
}

const CHECKPOINT_LOCATIONS: MapCoordinates[] = [
  [-73.985, 40.758],
  [-73.975, 40.752],
  [-73.96, 40.742],
  [-73.945, 40.732],
]

const ANIMATION_DURATION = 6000
const RESTART_DELAY = 500

// Calculates when each checkpoint should be marked based on proportional distance along the path
const getCheckpointTimings = (path: MapCoordinates[]) => {
  const timings: number[] = [0]
  const distances: number[] = []
  let totalDistance = 0

  for (let i = 0; i < path.length - 1; i++) {
    const dx = path[i + 1][0] - path[i][0]
    const dy = path[i + 1][1] - path[i][1]
    const dist = Math.sqrt(dx * dx + dy * dy)
    distances.push(dist)
    totalDistance += dist
  }

  let cumulative = 0
  for (const dist of distances) {
    cumulative += dist
    timings.push((cumulative / totalDistance) * ANIMATION_DURATION)
  }

  return timings
}

const CHECKPOINT_TIMINGS = getCheckpointTimings(CHECKPOINT_LOCATIONS)

const CheckpointMarker = ({ coordinates, isChecked }: CheckpointMarkerProps) => {
  const icon = isChecked ? (
    <Check className="size-4 text-white" strokeWidth={3} />
  ) : (
    <Circle className="size-3 text-muted-foreground" />
  )

  const markerClass = isChecked
    ? "flex size-8 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-md transition-all duration-300"
    : "flex size-8 items-center justify-center rounded-full border-2 border-border bg-muted shadow-md transition-all duration-300"

  return (
    <MapMarker coordinates={coordinates}>
      <MarkerContent>
        <div className={markerClass}>{icon}</div>
      </MarkerContent>
    </MapMarker>
  )
}

export const CheckpointsAnimatedRouteExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const [checkedIndices, setCheckedIndices] = useState<number[]>([])
  const [cycle, setCycle] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  // Prevents double-triggering of animation restart
  const isCompletingRef = useRef(false)

  useEffect(() => {
    if (!isAnimating) {
      return
    }

    const timeouts = CHECKPOINT_TIMINGS.map((timing, index) => {
      return setTimeout(() => {
        setCheckedIndices((prev) => {
          return [...prev, index]
        })
      }, timing)
    })

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [cycle, isAnimating])

  const handleAnimationComplete = () => {
    if (isCompletingRef.current) {
      return
    }

    isCompletingRef.current = true
    setIsAnimating(false)

    setTimeout(() => {
      setCheckedIndices([])
      setCycle((prev) => {
        return prev + 1
      })
      setIsAnimating(true)
      isCompletingRef.current = false
    }, RESTART_DELAY)
  }

  const renderCheckpoint = (location: MapCoordinates, index: number) => {
    return <CheckpointMarker key={index} coordinates={location} isChecked={checkedIndices.includes(index)} />
  }

  const animatedLine = isAnimating ? (
    <MapLineAnimated
      key={cycle}
      id="checkpoints-route"
      path={CHECKPOINT_LOCATIONS}
      color="#10b981"
      width={4}
      duration={ANIMATION_DURATION}
      showMarker
      markerIcon={<Drone className="size-6 text-foreground" />}
      markerColor="transparent"
      markerBorderless
      onComplete={handleAnimationComplete}
    />
  ) : null

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.965, 40.745]} zoom={12.5}>
        {animatedLine}
        {CHECKPOINT_LOCATIONS.map(renderCheckpoint)}
      </Map>
    </div>
  )
}
