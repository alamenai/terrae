"use client"

import { Map, MapArcAnimated } from "@/registry/map"

const LONDON: [number, number] = [-0.1276, 51.5074]
const PARIS: [number, number] = [2.3522, 48.8566]

export const ArcWithMarkersExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <Map accessToken={accessToken} center={[1.1, 50]} zoom={5}>
      <MapArcAnimated
        id="arc-markers"
        origin={LONDON}
        destination={PARIS}
        color="#8b5cf6"
        width={4}
        height={0.3}
        duration={2000}
        loop
        headType="arrow"
        headSize={28}
        showOriginMarker
        showDestinationMarker
        originMarkerColor="#3b82f6"
        destinationMarkerColor="#ef4444"
      />
    </Map>
  )
}
