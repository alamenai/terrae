"use client"

import { useEffect, useRef } from "react"
import { useMap } from "./hooks"
import type { MapImageCorners } from "./types"

type MapImageProps = {
  id: string
  url: string
  coordinates: MapImageCorners
  opacity?: number
}

export const MapImage = ({ id, url, coordinates, opacity = 1 }: MapImageProps) => {
  const { map, isLoaded } = useMap()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!map || !isLoaded || initializedRef.current) return

    const sourceId = `${id}-source`
    const layerId = `${id}-layer`

    map.addSource(sourceId, {
      type: "image",
      url,
      coordinates,
    })

    map.addLayer({
      id: layerId,
      type: "raster",
      source: sourceId,
      paint: {
        "raster-opacity": opacity,
      },
    })

    initializedRef.current = true

    return () => {
      if (map) {
        try {
          if (map.getLayer && map.getLayer(layerId)) map.removeLayer(layerId)
          if (map.getSource && map.getSource(sourceId)) map.removeSource(sourceId)
        } catch {
          // Silently handle cleanup errors
        }
      }
      initializedRef.current = false
    }
  }, [map, isLoaded, id, url, coordinates, opacity])

  return null
}
