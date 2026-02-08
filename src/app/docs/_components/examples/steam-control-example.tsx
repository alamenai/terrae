"use client"

import { Map, MapSteam, useSteamControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const SteamControlExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapSteam id="steam-controlled" coordinates={[-122.4194, 37.7749]} />
        <SteamControls />
      </Map>
    </div>
  )
}

const SteamControls = () => {
  const control = useSteamControl("steam-controlled")

  const handleStart = () => {
    control?.start()
  }

  const handleStop = () => {
    control?.stop()
  }

  const handleLowIntensity = () => {
    control?.setIntensity(0.5)
  }

  const handleHighIntensity = () => {
    control?.setIntensity(2)
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleStart} disabled={control?.isActive}>
        Start
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleStop} disabled={!control?.isActive}>
        Stop
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleLowIntensity}>
        Low
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleHighIntensity}>
        High
      </Button>
    </div>
  )
}
