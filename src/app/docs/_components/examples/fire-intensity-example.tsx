"use client"

import { Map, MapFire, useFireControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const LOW_INTENSITY = 0.4
const MEDIUM_INTENSITY = 1
const HIGH_INTENSITY = 2

export const FireIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-118.1642, 34.1975]} zoom={12}>
        <MapFire id="fire-intensity" coordinates={[-118.1642, 34.1975]} size={200} particleCount={400} />
      </Map>
      <FireIntensityControls />
    </div>
  )
}

const FireIntensityControls = () => {
  const control = useFireControl("fire-intensity")

  const handleLow = () => {
    control?.setIntensity(LOW_INTENSITY)
  }

  const handleMedium = () => {
    control?.setIntensity(MEDIUM_INTENSITY)
  }

  const handleHigh = () => {
    control?.setIntensity(HIGH_INTENSITY)
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleLow}>
        Low
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleMedium}>
        Medium
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleHigh}>
        High
      </Button>
    </div>
  )
}
