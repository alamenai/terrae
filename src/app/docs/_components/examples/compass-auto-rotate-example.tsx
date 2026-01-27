"use client"

import { Map, MapCompass } from "@/registry/map"

export const CompassAutoRotateExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={11}>
        <MapCompass autoRotate autoRotateSpeed={0.5} showBearing />
      </Map>
    </div>
  )
}
