"use client"

import { Map, MapAnimatedPulse } from "@/registry/map"
import { AlertCircle } from "lucide-react"
import { InfoPanel } from "./info-panel"

type Severity = "high" | "medium" | "low"

type Hotspot = {
  id: string
  coordinates: [number, number]
  country: string
  severity: Severity
}

const HOTSPOTS: Hotspot[] = [
  { id: "usa", coordinates: [-95.7129, 37.0902], country: "United States", severity: "high" },
  { id: "brazil", coordinates: [-51.9253, -14.235], country: "Brazil", severity: "high" },
  { id: "india", coordinates: [78.9629, 20.5937], country: "India", severity: "high" },
  { id: "uk", coordinates: [-3.436, 55.3781], country: "United Kingdom", severity: "medium" },
  { id: "france", coordinates: [2.2137, 46.2276], country: "France", severity: "medium" },
  { id: "germany", coordinates: [10.4515, 51.1657], country: "Germany", severity: "medium" },
  { id: "italy", coordinates: [12.5674, 41.8719], country: "Italy", severity: "medium" },
  { id: "spain", coordinates: [-3.7038, 40.4168], country: "Spain", severity: "low" },
]

const getPulseColor = (severity: Severity) => {
  if (severity === "high") {
    return { color: "rgba(239, 68, 68, 1)", pulseColor: "rgba(239, 68, 68, 0.6)" }
  }
  if (severity === "medium") {
    return { color: "rgba(249, 115, 22, 1)", pulseColor: "rgba(249, 115, 22, 0.6)" }
  }
  return { color: "rgba(234, 179, 8, 1)", pulseColor: "rgba(234, 179, 8, 0.6)" }
}

const getPulseSize = (severity: Severity) => {
  if (severity === "high") {
    return 100
  }
  if (severity === "medium") {
    return 80
  }
  return 60
}

export const PulseMarkersDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Active Hotspots">
        <div className="text-2xl font-semibold leading-tight">{HOTSPOTS.length}</div>
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="size-3 text-red-500" />
          <span className="text-xs text-muted-foreground">regions monitored</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[0, 20]} zoom={1.5}>
        {HOTSPOTS.map((hotspot) => {
          const { color, pulseColor } = getPulseColor(hotspot.severity)
          const size = getPulseSize(hotspot.severity)
          return (
            <MapAnimatedPulse
              key={hotspot.id}
              id={`covid-pulse-${hotspot.id}`}
              coordinates={hotspot.coordinates}
              size={size}
              color={color}
              pulseColor={pulseColor}
              duration={1500}
            />
          )
        })}
      </Map>
    </div>
  )
}
