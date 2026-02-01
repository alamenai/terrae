"use client"

import { Map, MapRadar, MapWatermark } from "@/registry/map"
import { Radar } from "lucide-react"
import { InfoPanel } from "./info-panel"

export const RadarDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Radar Status">
        <div className="font-medium mt-1">3 stations active</div>
        <div className="flex items-center gap-1 mt-1">
          <Radar className="size-3 text-emerald-500" />
          <span className="text-xs text-muted-foreground">scanning</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[28.0, 38.0]} zoom={4}>
        <MapWatermark className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-black/10 dark:text-white/10">
          Terrae
        </MapWatermark>
        <MapRadar id="radar-center" coordinates={[28.0, 38.0]} size={400} duration={2000} />
        <MapRadar
          id="radar-east"
          coordinates={[35.0, 38.0]}
          size={320}
          color="rgba(59, 130, 246, 1)"
          gridColor="rgba(59, 130, 246, 0.3)"
          backgroundColor="rgba(0, 0, 30, 0.8)"
          duration={3000}
          rings={6}
        />
        <MapRadar id="radar-greece" coordinates={[22.5, 40.5]} size={280} duration={2500} showCrosshairs={false} />
      </Map>
    </div>
  )
}
