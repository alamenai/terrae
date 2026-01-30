"use client"

import { Map, MapRadar } from "@/registry/map"

export const RadarNoCrosshairsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[139.6917, 35.6895]} zoom={8}>
        <MapRadar id="radar-no-crosshairs" coordinates={[139.6917, 35.6895]} showCrosshairs={false} />
      </Map>
    </div>
  )
}
