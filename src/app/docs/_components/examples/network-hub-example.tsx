"use client"

import { Map, MapLineRadial } from "@/registry/map"
import { Server, Monitor } from "lucide-react"

const DATACENTER: [number, number] = [-95.3698, 29.7604]

const DESTINATIONS: Array<[number, number]> = [
  [-122.4194, 37.7749],
  [-73.9857, 40.7484],
  [-87.6298, 41.8781],
  [-118.2437, 34.0522],
  [-71.0589, 42.3601],
  [-84.388, 33.749],
]

const ORIGIN_MARKER_ICON = <Server className="h-4 w-4 text-white" />
const DESTINATION_MARKER_ICON = <Monitor className="h-3 w-3 text-white" />

export const NetworkHubExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-95, 38]} zoom={3} projection="mercator">
        <MapLineRadial
          id="network-hub"
          origin={DATACENTER}
          destinations={DESTINATIONS}
          color="#06b6d4"
          width={3}
          opacity={0.9}
          curvature={0}
          duration={1200}
          staggerDelay={100}
          loop
          loopDelay={800}
          showOriginMarker
          originMarkerColor="#06b6d4"
          originMarkerIcon={ORIGIN_MARKER_ICON}
          originMarkerPulse={false}
          showDestinationMarkers
          destinationMarkerColor="#06b6d4"
          destinationMarkerIcon={DESTINATION_MARKER_ICON}
        />
      </Map>
    </div>
  )
}
