"use client"

import { Map, MapLightning, useLightningControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const LightningControls = () => {
  const control = useLightningControl("lightning-manual")

  const handleStrike = () => {
    control?.strike()
  }

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleStrike}>
        Strike Now
      </Button>
    </div>
  )
}

export const LightningStrikeExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-95.7129, 37.0902]} zoom={4}>
        <MapLightning id="lightning-manual" coordinates={[-95.7129, 37.0902]} autoStrike={false} />
        <LightningControls />
      </Map>
    </div>
  )
}
