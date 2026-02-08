"use client"

import { Map, MapMeteor, useMeteorControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const MeteorControlExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-112.4, 36.1]} zoom={10}>
        <MapMeteor id="meteor-controlled" target={[-112.4, 36.1]} autoStart={false} speed={2000} />
        <MeteorControls />
      </Map>
    </div>
  )
}

const MeteorControls = () => {
  const control = useMeteorControl("meteor-controlled")

  const handleStart = () => {
    control?.start()
  }

  const handleReset = () => {
    control?.reset()
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button
        size="sm"
        className="rounded-full shadow-lg"
        onClick={handleStart}
        disabled={control?.isActive && control?.phase !== "idle"}
      >
        Strike
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}
