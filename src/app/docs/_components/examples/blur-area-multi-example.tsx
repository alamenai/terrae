"use client"

import { Map, MapBlurArea } from "@/registry/map"
import type { MapCoordinates } from "@/registry/map/types"

const AREA_CENTER: MapCoordinates = [-74.005, 40.713]

const BLUR_AREAS = [
  {
    coordinates: [
      [-74.02, 40.705],
      [-74.02, 40.712],
      [-74.012, 40.712],
      [-74.012, 40.705],
    ] as MapCoordinates[],
    blur: 8,
    rounded: 12,
  },
  {
    coordinates: [
      [-74.008, 40.714],
      [-74.008, 40.722],
      [-73.998, 40.722],
      [-73.998, 40.714],
    ] as MapCoordinates[],
    blur: 12,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    rounded: 20,
  },
  {
    coordinates: [
      [-73.995, 40.706],
      [-73.995, 40.712],
      [-73.985, 40.712],
      [-73.985, 40.706],
    ] as MapCoordinates[],
    blur: 6,
    rounded: "full" as const,
  },
]

export const BlurAreaMultiExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={AREA_CENTER} zoom={13}>
        <MapBlurArea areas={BLUR_AREAS} />
      </Map>
    </div>
  )
}
