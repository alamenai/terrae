"use client"

import { Map, MapWatermark } from "@/registry/map"

export const WatermarkPositionExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-74.006, 40.7128]} zoom={10}>
        <MapWatermark position="bottom-right" className="text-4xl font-bold text-black/20 dark:text-white/20">
          Draft
        </MapWatermark>
      </Map>
    </div>
  )
}
