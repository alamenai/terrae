"use client"

import { useState } from "react"
import { Map, MapSandstorm } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const SandstormWindExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [windDirection, setWindDirection] = useState(0)

  const handleEast = () => {
    setWindDirection(0)
  }

  const handleSoutheast = () => {
    setWindDirection(45)
  }

  const handleWest = () => {
    setWindDirection(180)
  }

  const handleNorth = () => {
    setWindDirection(270)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[31.2357, 30.0444]} zoom={10}>
        <MapSandstorm id="sandstorm-wind" windDirection={windDirection} windSpeed={6} />
      </Map>
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleEast}>
          East
        </Button>
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleSoutheast}>
          SE
        </Button>
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleWest}>
          West
        </Button>
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleNorth}>
          North
        </Button>
      </div>
    </div>
  )
}
