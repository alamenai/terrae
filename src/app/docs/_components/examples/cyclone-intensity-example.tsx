"use client"

import { Map, MapCyclone } from "@/registry/map"

export const CycloneIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-97.5, 35.5]} zoom={9}>
        <MapCyclone id="cyclone-weak" coordinates={[-97.7, 35.6]} intensity={0.5} size={150} />
        <MapCyclone id="cyclone-medium" coordinates={[-97.5, 35.5]} intensity={1} size={200} />
        <MapCyclone id="cyclone-strong" coordinates={[-97.3, 35.4]} intensity={1.5} size={250} />
      </Map>
    </div>
  )
}
