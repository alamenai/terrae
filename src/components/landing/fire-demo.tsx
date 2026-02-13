"use client"

import { Map, MapFire } from "@/registry/map"
import { Flame } from "lucide-react"
import { InfoPanel } from "./info-panel"

export const FireDemo = () => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <InfoPanel title="Wildfire Alert">
        <div className="font-medium mt-1">Paradise, CA</div>
        <div className="flex items-center gap-1 mt-1">
          <Flame className="size-3 text-red-500" />
          <span className="text-xs text-muted-foreground">spreading</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-121.606, 39.7596]} zoom={12}>
        <MapFire id="landing-fire" coordinates={[-121.606, 39.7596]} spread spreadSpeed={2} autoStart />
      </Map>
    </div>
  )
}
