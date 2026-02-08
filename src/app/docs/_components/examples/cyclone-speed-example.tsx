"use client"

import { Map, MapCyclone, useCycloneControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const SLOW_SPEED = 0.3
const NORMAL_SPEED = 1
const FAST_SPEED = 3

const CycloneSpeedControls = () => {
  const control = useCycloneControl("cyclone-speed")

  const handleSlow = () => {
    control?.setRotationSpeed(SLOW_SPEED)
  }

  const handleNormal = () => {
    control?.setRotationSpeed(NORMAL_SPEED)
  }

  const handleFast = () => {
    control?.setRotationSpeed(FAST_SPEED)
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleSlow}>
        Slow
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleNormal}>
        Normal
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleFast}>
        Fast
      </Button>
    </div>
  )
}

export const CycloneSpeedExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-97.5, 35.5]} zoom={10}>
        <MapCyclone id="cyclone-speed" coordinates={[-97.5, 35.5]} size={250} />
      </Map>
      <CycloneSpeedControls />
    </div>
  )
}
