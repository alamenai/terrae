"use client"

import { useEffect, useRef } from "react"
import { useMap } from "./hooks"

type MapRainProps = {
  /** Rain density (0-1 or Mapbox expression) */
  density?: number | any[]
  /** Rain intensity (0-1) */
  intensity?: number
  /** Rain droplet color */
  color?: string
  /** Rain opacity (0-1) */
  opacity?: number
  /** Vignette effect strength (0-1 or Mapbox expression) */
  vignette?: number | any[]
  /** Vignette color */
  vignetteColor?: string
  /** Wind direction [x, y] */
  direction?: [number, number]
  /** Droplet size range [min, max] */
  dropletSize?: [number, number]
  /** Distortion strength (0-1) */
  distortionStrength?: number
  /** Center thinning (0 = full screen) */
  centerThinning?: number
}

/**
 * Helper function to create zoom-based interpolation expressions
 * @param value - The target value at max zoom
 * @param minZoom - Zoom level where effect starts (default: 11)
 * @param maxZoom - Zoom level where effect reaches target value (default: 13)
 */
export function createZoomInterpolation(value: number, minZoom: number = 11, maxZoom: number = 13): any[] {
  return ["interpolate", ["linear"], ["zoom"], minZoom, 0.0, maxZoom, value]
}

export function MapRain({
  density = 0.5,
  intensity = 1.0,
  color = "#a8adbc",
  opacity = 0.7,
  vignette = 1.0,
  vignetteColor = "#464646",
  direction = [0, 80],
  dropletSize = [2.6, 18.2],
  distortionStrength = 0.7,
  centerThinning = 0,
}: MapRainProps) {
  const { map, isLoaded } = useMap()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!isLoaded || !map || initializedRef.current) return

    // setRain is a Mapbox-only API (requires Mapbox GL JS v3.9+)
    if (typeof (map as any).setRain !== "function") {
      console.warn("Rain effect requires Mapbox GL JS v3.9 or higher. This feature is not available in MapLibre GL.")
      return
    }

    try {
      // Clamp values to valid ranges
      const clampedIntensity = Math.min(Math.max(intensity, 0), 1)
      const clampedDensity = typeof density === "number" ? Math.min(Math.max(density, 0), 1) : density
      const clampedVignette = typeof vignette === "number" ? Math.min(Math.max(vignette, 0), 1) : vignette
      const clampedOpacity = Math.min(Math.max(opacity, 0), 1)
      const clampedDistortionStrength = Math.min(Math.max(distortionStrength, 0), 1)

      ;(map as any).setRain({
        density: clampedDensity,
        intensity: clampedIntensity,
        color,
        opacity: clampedOpacity,
        vignette: clampedVignette,
        "vignette-color": vignetteColor,
        direction,
        "droplet-size": dropletSize,
        "distortion-strength": clampedDistortionStrength,
        "center-thinning": centerThinning,
      })

      initializedRef.current = true
    } catch (error) {
      console.error("Error setting rain effect:", error)
    }

    return () => {
      // Remove rain effect on cleanup
      if (map && typeof (map as any).setRain === "function") {
        try {
          ;(map as any).setRain(null)
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
