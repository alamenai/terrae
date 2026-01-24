"use client"

import { Map, MapAnimatedPolygon } from "@/registry/map"
import type { MapCoordinates } from "@/registry/map/types"

const CENTER: MapCoordinates = [-90.071, 29.951]

const POLYGON_COORDINATES: MapCoordinates[] = [
  [-90.12, 29.98],
  [-90.08, 30.0],
  [-90.03, 29.99],
  [-90.0, 29.96],
  [-90.02, 29.92],
  [-90.06, 29.9],
  [-90.11, 29.91],
  [-90.14, 29.94],
]

export const PolygonFilledExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={CENTER} zoom={11}>
        <MapAnimatedPolygon
          id="polygon-filled"
          coordinates={POLYGON_COORDINATES}
          strokeColor="#0ea5e9"
          strokeWidth={2}
          fillColor="#0ea5e9"
          fillOpacity={0.35}
          duration={2000}
          fillDuration={1000}
          animationMode="draw-then-fill"
          loop
          loopDelay={1500}
        />
      </Map>
    </div>
  )
}
