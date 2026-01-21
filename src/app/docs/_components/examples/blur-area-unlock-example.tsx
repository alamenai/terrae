"use client"

import { useState } from "react"
import { Map, MapBlurArea } from "@/registry/map"
import { MapCoordinates } from "@/registry/map/types"
import { Lock, Unlock } from "lucide-react"

const BLUR_AREA_COORDINATES: MapCoordinates[] = [
  [-74.012, 40.708],
  [-74.012, 40.718],
  [-73.998, 40.718],
  [-73.998, 40.708],
]

const AREA_CENTER: MapCoordinates = [-74.005, 40.713]

export const BlurAreaUnlockExample = () => {
  const [isLocked, setIsLocked] = useState(true)
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const handleToggle = () => {
    setIsLocked((prev) => !prev)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={AREA_CENTER} zoom={14} pitch={0}>
        {isLocked && <MapBlurArea coordinates={BLUR_AREA_COORDINATES} blur={10} />}
      </Map>
      <button
        onClick={handleToggle}
        className="absolute bottom-4 right-4 z-20 flex size-12 cursor-pointer items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-background"
      >
        {isLocked ? <Unlock className="size-5" /> : <Lock className="size-5" />}
      </button>
    </div>
  )
}
