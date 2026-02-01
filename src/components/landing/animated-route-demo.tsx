"use client"

import { Map, MapLineAnimated } from "@/registry/map"
import { Ambulance } from "lucide-react"
import { InfoPanel } from "./info-panel"

const ROUTE_PATH: [number, number][] = [
  [-122.42, 37.775],
  [-122.415, 37.778],
  [-122.41, 37.78],
  [-122.405, 37.782],
  [-122.4, 37.785],
  [-122.395, 37.787],
  [-122.39, 37.79],
]

export const AnimatedRouteDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Emergency Status">
        <div className="font-medium mt-1">The ambulance is on way to you</div>
        <div className="flex items-center gap-1 mt-1">
          <Ambulance className="size-3 text-red-500" />
          <span className="text-xs text-muted-foreground">ETA: 8 min</span>
        </div>
      </InfoPanel>

      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        center={[-122.4, 37.785]}
        zoom={13}
        pitch={30}
      >
        <MapLineAnimated
          id="ambulance-route"
          path={ROUTE_PATH}
          color="#ef4444"
          width={4}
          duration={10000}
          loop
          showMarker
          markerIcon={
            <div className="relative flex items-center justify-center">
              <div className="absolute rounded-full bg-red-500/20 size-12 animate-pulse" />
              <div className="relative bg-red-500 p-2 rounded-full shadow-lg">
                <Ambulance className="size-5 text-white" />
              </div>
            </div>
          }
        />
      </Map>
    </div>
  )
}
