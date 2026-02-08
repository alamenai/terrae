"use client"

import { Map, MapTsunami, useTsunamiControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

export const TsunamiControlExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[141.2, 38.3]} zoom={8}>
        <MapTsunami
          id="tsunami-controlled"
          origin={[141.5, 38.3]}
          target={[140.9, 38.3]}
          autoStart={false}
          speed={2500}
          waveHeight={0.45}
          size={350}
        />
        <TsunamiControls />
      </Map>
    </div>
  )
}

const TsunamiControls = () => {
  const control = useTsunamiControl("tsunami-controlled")

  const handleTrigger = () => {
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
        onClick={handleTrigger}
        disabled={control?.isActive && control?.phase !== "idle"}
      >
        Trigger
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}
