"use client"

import { Map, MapAnimatedPulse } from "@/registry/map"

export function AnimatedIconExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[0, 0]} zoom={2}>
        <MapAnimatedPulse
          id="pulsing-dot"
          size={100}
          coordinates={[0, 0]}
          color="rgba(0, 100, 255, 1)"
          pulseColor="rgba(0, 100, 255, 0.8)"
          duration={1000}
        />
      </Map>
    </div>
  )
}
