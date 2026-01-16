"use client";

import { Map, MapMiniMap } from "@/registry/map";

export function MiniMapCustomExample() {
  return (
    <div className="h-full w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-0.1276, 51.5074]}
        zoom={11}
      >
        <MapMiniMap
          position="bottom-left"
          width={250}
          height={180}
          zoomOffset={-6}
          boxColor="#10b981"
          boxBorderWidth={3}
        />
      </Map>
    </div>
  );
}
