"use client"

import { useState } from "react"
import { Lock, Unlock } from "lucide-react"
import { Map, MapTargetingReticle, MapMarker, MarkerContent } from "@/registry/map"
import type { MapCoordinates } from "@/registry/map/types"

const TARGET_POSITION: MapCoordinates = [-74.006, 40.712]

export const TargetingReticleStaticExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [locked, setLocked] = useState(false)

  const handleToggle = () => {
    setLocked(!locked)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={TARGET_POSITION} zoom={14}>
        <MapMarker coordinates={TARGET_POSITION}>
          <MarkerContent>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </MarkerContent>
        </MapMarker>
        <MapTargetingReticle coordinates={TARGET_POSITION} size={120} locked={locked} />
      </Map>
      <button
        onClick={handleToggle}
        className="absolute top-4 right-4 z-20 flex size-12 cursor-pointer items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-background"
      >
        {locked ? <Unlock className="size-5" /> : <Lock className="size-5" />}
      </button>
    </div>
  )
}
