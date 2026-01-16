"use client";

import { Map } from "./map";
import type { ReactNode } from "react";

type MapCompareProps = {
  /** Mapbox access token. Required. */
  accessToken: string;
  /** Custom loading component */
  loader?: ReactNode;
  /** Style for the before (left) map */
  beforeStyle?: string;
  /** Style for the after (right) map */
  afterStyle?: string;
  /** Initial map center [longitude, latitude] */
  center?: [number, number];
  /** Initial zoom level */
  zoom?: number;
  /** Map bearing (rotation) */
  bearing?: number;
  /** Map pitch (tilt) */
  pitch?: number;
  /** Map projection */
  projection?: "globe" | "mercator" | "naturalEarth" | "equalEarth" | "winkelTripel";
  /** Initial split position (0-100) */
  defaultSize?: number;
};

export function MapCompare({
  accessToken,
  loader,
  beforeStyle,
  afterStyle,
  center = [0, 0],
  zoom = 2,
  bearing = 0,
  pitch = 0,
  projection,
  defaultSize = 50,
}: MapCompareProps) {
  return (
    <div className="relative w-full h-full flex">
      <div className="relative h-full" style={{ width: `${defaultSize}%` }}>
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-sm border rounded px-2 py-1 text-xs font-medium">
          Before
        </div>
        <Map
          accessToken={accessToken}
          center={center}
          zoom={zoom}
          bearing={bearing}
          pitch={pitch}
          projection={projection}
          style={beforeStyle}
          loader={loader}
        />
      </div>

      <div className="relative h-full" style={{ width: `${100 - defaultSize}%` }}>
        <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-sm border rounded px-2 py-1 text-xs font-medium">
          After
        </div>
        <Map
          accessToken={accessToken}
          center={center}
          zoom={zoom}
          bearing={bearing}
          pitch={pitch}
          projection={projection}
          style={afterStyle}
          loader={loader}
        />
      </div>
    </div>
  );
}
