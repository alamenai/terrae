"use client"

import { Map, MapRadar } from "@/registry/map"

export const RadarExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-74.006, 40.7128]} zoom={10}>
        <MapRadar id="radar-signal" coordinates={[-74.006, 40.7128]} size={200} duration={2000} />
      </Map>
    </div>
  )
}
