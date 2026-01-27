"use client"

import { Map, MapCompass } from "@/registry/map"

export const CompassSizesExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={11} bearing={45}>
        <MapCompass size="sm" position="top-left" />
        <MapCompass size="md" position="top-right" />
        <MapCompass size="lg" position="bottom-left" />
        <MapCompass size="xl" position="bottom-right" />
      </Map>
    </div>
  )
}
