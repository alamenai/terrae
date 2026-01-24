"use client"

import { Map } from "@/registry/map"

export const RotatingGlobeExample = () => {
  return (
    <div className="h-full w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        projection="globe"
        autoRotate
        rotateSpeed={5}
        zoom={1.5}
        center={[0, 20]}
      />
    </div>
  )
}
