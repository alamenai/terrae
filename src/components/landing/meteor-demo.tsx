"use client"

import { Map, MapMeteor } from "@/registry/map"
import { Flame } from "lucide-react"
import { InfoPanel } from "./info-panel"

export const MeteorDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Meteor Alert">
        <div className="font-medium mt-1">Impact detected</div>
        <div className="flex items-center gap-1 mt-1">
          <Flame className="size-3 text-orange-500" />
          <span className="text-xs text-muted-foreground">Grand Canyon, AZ</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-112.4, 36.1]} zoom={8}>
        <MapMeteor id="landing-meteor-1" target={[-112.4, 36.1]} loop loopDelay={2000} size={300} />
        <MapMeteor id="landing-meteor-2" target={[-112.1, 36.3]} loop loopDelay={3000} size={200} angle={50} />
        <MapMeteor id="landing-meteor-3" target={[-112.7, 35.9]} loop loopDelay={4000} size={250} angle={30} />
        <MapMeteor id="landing-meteor-4" target={[-112.0, 35.8]} loop loopDelay={2500} size={180} angle={60} />
        <MapMeteor id="landing-meteor-5" target={[-112.6, 36.4]} loop loopDelay={3500} size={220} angle={40} />
      </Map>

      <div className="absolute inset-0 z-10" />
    </div>
  )
}
