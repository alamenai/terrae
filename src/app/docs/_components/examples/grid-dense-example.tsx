"use client"

import { Map, MapGrid } from "@/registry/map"

export const GridDenseExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-74.006, 40.7128]} zoom={8}>
        <MapGrid
          latitudeInterval={1}
          longitudeInterval={1}
          lineColor="#ffffff"
          lineOpacity={0.2}
          lineWidth={1}
          labelSize={9}
        />
      </Map>
    </div>
  )
}
