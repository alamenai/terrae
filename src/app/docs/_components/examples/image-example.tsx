"use client";

import { Map, MapImage } from "@/registry/map";

export function ImageExample() {
  return (
    <div className="h-full w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-122.4194, 37.7749]}
        zoom={15}
        pitch={45}
      >
        <MapImage
          id="overlay-image"
          url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
          coordinates={[
            [-122.42, 37.78],
            [-122.41, 37.78],
            [-122.41, 37.77],
            [-122.42, 37.77],
          ]}
        />
      </Map>
    </div>
  );
}
