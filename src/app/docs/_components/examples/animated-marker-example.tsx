"use client";

import { useState } from "react";
import { Map, MapMarkerAnimated } from "@/registry/map";
import { Button } from "@/components/ui/button";

// Route coordinates (around Central Park, NYC)
const route: Array<[number, number]> = [
  [-73.9654, 40.7829],
  [-73.9718, 40.7644],
  [-73.9812, 40.7681],
  [-73.9583, 40.7736],
  [-73.9654, 40.7829],
];

export function AnimatedMarkerExample() {
  const [key, setKey] = useState(0);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const handleRestart = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center py-2">
        <Button onClick={handleRestart} size="sm" className="rounded-full">
          Restart Animation
        </Button>
      </div>
      <div className="h-100 w-full">
        <Map
          accessToken={accessToken}
          center={[-73.9712, 40.7731]}
          zoom={13}
        >
          <MapMarkerAnimated
            key={key}
            id="animated-marker"
            coordinates={route}
            duration={5000}
            showPath
            autoStart
          />
        </Map>
      </div>
    </div>
  );
}
