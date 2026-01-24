"use client"

import { Map, MapAnimatedPolygon } from "@/registry/map"
import type { MapCoordinates } from "@/registry/map/types"

const CENTER: MapCoordinates = [-118.7798, 34.0259]

const POLYGON_COORDINATES: MapCoordinates[] = [
  [-118.82, 34.05],
  [-118.78, 34.07],
  [-118.73, 34.06],
  [-118.71, 34.03],
  [-118.72, 33.99],
  [-118.76, 33.97],
  [-118.81, 33.98],
  [-118.84, 34.01],
]

export const PolygonOutlineExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={CENTER} zoom={10}>
        <MapAnimatedPolygon
          id="polygon-outline"
          coordinates={POLYGON_COORDINATES}
          strokeColor="#ef4444"
          strokeWidth={3}
          duration={2000}
          animationMode="draw"
          loop
          loopDelay={1500}
        />
      </Map>
    </div>
  )
}
