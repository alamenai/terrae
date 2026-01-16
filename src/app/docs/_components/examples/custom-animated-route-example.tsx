"use client";

import { useState } from "react";
import { Map, MapLineAnimated } from "@/registry/map";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function CustomAnimatedRouteExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const [duration, setDuration] = useState([3000]);

  // Delivery route across San Francisco
  const route: Array<[number, number]> = [
    [-122.4194, 37.7749],
    [-122.4294, 37.7689],
    [-122.4094, 37.7849],
    [-122.3994, 37.7889],
    [-122.4094, 37.7949],
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="space-y-2">
          <Label htmlFor="duration">
            Duration: <span className="font-mono text-muted-foreground">{duration[0]}ms</span>
          </Label>
          <Slider
            id="duration"
            min={1000}
            max={10000}
            step={500}
            value={duration}
            onValueChange={setDuration}
          />
        </div>
      </div>

      <div className="h-full w-full">
        <Map
          accessToken={accessToken}
          center={[-122.4144, 37.7819]}
          zoom={13}
        >
          <MapLineAnimated
            id="custom-route"
            coordinates={route}
            color="#10b981"
            width={6}
            duration={duration[0]}
            markerColor="#10b981"
          />
        </Map>
      </div>
    </div>
  );
}
