"use client"

import { useState } from "react"
import { Map } from "@/registry/map"
import {
  defaultMapStyles,
  standardMapStyles,
  streetsMapStyles,
  outdoorsMapStyles,
  satelliteMapStyles,
  navigationMapStyles,
  type MapThemeStyles,
} from "@/registry/map/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type StyleOption = {
  value: string
  label: string
  styles: MapThemeStyles
}

const STYLE_OPTIONS: StyleOption[] = [
  { value: "default", label: "Default (Light/Dark)", styles: defaultMapStyles },
  { value: "standard", label: "Standard", styles: standardMapStyles },
  { value: "streets", label: "Streets", styles: streetsMapStyles },
  { value: "outdoors", label: "Outdoors", styles: outdoorsMapStyles },
  { value: "satellite", label: "Satellite", styles: satelliteMapStyles },
  { value: "navigation", label: "Navigation", styles: navigationMapStyles },
]

const DEFAULT_STYLE = "standard"

export const StyleSwitcherExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_STYLE)

  const currentStyles = STYLE_OPTIONS.find((opt) => {
    return opt.value === selectedStyle
  })?.styles

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Style:</span>
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STYLE_OPTIONS.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full">
        <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12} styles={currentStyles} />
      </div>
    </div>
  )
}
