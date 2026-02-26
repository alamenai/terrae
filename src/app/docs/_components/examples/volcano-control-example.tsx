"use client"

import { Map, MapVolcano, useVolcanoControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const VolcanoControls = () => {
  const control = useVolcanoControl("volcano-controlled")

  const handleDormant = () => {
    control?.setPhase("dormant")
  }

  const handleRumbling = () => {
    control?.setPhase("rumbling")
  }

  const handleErupting = () => {
    control?.setPhase("erupting")
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button size="sm" className="rounded-full shadow-lg cursor-pointer" onClick={handleDormant}>
        Dormant
      </Button>
      <Button size="sm" className="rounded-full shadow-lg cursor-pointer" onClick={handleRumbling}>
        Rumbling
      </Button>
      <Button size="sm" className="rounded-full shadow-lg cursor-pointer" onClick={handleErupting}>
        Erupting
      </Button>
    </div>
  )
}

export const VolcanoControlExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[14.426, 40.821]} zoom={12}>
        <MapVolcano id="volcano-controlled" coordinates={[14.426, 40.821]} phase="dormant" autoStart />
      </Map>
      <VolcanoControls />
    </div>
  )
}
