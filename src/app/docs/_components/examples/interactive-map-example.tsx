"use client";

import { useState } from "react";
import { Map } from "@/registry/map";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function InteractiveMapExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const [zoom, setZoom] = useState([8]);
  const [pitch, setPitch] = useState([0]);
  const [bearing, setBearing] = useState([0]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
        <div className="space-y-2">
          <Label htmlFor="zoom">
            Zoom: <span className="font-mono text-muted-foreground">{zoom[0]}</span>
          </Label>
          <Slider
            id="zoom"
            min={0}
            max={20}
            step={0.5}
            value={zoom}
            onValueChange={setZoom}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pitch">
            Pitch: <span className="font-mono text-muted-foreground">{pitch[0]}°</span>
          </Label>
          <Slider
            id="pitch"
            min={0}
            max={85}
            step={1}
            value={pitch}
            onValueChange={setPitch}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bearing">
            Bearing: <span className="font-mono text-muted-foreground">{bearing[0]}°</span>
          </Label>
          <Slider
            id="bearing"
            min={-180}
            max={180}
            step={1}
            value={bearing}
            onValueChange={setBearing}
          />
        </div>
      </div>

      <div className="h-full w-full relative">
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
          <div className="flex gap-4 text-sm">
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Zoom</div>
              <div className="font-mono font-semibold">{zoom[0]}</div>
            </div>
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Pitch</div>
              <div className="font-mono font-semibold">{pitch[0]}°</div>
            </div>
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Bearing</div>
              <div className="font-mono font-semibold">{bearing[0]}°</div>
            </div>
          </div>
        </div>
        <Map
          accessToken={accessToken}
          center={[-74.006, 40.7128]}
          zoom={zoom[0]}
          pitch={pitch[0]}
          bearing={bearing[0]}
        />
      </div>
    </div>
  );
}
