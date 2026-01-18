"use client"

import { useState } from "react"
import { Map, MapMarkerAnimated } from "@/registry/map"
import { Button } from "@/components/ui/button"

const ROUTE: Array<[number, number]> = [
  [-73.9654, 40.7829],
  [-73.9718, 40.7644],
  [-73.9812, 40.7681],
  [-73.9583, 40.7736],
  [-73.9654, 40.7829],
]

export const AnimatedMarkerExample = () => {
  const [key, setKey] = useState(0)
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const handleRestart = () => {
    setKey((prev) => {
      return prev + 1
    })
  }

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-73.9712, 40.7731]} zoom={13}>
        <MapMarkerAnimated key={key} id="animated-marker" coordinates={ROUTE} duration={5000} showPath autoStart />
      </Map>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <Button onClick={handleRestart} size="sm" className="rounded-full shadow-lg">
          Restart Animation
        </Button>
      </div>
    </div>
  )
}
