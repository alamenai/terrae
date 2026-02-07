"use client"

import { Map, MapGrid } from "@/registry/map"

export const GridExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[0, 20]} zoom={2}>
        <MapGrid />
      </Map>
    </div>
  )
}
