"use client"

import { Map, MapCyclone } from "@/registry/map"

export const CycloneExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-97.5, 35.5]} zoom={10}>
        <MapCyclone id="cyclone-basic" coordinates={[-97.5, 35.5]} />
      </Map>
    </div>
  )
}
