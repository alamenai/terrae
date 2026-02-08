"use client"

import { useEffect, useRef } from "react"
import { Map, MapCyclone, useCycloneControl } from "@/registry/map"

const CYCLONE_PATH: [number, number][] = [
  [-81.5, 24.5],
  [-81.8, 25.0],
  [-82.2, 25.5],
  [-82.5, 26.0],
  [-82.7, 26.5],
  [-82.8, 27.0],
]

const MIN_SCALE = 0.3
const MAX_SCALE = 1.5
const LOOP_RESET_THRESHOLD = 0.1

const CycloneScaleController = () => {
  const control = useCycloneControl("growing-cyclone")
  const previousProgressRef = useRef(0)

  useEffect(() => {
    if (!control) {
      return
    }

    const updateScale = () => {
      const progress = control.progress
      const previousProgress = previousProgressRef.current

      const loopRestarted = previousProgress > 0.8 && progress < LOOP_RESET_THRESHOLD

      if (loopRestarted) {
        control.setScale(MIN_SCALE, true)
      } else {
        const newScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress
        control.setScale(newScale)
      }

      previousProgressRef.current = progress
    }

    const interval = setInterval(updateScale, 50)

    return () => {
      clearInterval(interval)
    }
  }, [control])

  return null
}

export const CycloneGrowingExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-82.2, 25.8]} zoom={6}>
        <MapCyclone
          id="growing-cyclone"
          coordinates={CYCLONE_PATH[0]}
          path={CYCLONE_PATH}
          duration={12000}
          loop
          size={200}
          intensity={1}
          scale={MIN_SCALE}
        />
        <CycloneScaleController />
      </Map>
    </div>
  )
}
