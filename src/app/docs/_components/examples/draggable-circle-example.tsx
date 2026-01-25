"use client"

import { useState } from "react"
import { Map, MapCircle } from "@/registry/map"
import type { MapCoordinates } from "@/registry/map/types"

export const DraggableCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [center, setCenter] = useState<MapCoordinates>([-73.9857, 40.7484])

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapCircle
          center={center}
          radius={2000}
          strokeColor="#3b82f6"
          strokeWidth={2}
          fillColor="#3b82f6"
          fillOpacity={0.1}
          draggable
          onDrag={setCenter}
        />
      </Map>
    </div>
  )
}
