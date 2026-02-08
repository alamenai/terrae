"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { useMap } from "./hooks"
import type { MapImageCorners } from "./types"

type MapRasterVideoProps = {
  id: string
  urls: string[]
  coordinates: MapImageCorners
  opacity?: number
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export const MapRasterVideo = ({
  id,
  urls,
  coordinates,
  opacity = 1,
  autoplay = false,
  loop = true,
  muted = true,
}: MapRasterVideoProps) => {
  const { map, isLoaded } = useMap()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!isLoaded || !map || initializedRef.current) return

    try {
      // Add video source
      map.addSource(id, {
        type: "video",
        urls,
        coordinates,
      } as mapboxgl.VideoSourceSpecification)

      // Add raster layer
      map.addLayer({
        id,
        type: "raster",
        source: id,
        paint: {
          "raster-opacity": opacity,
        },
      })

      // Set video properties and control playback
      const source = map.getSource(id) as mapboxgl.VideoSource
      if (source && source.getVideo) {
        const video = source.getVideo()
        if (video) {
          video.loop = loop
          video.muted = muted

          if (autoplay) {
            source.play()
          }
        }
      }

      initializedRef.current = true
    } catch (error) {
      console.error("Error adding raster video:", error)
    }

    return () => {
      if (map && map.getStyle()) {
        try {
          if (map.getLayer(id)) {
            map.removeLayer(id)
          }
          if (map.getSource(id)) {
            map.removeSource(id)
          }
        } catch (error) {
          console.error("Error cleaning up raster video:", error)
        }
      }
      initializedRef.current = false
    }
  }, [map, isLoaded, id, urls, coordinates, opacity, autoplay, loop, muted])

  return null
}

export const useRasterVideoControl = (layerId: string) => {
  const { map } = useMap()
  const [isPlaying, setIsPlaying] = useState(false)

  const play = () => {
    if (!map) return
    const source = map.getSource(layerId) as mapboxgl.VideoSource
    source?.play?.()
    setIsPlaying(true)
  }

  const pause = () => {
    if (!map) return
    const source = map.getSource(layerId) as mapboxgl.VideoSource
    source?.pause?.()
    setIsPlaying(false)
  }

  const toggle = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return { play, pause, toggle, isPlaying }
}
