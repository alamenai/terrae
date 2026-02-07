"use client"

import { Map, MapMusicDisc } from "@/registry/map"

export const MusicDiscAlbumExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapMusicDisc
          coordinates={[-122.4194, 37.7749]}
          size={80}
          image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
        />
      </Map>
    </div>
  )
}
