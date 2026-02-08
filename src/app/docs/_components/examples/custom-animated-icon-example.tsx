"use client"

import { Map, MapAnimatedPulse } from "@/registry/map"

export function CustomAnimatedIconExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const pulses = [
    {
      id: "red-pulse",
      coordinates: [-74.006, 40.7128] as [number, number],
      color: "rgba(255, 50, 50, 1)",
      pulseColor: "rgba(255, 50, 50, 0.8)",
      duration: 1200,
    },
    {
      id: "green-pulse",
      coordinates: [-118.2437, 34.0522] as [number, number],
      color: "rgba(50, 255, 50, 1)",
      pulseColor: "rgba(50, 255, 50, 0.8)",
      duration: 1000,
    },
    {
      id: "blue-pulse",
      coordinates: [-87.6298, 41.8781] as [number, number],
      color: "rgba(50, 50, 255, 1)",
      pulseColor: "rgba(50, 50, 255, 0.8)",
      duration: 800,
    },
  ]

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-95, 37]} zoom={3.5}>
        {pulses.map((pulse) => (
          <MapAnimatedPulse
            key={pulse.id}
            id={pulse.id}
            size={80}
            coordinates={pulse.coordinates}
            color={pulse.color}
            pulseColor={pulse.pulseColor}
            duration={pulse.duration}
          />
        ))}
      </Map>
    </div>
  )
}
