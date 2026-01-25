"use client"

import { useState } from "react"
import { Map, MapArcAnimated } from "@/registry/map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const WAREHOUSE: [number, number] = [-0.1276, 51.5074]
const CUSTOMER: [number, number] = [2.3522, 48.8566]

const COLORS = {
  green: "#10b981",
  blue: "#3b82f6",
  red: "#ef4444",
  purple: "#8b5cf6",
}

export const ArcDeliveryExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [color, setColor] = useState<keyof typeof COLORS>("green")
  const [width, setWidth] = useState("4")

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} center={[1.1, 50.2]} zoom={5} projection="mercator">
        <MapArcAnimated
          key={`${color}-${width}`}
          id="delivery-route"
          origin={WAREHOUSE}
          destination={CUSTOMER}
          color={COLORS[color]}
          width={Number(width)}
          height={0.4}
          duration={2000}
          loop
          loopDelay={800}
        />
      </Map>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Select value={color} onValueChange={(value) => setColor(value as keyof typeof COLORS)}>
          <SelectTrigger className="w-24 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
          </SelectContent>
        </Select>
        <Select value={width} onValueChange={setWidth}>
          <SelectTrigger className="w-20 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2px</SelectItem>
            <SelectItem value="4">4px</SelectItem>
            <SelectItem value="6">6px</SelectItem>
            <SelectItem value="8">8px</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
