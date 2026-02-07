"use client"

import { Map, MapGrid } from "@/registry/map"

export const GridCustomExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[0, 20]} zoom={2}>
        <MapGrid
          latitudeInterval={15}
          longitudeInterval={15}
          lineColor="#00ff00"
          lineOpacity={0.5}
          lineWidth={2}
          labelColor="#00ff00"
          labelBackground="rgba(0, 0, 0, 0.7)"
        />
      </Map>
    </div>
  )
}
