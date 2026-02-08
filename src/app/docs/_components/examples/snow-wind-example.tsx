"use client"

import { useState } from "react"
import { Map, MapSnow } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const SnowWindExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [windSpeed, setWindSpeed] = useState(0.5)

  const handleCalm = () => {
    setWindSpeed(0)
  }

  const handleLightWind = () => {
    setWindSpeed(0.5)
  }

  const handleStrongWind = () => {
    setWindSpeed(2)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12}>
        <MapSnow id="snow-wind" windSpeed={windSpeed} windDirection={0} />
      </Map>
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <Button
          size="sm"
          className="rounded-full shadow-lg"
          variant={windSpeed === 0 ? "default" : "secondary"}
          onClick={handleCalm}
        >
          Calm
        </Button>
        <Button
          size="sm"
          className="rounded-full shadow-lg"
          variant={windSpeed === 0.5 ? "default" : "secondary"}
          onClick={handleLightWind}
        >
          Light Wind
        </Button>
        <Button
          size="sm"
          className="rounded-full shadow-lg"
          variant={windSpeed === 2 ? "default" : "secondary"}
          onClick={handleStrongWind}
        >
          Strong Wind
        </Button>
      </div>
    </div>
  )
}
