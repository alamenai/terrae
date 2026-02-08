"use client"

import { Map, MapMarker, MarkerContent, MapMiniMap } from "@/registry/map"
import { MapPin } from "lucide-react"

export function MiniMapExample() {
  return (
    <div className="h-full w-full">
      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!} center={[-122.4194, 37.7749]} zoom={13}>
        <MapMarker coordinates={[-122.4194, 37.7749]}>
          <MarkerContent>
            <div className="flex items-center gap-2 bg-card text-card-foreground px-3 py-2 rounded-lg shadow-lg border">
              <MapPin className="h-4 w-4" />
              <span>San Francisco</span>
            </div>
          </MarkerContent>
        </MapMarker>
        <MapMiniMap />
      </Map>
    </div>
  )
}
