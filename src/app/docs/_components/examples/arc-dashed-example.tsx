"use client"

import { useState } from "react"
import { Map, MapArcAnimated } from "@/registry/map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SYDNEY: [number, number] = [151.2093, -33.8688]
const DUBAI: [number, number] = [55.2708, 25.2048]

export const ArcDashedExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [dash, setDash] = useState("4")
  const [gap, setGap] = useState("4")

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[100, -5]} zoom={2} projection="mercator">
        <MapArcAnimated
          key={`${dash}-${gap}`}
          id="dashed-arc"
          origin={SYDNEY}
          destination={DUBAI}
          color="#f59e0b"
          width={3}
          dashArray={[Number(dash), Number(gap)]}
          height={0.35}
          duration={2500}
          loop
          loopDelay={1000}
        />
      </Map>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Select value={dash} onValueChange={setDash}>
          <SelectTrigger className="w-24 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Dash: 2</SelectItem>
            <SelectItem value="4">Dash: 4</SelectItem>
            <SelectItem value="8">Dash: 8</SelectItem>
            <SelectItem value="12">Dash: 12</SelectItem>
          </SelectContent>
        </Select>
        <Select value={gap} onValueChange={setGap}>
          <SelectTrigger className="w-24 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Gap: 2</SelectItem>
            <SelectItem value="4">Gap: 4</SelectItem>
            <SelectItem value="8">Gap: 8</SelectItem>
            <SelectItem value="12">Gap: 12</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
