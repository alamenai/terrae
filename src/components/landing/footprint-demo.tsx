"use client"

import { Map, MapAnimatedFootprint } from "@/registry/map"
import { Footprints } from "lucide-react"
import { InfoPanel } from "./info-panel"

const FOOTPRINT_PATH: [number, number][] = [
  [-73.9857, 40.7484],
  [-73.9851, 40.7479],
  [-73.9845, 40.7473],
  [-73.9838, 40.7468],
  [-73.9831, 40.7462],
  [-73.9824, 40.7456],
  [-73.9817, 40.745],
  [-73.981, 40.7444],
]

export const FootprintDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Route Tracking">
        <div className="font-medium mt-1">Manhattan, NY</div>
        <div className="flex items-center gap-1 mt-1">
          <Footprints className="size-3 text-violet-500" />
          <span className="text-xs text-muted-foreground">8 steps</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-73.9838, 40.7468]} zoom={16}>
        <MapAnimatedFootprint path={FOOTPRINT_PATH} color="#8b5cf6" size={18} loop />
      </Map>

      <div className="absolute inset-0 z-10" />
    </div>
  )
}
