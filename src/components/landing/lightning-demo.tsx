"use client"

import { Map, MapLightning } from "@/registry/map"
import { Zap } from "lucide-react"
import { InfoPanel } from "./info-panel"

export const LightningDemo = () => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <InfoPanel title="Storm Warning">
        <div className="font-medium mt-1">Electrical storm</div>
        <div className="flex items-center gap-1 mt-1">
          <Zap className="size-3 text-yellow-500" />
          <span className="text-xs text-muted-foreground">Central US</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-95.7, 37.1]} zoom={4}>
        <MapLightning id="landing-lightning" coordinates={[-95.7, 37.1]} size={300} autoStrike strikeInterval={2000} />
      </Map>
    </div>
  )
}
