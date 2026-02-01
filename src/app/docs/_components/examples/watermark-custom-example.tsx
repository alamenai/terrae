"use client"

import { Map, MapWatermark } from "@/registry/map"

export const WatermarkCustomExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={10}>
        <MapWatermark className="text-6xl sm:text-8xl font-black italic tracking-widest text-black/5 dark:text-white/5">
          CONFIDENTIAL
        </MapWatermark>
      </Map>
    </div>
  )
}
