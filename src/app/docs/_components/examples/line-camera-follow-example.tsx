"use client"

import { Map, MapLine, MapCameraFollow, useCameraFollowControl, standardMapStyles } from "@/registry/map"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

const scenicRoute = [
  [-122.4194, 37.7749],
  [-122.4089, 37.7855],
  [-122.3964, 37.7922],
  [-122.3831, 37.8012],
  [-122.3702, 37.8156],
  [-122.3544, 37.8324],
  [-122.3401, 37.8489],
  [-122.3267, 37.8612],
  [-122.3089, 37.8734],
  [-122.2923, 37.8856],
  [-122.2756, 37.8923],
  [-122.2589, 37.9012],
  [-122.2422, 37.9089],
  [-122.2256, 37.9156],
  [-122.2089, 37.9234],
  [-122.1922, 37.9312],
  [-122.1756, 37.9389],
  [-122.1589, 37.9467],
  [-122.1422, 37.9545],
  [-122.1256, 37.9623],
] as [number, number][]

export const LineCameraFollowExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const { isPlaying, toggle, stop } = useCameraFollowControl()

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} styles={standardMapStyles} center={[-122.32, 37.87]} zoom={10}>
        <MapLine coordinates={scenicRoute} color="#3b82f6" width={4} opacity={0.9} />
        <MapCameraFollow
          path={scenicRoute}
          duration={20000}
          pitch={60}
          zoom={14}
          autoStart={isPlaying}
          onComplete={stop}
        />
      </Map>
      <div className="absolute bottom-4 right-4">
        <Button size="sm" variant="secondary" onClick={toggle} className="gap-2 bg-background rounded-full">
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          {isPlaying ? "Pause" : "Fly Along Route"}
        </Button>
      </div>
    </div>
  )
}

export const CameraFollowWithMarkerExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const { isPlaying, toggle, stop } = useCameraFollowControl()

  return (
    <div className="relative h-full w-full">
      <Map accessToken={accessToken} styles={standardMapStyles} center={[-122.32, 37.87]} zoom={10}>
        <MapLine coordinates={scenicRoute} color="#3b82f6" width={4} opacity={0.9} />
        <MapCameraFollow
          path={scenicRoute}
          duration={20000}
          pitch={60}
          zoom={14}
          autoStart={isPlaying}
          onComplete={stop}
          marker
        />
      </Map>
      <div className="absolute bottom-4 right-4">
        <Button size="sm" variant="secondary" onClick={toggle} className="gap-2 bg-background rounded-full">
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          {isPlaying ? "Pause" : "Fly Along Route"}
        </Button>
      </div>
    </div>
  )
}
