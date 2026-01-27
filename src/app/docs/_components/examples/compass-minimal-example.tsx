"use client"

import { Map, MapCompass } from "@/registry/map"

export const CompassMinimalExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={11} bearing={45} pitch={30}>
        <MapCompass showRing={false} showCardinals={false} size="lg" />
      </Map>
    </div>
  )
}
