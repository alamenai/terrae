"use client";

import { Map, MapMarkerAnimated } from "@/registry/map";

// Route coordinates around Central Park
const route: Array<[number, number]> = [
  [-73.9654, 40.7829],
  [-73.9718, 40.7644],
  [-73.9812, 40.7681],
  [-73.9583, 40.7736],
  [-73.9654, 40.7829],
];

export function AnimatedMarkerLoopExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <Map
        accessToken={accessToken}
        center={[-73.9712, 40.7731]}
        zoom={13}
      >
        <MapMarkerAnimated
          id="runner"
          coordinates={route}
          color="#10b981"
          size={12}
          duration={8000}
          loop
          showPath
          pathColor="#10b981"
          pathWidth={3}
        />
      </Map>
    </div>
  );
}
