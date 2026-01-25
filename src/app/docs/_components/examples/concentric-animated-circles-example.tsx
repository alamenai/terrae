"use client"

import { useState } from "react"
import { Map, MapAnimatedCircle } from "@/registry/map"

export const ConcentricAnimatedCirclesExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const center: [number, number] = [-73.9857, 40.7484]

  const [activeCircle, setActiveCircle] = useState(1)

  const handleInnerComplete = () => {
    setActiveCircle(2)
  }

  const handleMiddleComplete = () => {
    setActiveCircle(3)
  }

  const handleOuterComplete = () => {
    setTimeout(() => {
      setActiveCircle(1)
    }, 1000)
  }

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={11} projection="mercator">
        <MapAnimatedCircle
          id="inner-circle"
          center={center}
          radius={1000}
          strokeColor="#22c55e"
          fillColor="#22c55e"
          fillOpacity={0.4}
          duration={1000}
          fillDuration={500}
          autoStart={activeCircle === 1}
          onComplete={handleInnerComplete}
        />
        <MapAnimatedCircle
          id="middle-circle"
          center={center}
          radius={2500}
          strokeColor="#f97316"
          fillColor="#f97316"
          fillOpacity={0.3}
          duration={1200}
          fillDuration={600}
          autoStart={activeCircle === 2}
          onComplete={handleMiddleComplete}
        />
        <MapAnimatedCircle
          id="outer-circle"
          center={center}
          radius={4000}
          strokeColor="#ef4444"
          fillColor="#ef4444"
          fillOpacity={0.2}
          duration={1500}
          fillDuration={700}
          autoStart={activeCircle === 3}
          onComplete={handleOuterComplete}
        />
      </Map>
    </div>
  )
}
