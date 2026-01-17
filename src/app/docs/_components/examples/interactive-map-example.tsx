"use client";

import { useState } from "react";
import { Map } from "@/registry/map";
import { MapControls } from "./map-controls";
import { MapStatsOverlay } from "./map-stats-overlay";

type ControlValue = [number];

const DEFAULT_ZOOM: ControlValue = [8];
const DEFAULT_PITCH: ControlValue = [0];
const DEFAULT_BEARING: ControlValue = [0];
const NEW_YORK_CENTER: [number, number] = [-74.006, 40.7128];

export function InteractiveMapExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [pitch, setPitch] = useState(DEFAULT_PITCH);
  const [bearing, setBearing] = useState(DEFAULT_BEARING);

  return (
    <div className="space-y-4">
      <MapControls
        zoom={zoom}
        pitch={pitch}
        bearing={bearing}
        onZoomChange={setZoom}
        onPitchChange={setPitch}
        onBearingChange={setBearing}
      />

      <div className="h-[400px] w-full relative">
        <MapStatsOverlay zoom={zoom[0]} pitch={pitch[0]} bearing={bearing[0]} />
        <Map
          accessToken={accessToken}
          center={NEW_YORK_CENTER}
          zoom={zoom[0]}
          pitch={pitch[0]}
          bearing={bearing[0]}
        />
      </div>
    </div>
  );
}
