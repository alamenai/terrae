"use client"

import { Map, MapRadar } from "@/registry/map"

export const RadarDurationExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-3.7038, 40.4168]} zoom={4}>
        <MapRadar coordinates={[-3.7038, 40.4168]} duration={1000} />
        <MapRadar coordinates={[12.4964, 41.9028]} size={160} duration={4000} />
      </Map>
    </div>
  )
}
