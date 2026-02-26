"use client"

import { useEffect, useRef } from "react"
import { Map, MapCyclone, useCycloneControl } from "@/registry/map"
import { Wind } from "lucide-react"
import { InfoPanel } from "./info-panel"

const CYCLONE_PATH_WEST: [number, number][] = [
  [-81.5, 24.5],
  [-81.8, 25.0],
  [-82.2, 25.5],
  [-82.5, 26.0],
  [-82.7, 26.5],
  [-82.8, 27.0],
]

const CYCLONE_PATH_EAST: [number, number][] = [
  [-79.0, 24.0],
  [-79.5, 24.5],
  [-80.2, 25.0],
  [-81.0, 25.8],
  [-81.5, 26.5],
]

const CYCLONE_PATH_SOUTH: [number, number][] = [
  [-83.5, 24.0],
  [-83.3, 24.8],
  [-83.0, 25.5],
  [-82.8, 26.2],
  [-82.6, 27.0],
]

const MIN_SCALE = 0.3
const MAX_SCALE = 1.5
const LOOP_RESET_THRESHOLD = 0.1

type CycloneScaleControllerProps = {
  cycloneId: string
}

const CycloneScaleController = ({ cycloneId }: CycloneScaleControllerProps) => {
  const control = useCycloneControl(cycloneId)
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

export const CycloneDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Cyclone Tracking">
        <div className="font-medium mt-1">Category 4</div>
        <div className="flex items-center gap-1 mt-1">
          <Wind className="size-3 text-emerald-500" />
          <span className="text-xs text-muted-foreground">active</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-82.2, 25.8]} zoom={6}>
        <MapCyclone
          id="landing-cyclone-west"
          coordinates={CYCLONE_PATH_WEST[0]}
          path={CYCLONE_PATH_WEST}
          duration={12000}
          loop
          size={200}
          intensity={1}
          scale={MIN_SCALE}
        />
        <MapCyclone
          id="landing-cyclone-east"
          coordinates={CYCLONE_PATH_EAST[0]}
          path={CYCLONE_PATH_EAST}
          duration={16000}
          loop
          size={160}
          intensity={0.8}
          scale={MIN_SCALE}
        />
        <MapCyclone
          id="landing-cyclone-south"
          coordinates={CYCLONE_PATH_SOUTH[0]}
          path={CYCLONE_PATH_SOUTH}
          duration={14000}
          loop
          size={180}
          intensity={0.9}
          scale={MIN_SCALE}
        />
        <CycloneScaleController cycloneId="landing-cyclone-west" />
        <CycloneScaleController cycloneId="landing-cyclone-east" />
        <CycloneScaleController cycloneId="landing-cyclone-south" />
      </Map>

      <div className="absolute inset-0 z-10" />
    </div>
  )
}
