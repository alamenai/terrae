"use client";

import { Map, MapMarker } from "@/registry/map";

export function BasicMapExample() {
  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        center={[-122.4194, 37.7749]}
        zoom={12}
      >
        <MapMarker
          coordinates={[-122.4194, 37.7749]}
        >
          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-lg">
            San Francisco
          </div>
        </MapMarker>
      </Map>
    </div>
  );
}
