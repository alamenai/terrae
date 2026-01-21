"use client"

import { useEffect, useRef, useCallback } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

const DEFAULT_BLUR_AMOUNT = 8
const DEFAULT_ROUNDED = 0
const MIN_AREA_SIZE = 20

type MapBlurAreaProps = {
  coordinates: MapCoordinates[]
  blur?: number
  backgroundColor?: string
  rounded?: number | "full"
  blockInteraction?: boolean
}

const getBounds = (points: { x: number; y: number }[]) => {
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)

  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  }
}

export const MapBlurArea = ({
  coordinates,
  blur = DEFAULT_BLUR_AMOUNT,
  backgroundColor,
  rounded = DEFAULT_ROUNDED,
  blockInteraction = false,
}: MapBlurAreaProps) => {
  const { map, isLoaded } = useMap()
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const updatePosition = useCallback(() => {
    if (!overlayRef.current || !map) {
      return
    }

    const canvas = map.getCanvas()
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight

    const projectedPoints = coordinates.map((coord) => map.project(coord))
    const bounds = getBounds(projectedPoints)

    const width = bounds.maxX - bounds.minX
    const height = bounds.maxY - bounds.minY
    const isVisible =
      bounds.maxX >= 0 &&
      bounds.minX <= canvasWidth &&
      bounds.maxY >= 0 &&
      bounds.minY <= canvasHeight &&
      width >= MIN_AREA_SIZE &&
      height >= MIN_AREA_SIZE

    if (!isVisible) {
      overlayRef.current.style.opacity = "0"
    } else {
      overlayRef.current.style.opacity = "1"
      overlayRef.current.style.left = `${bounds.minX}px`
      overlayRef.current.style.top = `${bounds.minY}px`
      overlayRef.current.style.width = `${width}px`
      overlayRef.current.style.height = `${height}px`
    }
  }, [map, coordinates])

  useEffect(() => {
    if (!map || !isLoaded || coordinates.length < 3) {
      return
    }

    updatePosition()

    map.on("move", updatePosition)
    map.on("zoom", updatePosition)
    map.on("rotate", updatePosition)
    map.on("pitch", updatePosition)
    map.on("resize", updatePosition)

    return () => {
      map.off("move", updatePosition)
      map.off("zoom", updatePosition)
      map.off("rotate", updatePosition)
      map.off("pitch", updatePosition)
      map.off("resize", updatePosition)
    }
  }, [map, isLoaded, coordinates, updatePosition])

  const borderRadius = rounded === "full" ? "9999px" : `${rounded}px`

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor,
        borderRadius,
        pointerEvents: blockInteraction ? "auto" : "none",
        cursor: blockInteraction ? "not-allowed" : "default",
        transition: "opacity 0.2s ease-out",
        zIndex: 10,
      }}
    />
  )
}
