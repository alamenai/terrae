"use client"

import { useState } from "react"
import { Map, MapLine } from "@/registry/map"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function LineWidthExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const [lineWidth, setLineWidth] = useState([4])

  const line: Array<[number, number]> = [
    [-122.48, 37.83],
    [-122.47, 37.82],
    [-122.46, 37.81],
    [-122.45, 37.8],
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-muted/50">
        <div className="space-y-2">
          <Label htmlFor="line-width">
            Line Width: <span className="font-mono text-muted-foreground">{lineWidth[0]}px</span>
          </Label>
          <Slider id="line-width" min={1} max={15} step={1} value={lineWidth} onValueChange={setLineWidth} />
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
          <div className="flex gap-4 text-sm">
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Width</div>
              <div className="font-mono font-semibold">{lineWidth[0]}px</div>
            </div>
          </div>
        </div>
        <Map accessToken={accessToken} center={[-122.465, 37.815]} zoom={13}>
          <MapLine coordinates={line} color="#3b82f6" width={lineWidth[0]} />
        </Map>
      </div>
    </div>
  )
}
