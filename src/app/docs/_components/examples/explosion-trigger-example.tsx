"use client"

import { Map, MapExplosion, useExplosionControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

const ExplosionControls = () => {
  const control = useExplosionControl("explosion-trigger")

  const handleTrigger = () => {
    control?.trigger()
  }

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Button size="sm" className="rounded-full shadow-lg" onClick={handleTrigger}>
        Trigger Explosion
      </Button>
    </div>
  )
}

export const ExplosionTriggerExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapExplosion id="explosion-trigger" coordinates={[-122.4194, 37.7749]} autoStart={false} size={200} />
      </Map>
      <ExplosionControls />
    </div>
  )
}
