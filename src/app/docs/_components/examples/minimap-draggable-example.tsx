"use client"

import { Map, MapMiniMap } from "@/registry/map"

export const MiniMapDraggableExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-74.006, 40.7128]} zoom={12}>
        <MapMiniMap draggable />
      </Map>
    </div>
  )
}
