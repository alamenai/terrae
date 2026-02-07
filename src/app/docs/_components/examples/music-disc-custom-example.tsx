"use client"

import { Map, MapMusicDisc } from "@/registry/map"

export const MusicDiscCustomExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapMusicDisc
          coordinates={[-122.4194, 37.7749]}
          size={100}
          discColor="#1e1b4b"
          centerColor="#312e81"
          noteColor="#f472b6"
          spinDuration={2000}
        />
      </Map>
    </div>
  )
}
