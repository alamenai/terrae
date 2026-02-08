"use client"

import { Map, MapCyclone } from "@/registry/map"

const CYCLONE_PATH: [number, number][] = [
  [-97.5, 35.2],
  [-97.3, 35.25],
  [-97.1, 35.22],
  [-96.9, 35.3],
  [-96.7, 35.28],
]

export const CycloneMovingExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-97.1, 35.25]} zoom={8}>
        <MapCyclone
          id="moving-cyclone"
          coordinates={CYCLONE_PATH[0]}
          path={CYCLONE_PATH}
          duration={15000}
          loop
          size={180}
          intensity={1.2}
        />
      </Map>
    </div>
  )
}
