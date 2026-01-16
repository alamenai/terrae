"use client";

import { Map, MapRain, createZoomInterpolation } from "@/registry/map";

export function BasicRainExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <Map
        accessToken={accessToken}
        center={[24.951528, 60.169573]}
        zoom={16.8}
        pitch={74}
        bearing={12.8}
        style="mapbox://styles/mapbox/standard"
      >
        <MapRain
          density={createZoomInterpolation(0.5)}
          vignette={createZoomInterpolation(1.0)}
        />
      </Map>
    </div>
  );
}
