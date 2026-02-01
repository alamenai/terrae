"use client"

import { useTheme } from "next-themes"
import { createContext, useEffect, useRef, useState, type ReactNode } from "react"
import type mapboxgl from "mapbox-gl"
import { mapgl, detectedLibrary } from "./map-library"
import { Globe } from "lucide-react"
import {
  defaultMapStyles,
  defaultMapLibreStyles,
  type MapContextValue,
  type MapThemeStyles,
  type MapProjection,
  type MapCoordinates,
  type MapBounds,
} from "./types"

export const MapContext = createContext<MapContextValue | null>(null)

const DEFAULT_CENTER: MapCoordinates = [0, 0]
const DEFAULT_ZOOM = 2
const DEFAULT_BEARING = 0
const DEFAULT_PITCH = 0
const DEFAULT_ROTATE_SPEED = 3

type MapProps = {
  accessToken?: string
  children?: ReactNode
  loader?: ReactNode
  // Forces loader to show when true, hides when false, auto when undefined
  showLoader?: boolean
  // Overrides theme-based styles when set
  style?: string
  styles?: MapThemeStyles
  center?: MapCoordinates
  zoom?: number
  bearing?: number
  pitch?: number
  projection?: MapProjection
  minZoom?: number
  maxZoom?: number
  maxBounds?: MapBounds
  // Auto-rotate the globe (only works with projection="globe")
  autoRotate?: boolean
  // Rotation speed in degrees per second
  rotateSpeed?: number
}

export const Map = ({
  accessToken,
  children,
  loader,
  showLoader,
  style,
  styles,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  bearing = DEFAULT_BEARING,
  pitch = DEFAULT_PITCH,
  projection,
  minZoom,
  maxZoom,
  maxBounds,
  autoRotate,
  rotateSpeed = DEFAULT_ROTATE_SPEED,
}: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  const initializedRef = useRef(false)

  const shouldShowLoader = showLoader ?? !isLoaded

  const getMapStyle = () => {
    if (style) {
      return style
    }
    const defaults = detectedLibrary === "maplibre" ? defaultMapLibreStyles : defaultMapStyles
    const darkStyle = styles?.dark ?? defaults.dark
    const lightStyle = styles?.light ?? defaults.light

    return resolvedTheme === "dark" ? darkStyle : lightStyle
  }

  const createMapInstance = (container: HTMLDivElement) => {
    return new mapgl.Map({
      container,
      style: getMapStyle(),
      center,
      zoom,
      bearing,
      pitch,
      projection,
      minZoom,
      maxZoom,
      maxBounds,
      attributionControl: false,
    })
  }

  const isStandardStyle = (styleUrl: string) => {
    return styleUrl.includes("mapbox://styles/mapbox/standard")
  }

  const updateStandardLightPreset = (mapInstance: mapboxgl.Map) => {
    if (detectedLibrary !== "mapbox") {
      return
    }
    const currentStyle = getMapStyle()
    if (isStandardStyle(currentStyle)) {
      const lightPreset = resolvedTheme === "dark" ? "night" : "day"
      mapInstance.setConfigProperty("basemap", "lightPreset", lightPreset)
    }
  }

  const handleMapLoad = () => {
    setIsLoaded(true)
    if (mapRef.current) {
      updateStandardLightPreset(mapRef.current)
    }
  }

  const handleMapError = (e: mapboxgl.ErrorEvent) => {
    console.error("Map error:", e.error)
    setError("Failed to load map")
  }

  const cleanupMap = (mapInstance: mapboxgl.Map) => {
    mapInstance.remove()
    mapRef.current = null
    setIsLoaded(false)
    initializedRef.current = false
  }

  useEffect(() => {
    if (initializedRef.current) {
      return
    }
    if (!containerRef.current) {
      return
    }
    if (detectedLibrary === "mapbox" && !accessToken) {
      setError(
        "Mapbox access token is required. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file and restart the dev server."
      )
      return
    }

    initializedRef.current = true

    if (accessToken) {
      mapgl.accessToken = accessToken
    }

    try {
      const container = containerRef.current
      const originalGetBoundingClientRect = container.getBoundingClientRect.bind(container)
      container.getBoundingClientRect = () => {
        const rect = originalGetBoundingClientRect()
        const width = container.offsetWidth
        const height = container.offsetHeight
        return { ...rect, width, height, right: rect.left + width, bottom: rect.top + height }
      }

      const mapInstance = createMapInstance(container)
      mapInstance.on("load", handleMapLoad)
      mapInstance.on("error", handleMapError)
      mapRef.current = mapInstance

      return () => {
        delete (container as unknown as Record<string, unknown>).getBoundingClientRect
        cleanupMap(mapInstance)
      }
    } catch (err) {
      console.error("Error creating map:", err)
      setError("Failed to create map")
      initializedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return
    }

    const currentStyle = getMapStyle()
    if (isStandardStyle(currentStyle)) {
      updateStandardLightPreset(mapRef.current)
    } else {
      mapRef.current.setStyle(currentStyle)
    }
  }, [style, styles, resolvedTheme])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return
    }

    mapRef.current.setCenter(center)
  }, [center])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return
    }

    mapRef.current.setZoom(zoom)
  }, [zoom])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return
    }

    mapRef.current.setBearing(bearing)
  }, [bearing])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return
    }

    mapRef.current.setPitch(pitch)
  }, [pitch])

  useEffect(() => {
    if (!mapRef.current || !isLoaded || !projection) {
      return
    }

    mapRef.current.setProjection(projection)
  }, [projection])

  useEffect(() => {
    if (!containerRef.current || !mapRef.current || !isLoaded) {
      return
    }

    const container = containerRef.current
    const observer = new ResizeObserver(() => {
      mapRef.current?.resize()
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [isLoaded])

  useEffect(() => {
    if (!mapRef.current || !isLoaded || !autoRotate || projection !== "globe") {
      return
    }

    let animationId: number
    let lastTime = performance.now()

    const rotate = (currentTime: number) => {
      if (!mapRef.current) {
        return
      }

      const delta = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const currentCenter = mapRef.current.getCenter()
      const newLng = currentCenter.lng + rotateSpeed * delta

      mapRef.current.setCenter([newLng, currentCenter.lat])

      animationId = requestAnimationFrame(rotate)
    }

    animationId = requestAnimationFrame(rotate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isLoaded, autoRotate, projection, rotateSpeed])

  const contextValue: MapContextValue = {
    map: mapRef.current,
    isLoaded,
    library: detectedLibrary,
  }

  if (error) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-destructive text-sm">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className="relative w-full h-full">
        {shouldShowLoader && (loader || <DefaultLoader />)}
        {mapRef.current && children}
      </div>
    </MapContext.Provider>
  )
}

const DefaultLoader = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
      <Globe className="size-8 text-muted-foreground/60 animate-spin" />
    </div>
  )
}
