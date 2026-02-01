"use client"

import { Map, MapMarker, MarkerContent, MapMiniMap } from "@/registry/map"
import { Map as MapIcon } from "lucide-react"
import { InfoPanel } from "./info-panel"

const MAP_CENTER: [number, number] = [-74.006, 40.7128]

export const MinimapDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Navigation">
        <div className="font-medium mt-1">Overview Map</div>
        <div className="flex items-center gap-1 mt-1">
          <MapIcon className="size-3 text-teal-500" />
          <span className="text-xs text-muted-foreground">Context view</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={MAP_CENTER} zoom={14}>
        <MapMarker coordinates={MAP_CENTER}>
          <MarkerContent>
            <div className="relative flex items-center justify-center">
              <div className="absolute rounded-full bg-teal-500/20 size-12 animate-pulse" />
              <div className="relative bg-teal-500 p-2 rounded-full shadow-lg">
                <MapIcon className="size-4 text-white" />
              </div>
            </div>
          </MarkerContent>
        </MapMarker>
        <MapMiniMap position="bottom-left" zoomOffset={-5} />
      </Map>
    </div>
  )
}
