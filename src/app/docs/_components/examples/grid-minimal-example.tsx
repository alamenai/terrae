"use client"

import { Map, MapGrid } from "@/registry/map"

export const GridMinimalExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[0, 20]} zoom={2}>
        <MapGrid
          latitudeInterval={20}
          longitudeInterval={20}
          showLabels={false}
          lineColor="#ffffff"
          lineOpacity={0.15}
        />
      </Map>
    </div>
  )
}
