"use client"

import { useEffect, useRef } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

const DEFAULT_SIZE = 200
const DEFAULT_COLOR = "rgba(0, 255, 70, 1)"
const DEFAULT_GRID_COLOR = "rgba(0, 255, 70, 0.3)"
const DEFAULT_BACKGROUND_COLOR = "rgba(0, 20, 0, 0.8)"
const DEFAULT_DURATION = 2000
const DEFAULT_RINGS = 4
const DEFAULT_CROSSHAIRS = true
const SWEEP_SEGMENTS = 40
const SWEEP_ARC = Math.PI / 2.5

type MapRadarProps = {
  id: string
  coordinates: MapCoordinates
  size?: number
  color?: string
  gridColor?: string
  backgroundColor?: string
  duration?: number
  rings?: number
  showCrosshairs?: boolean
}

type RadarImage = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  onAdd: () => void
  render: () => boolean
}

type RgbColor = { r: number; g: number; b: number }

const parseRgba = (color: string): RgbColor => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) {
    return { r: 0, g: 255, b: 70 }
  }

  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) }
}

const drawSweep = (
  ctx: CanvasRenderingContext2D,
  center: number,
  radius: number,
  sweepAngle: number,
  rgb: RgbColor
) => {
  const segmentArc = SWEEP_ARC / SWEEP_SEGMENTS

  for (let i = 0; i < SWEEP_SEGMENTS; i++) {
    const startAngle = sweepAngle - SWEEP_ARC + segmentArc * i
    const endAngle = startAngle + segmentArc
    const opacity = (i / SWEEP_SEGMENTS) * 0.4

    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.arc(center, center, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    ctx.fill()
  }
}

const drawGrid = (
  ctx: CanvasRenderingContext2D,
  center: number,
  radius: number,
  gridColor: string,
  rings: number,
  showCrosshairs: boolean
) => {
  for (let i = 1; i <= rings; i++) {
    const ringRadius = (radius / rings) * i
    ctx.beginPath()
    ctx.arc(center, center, ringRadius, 0, Math.PI * 2)
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1
    ctx.stroke()
  }

  if (!showCrosshairs) {
    return
  }

  ctx.beginPath()
  ctx.moveTo(center - radius, center)
  ctx.lineTo(center + radius, center)
  ctx.strokeStyle = gridColor
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(center, center - radius)
  ctx.lineTo(center, center + radius)
  ctx.strokeStyle = gridColor
  ctx.lineWidth = 1
  ctx.stroke()
}

const drawSweepLine = (
  ctx: CanvasRenderingContext2D,
  center: number,
  radius: number,
  sweepAngle: number,
  color: string,
  rgb: RgbColor
) => {
  const endX = center + radius * Math.cos(sweepAngle)
  const endY = center + radius * Math.sin(sweepAngle)

  const gradient = ctx.createLinearGradient(center, center, endX, endY)
  gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`)
  gradient.addColorStop(0.5, color)
  gradient.addColorStop(1, "rgba(255, 255, 255, 0.9)")

  ctx.beginPath()
  ctx.moveTo(center, center)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = gradient
  ctx.lineWidth = 2
  ctx.stroke()
}

const createRadarImage = (
  size: number,
  color: string,
  gridColor: string,
  backgroundColor: string,
  duration: number,
  rings: number,
  showCrosshairs: boolean
): RadarImage => {
  const rgb = parseRgba(color)

  const radar: RadarImage = {
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

      const ctx = this.context
      const center = size / 2
      const radius = center - 2
      const t = (performance.now() % duration) / duration
      const sweepAngle = t * Math.PI * 2 - Math.PI / 2

      ctx.clearRect(0, 0, size, size)

      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.fillStyle = backgroundColor
      ctx.fill()

      drawGrid(ctx, center, radius, gridColor, rings, showCrosshairs)

      ctx.save()
      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.clip()
      drawSweep(ctx, center, radius, sweepAngle, rgb)
      ctx.restore()

      drawSweepLine(ctx, center, radius, sweepAngle, color, rgb)

      ctx.beginPath()
      ctx.arc(center, center, 4, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      this.data = ctx.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return radar
}

export const MapRadar = ({
  id,
  coordinates,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  gridColor = DEFAULT_GRID_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  duration = DEFAULT_DURATION,
  rings = DEFAULT_RINGS,
  showCrosshairs = DEFAULT_CROSSHAIRS,
}: MapRadarProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const sourceId = `${id}-source`
  const layerId = `${id}-layer`

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const radarImage = createRadarImage(size, color, gridColor, backgroundColor, duration, rings, showCrosshairs)

    const addImage = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, radarImage, { pixelRatio: 2 })
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
  }, [map, isLoaded, id, size, color, gridColor, backgroundColor, duration, rings, showCrosshairs])

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
