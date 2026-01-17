"use client";

import { useState } from "react";
import { Map, MapLine } from "@/registry/map";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function LineDashExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const [dashLength, setDashLength] = useState([4]);

  const line: Array<[number, number]> = [
    [-122.48, 37.83],
    [-122.47, 37.82],
    [-122.46, 37.81],
    [-122.45, 37.80],
  ];

  const dashArray: [number, number] = [dashLength[0], 2];
  const patternType = dashLength[0] === 0 ? "Solid" :
                      dashLength[0] === 1 ? "Dotted" :
                      dashLength[0] <= 4 ? "Short Dash" : "Long Dash";

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-muted/50">
        <div className="space-y-2">
          <Label htmlFor="dash-length">
            Dash Length: <span className="font-mono text-muted-foreground">{dashLength[0]}px</span>
          </Label>
          <Slider
            id="dash-length"
            min={0}
            max={20}
            step={1}
            value={dashLength}
            onValueChange={setDashLength}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
          <div className="flex gap-4 text-sm">
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Pattern</div>
              <div className="font-mono font-semibold">{patternType}</div>
            </div>
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Dash Array</div>
              <div className="font-mono font-semibold">[{dashLength[0]}, 2]</div>
            </div>
          </div>
        </div>
        <Map accessToken={accessToken} center={[-122.465, 37.815]} zoom={13}>
          <MapLine
            coordinates={line}
            color="#3b82f6"
            width={4}
            dashArray={dashLength[0] === 0 ? undefined : dashArray}
          />
        </Map>
      </div>
    </div>
  );
}
