"use client"

import { useState } from "react"
import { Map } from "@/registry/map"
import type { MapProjection } from "@/registry/map/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ProjectionOption = {
  value: MapProjection
  label: string
}

const PROJECTIONS: ProjectionOption[] = [
  { value: "mercator", label: "Mercator" },
  { value: "globe", label: "Globe" },
  { value: "naturalEarth", label: "Natural Earth" },
  { value: "equalEarth", label: "Equal Earth" },
  { value: "equirectangular", label: "Equirectangular" },
  { value: "winkelTripel", label: "Winkel Tripel" },
  { value: "albers", label: "Albers" },
  { value: "lambertConformalConic", label: "Lambert Conformal Conic" },
]

const DEFAULT_PROJECTION: MapProjection = "mercator"

export const ProjectionSwitcherExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [projection, setProjection] = useState<MapProjection>(DEFAULT_PROJECTION)

  const handleProjectionChange = (value: string) => {
    setProjection(value as MapProjection)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Projection:</span>
        <Select value={projection} onValueChange={handleProjectionChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PROJECTIONS.map((proj) => {
              return (
                <SelectItem key={proj.value} value={proj.value}>
                  {proj.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full">
        <Map accessToken={accessToken} center={[0, 20]} zoom={1} projection={projection} />
      </div>
    </div>
  )
}
