"use client"

import { Map, MapMusicDisc } from "@/registry/map"

export const MusicDiscExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapMusicDisc coordinates={[-122.4194, 37.7749]} />
      </Map>
    </div>
  )
}
