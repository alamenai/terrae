"use client"

import { Map, MapLineRadial } from "@/registry/map"
import { Share2 } from "lucide-react"
import { InfoPanel } from "./info-panel"

const ORIGIN: [number, number] = [114.3055, 30.5928]

const DESTINATIONS: [number, number][] = [
  [-95.7129, 37.0902],
  [-51.9253, -14.235],
  [78.9629, 20.5937],
  [-3.436, 55.3781],
  [2.2137, 46.2276],
  [10.4515, 51.1657],
  [139.6917, 35.6895],
  [127.7669, 35.9078],
]

export const AnimatedLinesDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Global Spread">
        <div className="font-medium mt-1">Wuhan → World</div>
        <div className="flex items-center gap-1 mt-1">
          <Share2 className="size-3 text-rose-500" />
          <span className="text-xs text-muted-foreground">{DESTINATIONS.length} regions</span>
        </div>
      </InfoPanel>

      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        center={[40, 20]}
        zoom={1.2}
        projection="globe"
      >
        <MapLineRadial
          id="covid-spread"
          origin={ORIGIN}
          destinations={DESTINATIONS}
          color="#f43f5e"
          width={2}
          curvature="auto"
          duration={2000}
          staggerDelay={300}
          loop
          loopDelay={2000}
          showOriginMarker
          originMarkerColor="#f43f5e"
          originMarkerPulse
          showDestinationMarkers
          destinationMarkerColor="#f43f5e"
        />
      </Map>
    </div>
  )
}
