"use client"

import { Map, MapRadar } from "@/registry/map"

export const RadarRingsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[24.9384, 60.1699]} zoom={6}>
        <MapRadar id="radar-many-rings" coordinates={[24.9384, 60.1699]} rings={8} />
      </Map>
    </div>
  )
}
