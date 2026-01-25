"use client"

import { useState } from "react"
import { RotateCcw, Loader2 } from "lucide-react"
import { Map, MapTargetingReticle, MapAnimatedPulse } from "@/registry/map"
import type { MapCoordinates } from "@/registry/map/types"

const START: MapCoordinates = [-74.02, 40.72]
const TARGET: MapCoordinates = [-74.006, 40.712]

export const TargetingReticleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [isLocked, setIsLocked] = useState(false)
  const [key, setKey] = useState(0)

  const handleReset = () => {
    setIsLocked(false)
    setKey((prev) => prev + 1)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-74.01, 40.715]} zoom={14}>
        <MapAnimatedPulse
          id="target"
          coordinates={TARGET}
          color="rgba(239, 68, 68, 1)"
          pulseColor="rgba(239, 68, 68, 0.6)"
        />
        <MapTargetingReticle
          key={key}
          coordinates={START}
          target={TARGET}
          showCoordinates
          onLocked={() => setIsLocked(true)}
        />
      </Map>
      <button
        onClick={handleReset}
        disabled={!isLocked}
        className="absolute top-4 right-4 z-20 flex size-12 cursor-pointer items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLocked ? <RotateCcw className="size-5" /> : <Loader2 className="size-5 animate-spin" />}
      </button>
      {isLocked && (
        <div className="absolute bottom-4 right-4 rounded bg-green-500/90 px-3 py-1 text-sm font-medium text-white">
          Target Locked
        </div>
      )}
    </div>
  )
}
