"use client"

import { Map, MapImage } from "@/registry/map"

export function ImageOpacityExample() {
  return (
    <div className="h-full w-full">
      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!} center={[-74.006, 40.7128]} zoom={14}>
        <MapImage
          id="overlay-image-opacity"
          url="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop"
          coordinates={[
            [-74.01, 40.72],
            [-74.0, 40.72],
            [-74.0, 40.71],
            [-74.01, 40.71],
          ]}
          opacity={0.6}
        />
      </Map>
    </div>
  )
}
