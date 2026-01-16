"use client";

import { useState } from "react";
import { Map, MapLine } from "@/registry/map";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function LineGapExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const [gapLength, setGapLength] = useState([2]);

  const line: Array<[number, number]> = [
    [-122.48, 37.83],
    [-122.47, 37.82],
    [-122.46, 37.81],
    [-122.45, 37.80],
  ];

  const dashArray: [number, number] = [4, gapLength[0]];
  const spacingType = gapLength[0] === 0 ? "Solid" :
                      gapLength[0] <= 2 ? "Tight" :
                      gapLength[0] <= 5 ? "Normal" : "Wide";

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="space-y-2">
          <Label htmlFor="gap-length">
            Gap Length: <span className="font-mono text-muted-foreground">{gapLength[0]}px</span>
          </Label>
          <Slider
            id="gap-length"
            min={0}
            max={20}
            step={1}
            value={gapLength}
            onValueChange={setGapLength}
          />
        </div>
      </div>

      <div className="h-100 w-full relative">
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
          <div className="flex gap-4 text-sm">
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Spacing</div>
              <div className="font-mono font-semibold">{spacingType}</div>
            </div>
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Dash Array</div>
              <div className="font-mono font-semibold">[4, {gapLength[0]}]</div>
            </div>
          </div>
        </div>
        <Map accessToken={accessToken} center={[-122.465, 37.815]} zoom={13}>
          <MapLine
            coordinates={line}
            color="#3b82f6"
            width={4}
            dashArray={gapLength[0] === 0 ? undefined : dashArray}
          />
        </Map>
      </div>
    </div>
  );
}
