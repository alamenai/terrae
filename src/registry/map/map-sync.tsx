"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useTheme } from "next-themes"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  defaultMapStyles,
  type MapProjection,
  type MapCoordinates,
  type MapThemeStyles,
  type MapSyncLayout,
} from "./types"

type MapConfig = {
  style?: string
  styles?: MapThemeStyles
  label?: string
}

type MapSyncProps = {
  accessToken: string
  maps: [MapConfig, MapConfig] | [MapConfig, MapConfig, MapConfig, MapConfig]
  center?: MapCoordinates
  zoom?: number
  bearing?: number
  pitch?: number
  projection?: MapProjection
  layout?: MapSyncLayout
  showLabels?: boolean
  loader?: ReactNode
}

type MapSyncContextValue = {
  registerMap: (index: number, map: mapboxgl.Map) => void
  unregisterMap: (index: number) => void
  accessToken: string
  initialCenter: MapCoordinates
  initialZoom: number
  initialBearing: number
  initialPitch: number
  projection?: MapProjection
}

type MapSyncProviderProps = {
  children: ReactNode
  accessToken: string
  initialCenter: MapCoordinates
  initialZoom: number
  initialBearing: number
  initialPitch: number
  projection?: MapProjection
}

type SyncedMapPanelProps = {
  index: number
  style: { width: string; height: string }
  label: string
  showLabel: boolean
  mapStyle?: string
  mapStyles?: MapThemeStyles
  loader?: ReactNode
}

const DEFAULT_CENTER: MapCoordinates = [0, 0]
const DEFAULT_ZOOM = 2
const DEFAULT_BEARING = 0
const DEFAULT_PITCH = 0

const LABEL_BASE_STYLES = "absolute z-10 bg-background/95 backdrop-blur-sm border rounded px-2 py-1 text-xs font-medium"

const MapSyncContext = createContext<MapSyncContextValue | null>(null)

const useMapSync = () => {
  const context = useContext(MapSyncContext)
  if (!context) {
    throw new Error("useMapSync must be used within MapSyncProvider")
  }
  return context
}

export const MapSync = ({
  accessToken,
  maps,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  bearing = DEFAULT_BEARING,
  pitch = DEFAULT_PITCH,
  projection,
  layout = "horizontal",
  showLabels = false,
  loader,
}: MapSyncProps) => {
  const mapCount = maps.length
  const isGrid = layout === "grid" && mapCount === 4

  const getLayoutClasses = () => {
    if (isGrid) {
      return "grid grid-cols-2 grid-rows-2"
    }
    if (layout === "vertical") {
      return "flex flex-col"
    }
    return "flex flex-row"
  }

  const getPanelSize = () => {
    if (isGrid) {
      return { width: "100%", height: "100%" }
    }
    if (layout === "vertical") {
      return { width: "100%", height: `${100 / mapCount}%` }
    }
    return { width: `${100 / mapCount}%`, height: "100%" }
  }

  const getDefaultLabel = (index: number) => {
    if (mapCount === 2) {
      if (layout === "vertical") {
        return index === 0 ? "Top" : "Bottom"
      }
      return index === 0 ? "Left" : "Right"
    }
    const labels = ["Top Left", "Top Right", "Bottom Left", "Bottom Right"]
    return labels[index]
  }

  return (
    <MapSyncProvider
      accessToken={accessToken}
      initialCenter={center}
      initialZoom={zoom}
      initialBearing={bearing}
      initialPitch={pitch}
      projection={projection}
    >
      <div className={cn("relative w-full h-full", getLayoutClasses())}>
        {maps.map((config, index) => {
          return (
            <SyncedMapPanel
              key={index}
              index={index}
              style={getPanelSize()}
              label={config.label ?? getDefaultLabel(index)}
              showLabel={showLabels}
              mapStyle={config.style}
              mapStyles={config.styles}
              loader={loader}
            />
          )
        })}
      </div>
    </MapSyncProvider>
  )
}

const MapSyncProvider = ({
  children,
  accessToken,
  initialCenter,
  initialZoom,
  initialBearing,
  initialPitch,
  projection,
}: MapSyncProviderProps) => {
  const mapsRef = useRef<Map<number, mapboxgl.Map>>(new Map())
  const isSyncingRef = useRef(false)

  const syncMaps = (sourceIndex: number, sourceMap: mapboxgl.Map) => {
    if (isSyncingRef.current) {
      return
    }

    isSyncingRef.current = true

    const center = sourceMap.getCenter()
    const zoom = sourceMap.getZoom()
    const bearing = sourceMap.getBearing()
    const pitch = sourceMap.getPitch()

    mapsRef.current.forEach((map, index) => {
      if (index === sourceIndex) {
        return
      }
      map.jumpTo({
        center,
        zoom,
        bearing,
        pitch,
      })
    })

    isSyncingRef.current = false
  }

  const registerMap = (index: number, map: mapboxgl.Map) => {
    mapsRef.current.set(index, map)

    const handleMove = () => {
      syncMaps(index, map)
    }

    map.on("move", handleMove)
  }

  const unregisterMap = (index: number) => {
    mapsRef.current.delete(index)
  }

  const contextValue: MapSyncContextValue = {
    registerMap,
    unregisterMap,
    accessToken,
    initialCenter,
    initialZoom,
    initialBearing,
    initialPitch,
    projection,
  }

  return <MapSyncContext.Provider value={contextValue}>{children}</MapSyncContext.Provider>
}

const SyncedMapPanel = ({ index, style, label, showLabel, mapStyle, mapStyles, loader }: SyncedMapPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const initializedRef = useRef(false)
  const { resolvedTheme } = useTheme()
  const {
    registerMap,
    unregisterMap,
    accessToken,
    initialCenter,
    initialZoom,
    initialBearing,
    initialPitch,
    projection,
  } = useMapSync()

  const getMapStyle = () => {
    if (mapStyle) {
      return mapStyle
    }
    const darkStyle = mapStyles?.dark ?? defaultMapStyles.dark
    const lightStyle = mapStyles?.light ?? defaultMapStyles.light
    return resolvedTheme === "dark" ? darkStyle : lightStyle
  }

  useEffect(() => {
    if (initializedRef.current) {
      return
    }
    if (!containerRef.current) {
      return
    }

    initializedRef.current = true
    mapboxgl.accessToken = accessToken

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: getMapStyle(),
      center: initialCenter,
      zoom: initialZoom,
      bearing: initialBearing,
      pitch: initialPitch,
      projection,
      attributionControl: false,
    })

    map.on("load", () => {
      setIsLoaded(true)
      registerMap(index, map)
    })

    mapRef.current = map

    return () => {
      unregisterMap(index)
      map.remove()
      mapRef.current = null
      initializedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return
    }
    mapRef.current.setStyle(getMapStyle())
  }, [mapStyle, mapStyles, resolvedTheme])

  return (
    <div className="relative" style={style}>
      {showLabel && <div className={cn(LABEL_BASE_STYLES, "top-3 left-3")}>{label}</div>}
      <div ref={containerRef} className="w-full h-full">
        {!isLoaded && (loader || <DefaultLoader />)}
      </div>
    </div>
  )
}

const DefaultLoader = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
      <Globe className="size-8 text-muted-foreground/60 animate-spin" />
    </div>
  )
}
