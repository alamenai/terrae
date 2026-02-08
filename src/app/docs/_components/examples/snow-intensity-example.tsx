"use client"

import { useState } from "react"
import { Map, MapSnow } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const SnowIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [intensity, setIntensity] = useState(1)

  const handleLight = () => {
    setIntensity(0.5)
  }

  const handleMedium = () => {
    setIntensity(1)
  }

  const handleBlizzard = () => {
    setIntensity(2)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12}>
        <MapSnow id="snow-intensity" intensity={intensity} />
      </Map>
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <Button
          size="sm"
          className="rounded-full shadow-lg"
          variant={intensity === 0.5 ? "default" : "secondary"}
          onClick={handleLight}
        >
          Light
        </Button>
        <Button
          size="sm"
          className="rounded-full shadow-lg"
          variant={intensity === 1 ? "default" : "secondary"}
          onClick={handleMedium}
        >
          Medium
        </Button>
        <Button
          size="sm"
          className="rounded-full shadow-lg"
          variant={intensity === 2 ? "default" : "secondary"}
          onClick={handleBlizzard}
        >
          Blizzard
        </Button>
      </div>
    </div>
  )
}
