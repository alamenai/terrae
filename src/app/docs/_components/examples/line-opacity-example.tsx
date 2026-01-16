"use client";

import { useState } from "react";
import { Map, MapLine } from "@/registry/map";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function LineOpacityExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const [opacity, setOpacity] = useState([100]);

  const line: Array<[number, number]> = [
    [-122.48, 37.83],
    [-122.47, 37.82],
    [-122.46, 37.81],
    [-122.45, 37.80],
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="space-y-2">
          <Label htmlFor="opacity">
            Opacity: <span className="font-mono text-muted-foreground">{opacity[0]}%</span>
          </Label>
          <Slider
            id="opacity"
            min={0}
            max={100}
            step={5}
            value={opacity}
            onValueChange={setOpacity}
          />
        </div>
      </div>

      <div className="h-100 w-full relative">
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
          <div className="flex gap-4 text-sm">
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Opacity</div>
              <div className="font-mono font-semibold">{opacity[0]}%</div>
            </div>
          </div>
        </div>
        <Map accessToken={accessToken} center={[-122.465, 37.815]} zoom={13}>
          <MapLine
            coordinates={line}
            color="#3b82f6"
            width={4}
            opacity={opacity[0] / 100}
          />
        </Map>
      </div>
    </div>
  );
}
