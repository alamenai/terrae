"use client"

import { useEffect, useRef } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

const DEFAULT_SIZE = 100
const DEFAULT_COLOR = "rgba(0, 100, 255, 1)"
const DEFAULT_PULSE_COLOR = "rgba(0, 100, 255, 0.8)"
const DEFAULT_DURATION = 1000

type MapAnimatedPulseProps = {
  id: string
  coordinates: MapCoordinates
  size?: number
  color?: string
  pulseColor?: string
  duration?: number
}

type PulsingDot = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  onAdd: () => void
  render: () => boolean
}

const createPulsingDot = (size: number, color: string, pulseColor: string, duration: number): PulsingDot => {
  const dot: PulsingDot = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext("2d", { willReadFrequently: true }) || undefined
    },

    render() {
      if (!this.context) {
        return false
      }

      const t = (performance.now() % duration) / duration
      const radius = (size / 2) * 0.3
      const outerRadius = (size / 2) * 0.7 * t + radius

      this.context.clearRect(0, 0, this.width, this.height)

      this.context.beginPath()
      this.context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
      this.context.fillStyle = pulseColor
      this.context.globalAlpha = 1 - t
      this.context.fill()

      this.context.beginPath()
      this.context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
      this.context.fillStyle = color
      this.context.globalAlpha = 1
      this.context.fill()

      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return dot
}

export const MapAnimatedPulse = ({
  id,
  coordinates,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  pulseColor = DEFAULT_PULSE_COLOR,
  duration = DEFAULT_DURATION,
}: MapAnimatedPulseProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const sourceId = `${id}-source`
  const layerId = `${id}-layer`

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const pulsingDot = createPulsingDot(size, color, pulseColor, duration)

    const addImage = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, pulsingDot, { pixelRatio: 2 })
      }
    }

    addImage()

    const animate = () => {
      map.triggerRepaint()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      addImage()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      try {
        if (map.hasImage(id)) {
          map.removeImage(id)
        }
      } catch {
        // Map may already be destroyed during unmount
      }
    }
  }, [map, isLoaded, id, size, color, pulseColor, duration])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const addLayers = () => {
      if (!map.isStyleLoaded() || !map.hasImage(id)) {
        requestAnimationFrame(addLayers)
        return
      }

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates },
                properties: {},
              },
            ],
          },
        })
      }

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "icon-image": id,
            "icon-allow-overlap": true,
          },
        })
      }
    }

    addLayers()

    const handleStyleLoad = () => {
      addLayers()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      try {
        if (map.isStyleLoaded()) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
          if (map.getSource(sourceId)) {
            map.removeSource(sourceId)
          }
        }
      } catch {
        // Map may already be destroyed during unmount
      }
    }
  }, [map, isLoaded, coordinates, id, sourceId, layerId])

  return null
}
