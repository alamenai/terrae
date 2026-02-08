"use client"

import { useState } from "react"
import { Map, MapSandstorm } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const SandstormIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [intensity, setIntensity] = useState(1)

  const handleLight = () => {
    setIntensity(0.5)
  }

  const handleMedium = () => {
    setIntensity(1)
  }

  const handleHeavy = () => {
    setIntensity(2)
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[31.2357, 30.0444]} zoom={10}>
        <MapSandstorm id="sandstorm-intensity" intensity={intensity} />
      </Map>
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleLight}>
          Light
        </Button>
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleMedium}>
          Medium
        </Button>
        <Button size="sm" className="rounded-full shadow-lg" onClick={handleHeavy}>
          Heavy
        </Button>
      </div>
    </div>
  )
}
