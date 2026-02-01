"use client"

import { Map, MapWatermark } from "@/registry/map"

export const WatermarkExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-74.006, 40.7128]} zoom={10}>
        <MapWatermark>Terrae</MapWatermark>
      </Map>
    </div>
  )
}
