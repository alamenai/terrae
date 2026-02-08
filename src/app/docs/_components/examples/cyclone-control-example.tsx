"use client"

import { Map, MapCyclone, useCycloneControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const CycloneControls = () => {
  const control = useCycloneControl("cyclone-control")

  const handleStart = () => {
    control?.start()
  }

  const handleStop = () => {
    control?.stop()
  }

  const handleWeakIntensity = () => {
    control?.setIntensity(0.5)
  }

  const handleStrongIntensity = () => {
    control?.setIntensity(1.5)
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleStart}>
        Start
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleStop}>
        Stop
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleWeakIntensity}>
        Weak
      </Button>
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleStrongIntensity}>
        Strong
      </Button>
    </div>
  )
}

export const CycloneControlExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-97.5, 35.5]} zoom={10}>
        <MapCyclone id="cyclone-control" coordinates={[-97.5, 35.5]} size={250} />
      </Map>
      <CycloneControls />
    </div>
  )
}
