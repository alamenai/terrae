"use client"

import { Map, MapMarker, MarkerContent } from "@/registry/map"
import { Code } from "lucide-react"
import { InfoPanel } from "./info-panel"

const HUBS = [
  { lng: -122.4194, lat: 37.7749, city: "San Francisco", size: 16 },
  { lng: -74.006, lat: 40.7128, city: "New York", size: 14 },
  { lng: -0.1276, lat: 51.5074, city: "London", size: 13 },
  { lng: 13.405, lat: 52.52, city: "Berlin", size: 12 },
  { lng: 2.3522, lat: 48.8566, city: "Paris", size: 11 },
  { lng: 139.6917, lat: 35.6895, city: "Tokyo", size: 10 },
  { lng: -122.3321, lat: 47.6062, city: "Seattle", size: 9 },
  { lng: 12.4964, lat: 41.9028, city: "Rome", size: 8 },
  { lng: -3.7038, lat: 40.4168, city: "Madrid", size: 7 },
  { lng: 18.0686, lat: 59.3293, city: "Stockholm", size: 7 },
]

export const PulsingHubsDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Active Projects">
        <div className="text-2xl font-semibold leading-tight">12,847</div>
        <div className="flex items-center gap-1 mt-1">
          <Code className="size-3 text-purple-500" />
          <span className="text-xs text-purple-500">+245</span>
          <span className="text-xs text-muted-foreground">this week</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[0, 30]} zoom={1.5}>
        {HUBS.map((loc) => {
          return (
            <MapMarker key={loc.city} coordinates={[loc.lng, loc.lat]}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute rounded-full bg-purple-500/20"
                    style={{ width: loc.size * 2.5, height: loc.size * 2.5 }}
                  />
                  <div
                    className="absolute rounded-full bg-purple-500/40 animate-ping"
                    style={{ width: loc.size * 1.5, height: loc.size * 1.5, animationDuration: "2s" }}
                  />
                  <div
                    className="relative rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"
                    style={{ width: loc.size, height: loc.size }}
                  />
                </div>
              </MarkerContent>
            </MapMarker>
          )
        })}
      </Map>
    </div>
  )
}
