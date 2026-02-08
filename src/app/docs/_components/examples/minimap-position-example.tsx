"use client"

import { Map, MapMiniMap } from "@/registry/map"

export function MiniMapPositionExample() {
  return (
    <div className="h-full w-full">
      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!} center={[2.3522, 48.8566]} zoom={12}>
        <MapMiniMap position="top-left" />
      </Map>
    </div>
  )
}
