"use client"

import { Map, MapRadar } from "@/registry/map"

export const RadarColorExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={6}>
        <MapRadar
          id="radar-blue"
          coordinates={[2.3522, 48.8566]}
          color="rgba(59, 130, 246, 1)"
          gridColor="rgba(59, 130, 246, 0.3)"
          backgroundColor="rgba(0, 0, 30, 0.8)"
        />
        <MapRadar
          id="radar-red"
          coordinates={[7.2619, 43.7102]}
          size={160}
          color="rgba(239, 68, 68, 1)"
          gridColor="rgba(239, 68, 68, 0.3)"
          backgroundColor="rgba(30, 0, 0, 0.8)"
        />
      </Map>
    </div>
  )
}
