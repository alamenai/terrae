"use client"

import { useState } from "react"
import { Map, MapArcAnimated } from "@/registry/map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type HeadType = "arrow" | "circle" | "square"

const SAN_FRANCISCO: [number, number] = [-122.4194, 37.7749]
const NEW_YORK: [number, number] = [-74.006, 40.7128]

export const ArcHeadTypesExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [headType, setHeadType] = useState<HeadType>("arrow")

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[-98, 39]} zoom={3.5}>
        <MapArcAnimated
          key={`arc-blue-${headType}`}
          id="arc-blue"
          origin={SAN_FRANCISCO}
          destination={NEW_YORK}
          color="#3b82f6"
          width={6}
          height={0.15}
          duration={3000}
          loop
          headType={headType}
          headSize={32}
        />
        <MapArcAnimated
          key={`arc-red-${headType}`}
          id="arc-red"
          origin={NEW_YORK}
          destination={SAN_FRANCISCO}
          color="#ef4444"
          width={6}
          height={0.15}
          duration={3000}
          loop
          headType={headType}
          headSize={32}
        />
      </Map>
      <div className="absolute bottom-4 right-4">
        <Select value={headType} onValueChange={(value) => setHeadType(value as HeadType)}>
          <SelectTrigger className="w-32 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arrow">Arrow</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="square">Square</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
