"use client";

import { Map, MapAnimatedPulse } from "@/registry/map";

export function LargePulseExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-100 w-full">
      <Map
        accessToken={accessToken}
        center={[0, 0]}
        zoom={2}
      >
        <MapAnimatedPulse
          id="large-pulsing-dot"
          size={200}
          coordinates={[0, 0]}
          color="rgba(255, 100, 50, 1)"
          pulseColor="rgba(255, 100, 50, 0.6)"
          duration={1500}
        />
      </Map>
    </div>
  );
}
