"use client"

import { useEffect, useRef } from "react"
import { useMap } from "./hooks"

type MapboxExpression = unknown[]

type MapRainProps = {
  density?: number | MapboxExpression
  intensity?: number
  color?: string
  opacity?: number
  vignette?: number | MapboxExpression
  vignetteColor?: string
  direction?: [number, number]
  dropletSize?: [number, number]
  distortionStrength?: number
  centerThinning?: number
}

export const createZoomInterpolation = (
  value: number,
  minZoom: number = 11,
  maxZoom: number = 13
): MapboxExpression => {
  return ["interpolate", ["linear"], ["zoom"], minZoom, 0.0, maxZoom, value]
}

const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const applyRainEffect = (map: mapboxgl.Map, config: Record<string, unknown>): void => {
  ;(map as unknown as { setRain: (config: Record<string, unknown> | null) => void }).setRain(config)
}

const removeRainEffect = (map: mapboxgl.Map): void => {
  ;(map as unknown as { setRain: (config: Record<string, unknown> | null) => void }).setRain(null)
}

const hasRainSupport = (map: mapboxgl.Map): boolean => {
  return typeof (map as unknown as Record<string, unknown>).setRain === "function"
}

const DEFAULT_DIRECTION: [number, number] = [0, 80]
const DEFAULT_DROPLET_SIZE: [number, number] = [2.6, 18.2]

export const MapRain = ({
  density = 0.5,
  intensity = 1,
  color = "#a8adbc",
  opacity = 0.7,
  vignette = 1,
  vignetteColor = "#464646",
  direction = DEFAULT_DIRECTION,
  dropletSize = DEFAULT_DROPLET_SIZE,
  distortionStrength = 0.7,
  centerThinning = 0,
}: MapRainProps) => {
  const { map, isLoaded } = useMap()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!isLoaded || !map || initializedRef.current) {
      return
    }

    if (!hasRainSupport(map)) {
      console.warn("Rain effect requires Mapbox GL JS v3.9 or higher. This feature is not available in MapLibre GL.")
      return
    }

    try {
      const clampedDensity = typeof density === "number" ? clampValue(density, 0, 1) : density
      const clampedVignette = typeof vignette === "number" ? clampValue(vignette, 0, 1) : vignette

      applyRainEffect(map, {
        density: clampedDensity,
        intensity: clampValue(intensity, 0, 1),
        color,
        opacity: clampValue(opacity, 0, 1),
        vignette: clampedVignette,
        "vignette-color": vignetteColor,
        direction,
        "droplet-size": dropletSize,
        "distortion-strength": clampValue(distortionStrength, 0, 1),
        "center-thinning": centerThinning,
      })

      initializedRef.current = true
    } catch (error) {
      console.error("Error setting rain effect:", error)
    }

    return () => {
      if (map && hasRainSupport(map)) {
        try {
          removeRainEffect(map)
        } catch (error) {
          console.error("Error removing rain effect:", error)
        }
      }
      initializedRef.current = false
    }
  }, [
    map,
    isLoaded,
    density,
    intensity,
    color,
    opacity,
    vignette,
    vignetteColor,
    direction,
    dropletSize,
    distortionStrength,
    centerThinning,
  ])

  return null
}
