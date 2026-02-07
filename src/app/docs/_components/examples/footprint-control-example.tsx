"use client"

import { Map, MapAnimatedFootprint, useFootprintControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const center: [number, number] = [139.6917, 35.6895]

const path: [number, number][] = [
  [139.6905, 35.6905],
  [139.6909, 35.69],
  [139.6913, 35.6895],
  [139.6917, 35.689],
  [139.6921, 35.6885],
  [139.6925, 35.688],
  [139.6929, 35.6875],
]

const FootprintControls = () => {
  const control = useFootprintControl("footprint-controlled")

  const handleStart = () => {
    control?.start()
  }

  const handleReset = () => {
    control?.reset()
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 flex gap-2">
      <Button onClick={handleStart} size="sm" className="rounded-full shadow-lg" disabled={control?.isActive}>
        Start
      </Button>
      <Button onClick={handleReset} size="sm" className="rounded-full shadow-lg" disabled={!control?.isActive}>
        Reset
      </Button>
    </div>
  )
}

export const FootprintControlExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={16}>
        <MapAnimatedFootprint id="footprint-controlled" path={path} color="#10b981" autoStart={false} />
      </Map>
      <FootprintControls />
    </div>
  )
}
