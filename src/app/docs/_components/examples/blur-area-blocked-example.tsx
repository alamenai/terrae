"use client"

import { Map, MapBlurArea } from "@/registry/map"
import { MapCoordinates } from "@/registry/map/types"

const BLUR_AREA_COORDINATES: MapCoordinates[] = [
  [-74.012, 40.708],
  [-74.012, 40.718],
  [-73.998, 40.718],
  [-73.998, 40.708],
]

const AREA_CENTER: MapCoordinates = [-74.005, 40.713]

export const BlurAreaBlockedExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={AREA_CENTER} zoom={14} pitch={0}>
        <MapBlurArea coordinates={BLUR_AREA_COORDINATES} blur={10} blockInteraction />
      </Map>
    </div>
  )
}
