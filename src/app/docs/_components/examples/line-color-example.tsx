"use client"

import { useState } from "react"
import { Map, MapLine } from "@/registry/map"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const colors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Purple", value: "#a855f7" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Pink", value: "#ec4899" },
  { name: "Yellow", value: "#eab308" },
  { name: "Cyan", value: "#06b6d4" },
]

export function LineColorExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const [lineColor, setLineColor] = useState("#3b82f6")

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
          <Label>Line Color</Label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setLineColor(color.value)}
                className={cn(
                  "size-8 rounded-full border-2 transition-all hover:scale-110",
                  lineColor === color.value
                    ? "ring-2 ring-offset-2 ring-offset-background"
                    : "opacity-70 hover:opacity-100"
                )}
                style={{
                  backgroundColor: color.value,
                  borderColor: color.value,
                  boxShadow:
                    lineColor === color.value ? `0 0 0 2px var(--background), 0 0 0 4px ${color.value}` : undefined,
                }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
          <div className="flex gap-4 text-sm">
            <div>
              <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Color</div>
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-full border border-border" style={{ backgroundColor: lineColor }} />
                <span className="font-mono font-semibold">{lineColor}</span>
              </div>
            </div>
          </div>
        </div>
        <Map accessToken={accessToken} center={[-122.465, 37.815]} zoom={13}>
          <MapLine coordinates={line} color={lineColor} width={4} />
        </Map>
      </div>
    </div>
  )
}
