"use client"

import { Map, MapVideoLayer, useVideoControl } from "@/registry/map"
import { Button } from "@/components/ui/button"

function VideoControls() {
  const { toggle, isPlaying } = useVideoControl("drone-video")

  return (
    <div className="flex gap-2">
      <Button onClick={toggle} size="sm">
        {isPlaying ? "Pause" : "Play"} Video
      </Button>
    </div>
  )
}

export function VideoLayerExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const coordinates: [[number, number], [number, number], [number, number], [number, number]] = [
    [-122.51596391201019, 37.56238816766053],
    [-122.51467645168304, 37.56410183312965],
    [-122.51309394836426, 37.563391708549425],
    [-122.51423120498657, 37.56161849366671],
  ]

  return (
    <div className="h-full w-full">
      <Map
        accessToken={accessToken}
        center={[-122.514, 37.5622]}
        zoom={17}
        style="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <MapVideoLayer
          id="drone-video"
          urls={[
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4",
            "https://static-assets.mapbox.com/mapbox-gl-js/drone.webm",
          ]}
          coordinates={coordinates}
        />
        <VideoControls />
      </Map>
    </div>
  )
}
