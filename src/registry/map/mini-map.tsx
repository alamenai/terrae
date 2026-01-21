"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import mapboxgl from "mapbox-gl"
import { useMap } from "./hooks"
import { cn } from "@/lib/utils"
import { defaultMapStyles, type MapThemeStyles } from "./types"

type MapMiniMapProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  width?: number
  height?: number
  zoomOffset?: number
  style?: string
  styles?: MapThemeStyles
  boxColor?: string
  boxBorderWidth?: number
  rounded?: number | "full" | "none"
  draggable?: boolean
}

const DEFAULT_BORDER_RADIUS = 8

type Position = { x: number; y: number }

export function MapMiniMap({
  position = "bottom-right",
  width = 200,
  height = 150,
  zoomOffset = -4,
  style,
  styles,
  boxColor = "#3b82f6",
  boxBorderWidth = 2,
  rounded = DEFAULT_BORDER_RADIUS,
  draggable = false,
}: MapMiniMapProps) {
  const { map: mainMap, isLoaded } = useMap()
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const miniMapRef = useRef<mapboxgl.Map | null>(null)
  const [miniMapLoaded, setMiniMapLoaded] = useState(false)
  const [dragPosition, setDragPosition] = useState<Position | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef<Position>({ x: 0, y: 0 })
  const positionStartRef = useRef<Position>({ x: 0, y: 0 })

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  const getMapStyle = () => {
    if (style) {
      return style
    }
    if (styles) {
      const darkStyle = styles.dark ?? defaultMapStyles.dark
      const lightStyle = styles.light ?? defaultMapStyles.light
      return resolvedTheme === "dark" ? darkStyle : lightStyle
    }
    return resolvedTheme === "dark" ? defaultMapStyles.dark : defaultMapStyles.light
  }

  const addViewportBox = (miniMap: mapboxgl.Map) => {
    miniMap.addSource("viewport-box", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: { type: "Polygon", coordinates: [[]] },
      },
    })

    miniMap.addLayer({
      id: "viewport-box-fill",
      type: "fill",
      source: "viewport-box",
      paint: { "fill-color": boxColor, "fill-opacity": 0.1 },
    })

    miniMap.addLayer({
      id: "viewport-box-outline",
      type: "line",
      source: "viewport-box",
      paint: { "line-color": boxColor, "line-width": boxBorderWidth },
    })
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable || !wrapperRef.current) {
        return
      }
      e.preventDefault()
      isDraggingRef.current = true
      dragStartRef.current = { x: e.clientX, y: e.clientY }

      const rect = wrapperRef.current.getBoundingClientRect()
      const parentRect = wrapperRef.current.parentElement?.getBoundingClientRect()
      if (parentRect) {
        positionStartRef.current = { x: rect.left - parentRect.left, y: rect.top - parentRect.top }
      }
    },
    [draggable]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current || !wrapperRef.current) {
        return
      }

      const deltaX = e.clientX - dragStartRef.current.x
      const deltaY = e.clientY - dragStartRef.current.y

      const parentRect = wrapperRef.current.parentElement?.getBoundingClientRect()
      if (!parentRect) {
        return
      }

      const newX = Math.max(0, Math.min(positionStartRef.current.x + deltaX, parentRect.width - width))
      const newY = Math.max(0, Math.min(positionStartRef.current.y + deltaY, parentRect.height - height))

      setDragPosition({ x: newX, y: newY })
    },
    [width, height]
  )

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  useEffect(() => {
    if (!draggable) {
      return
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggable, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (!mainMap || !isLoaded || !containerRef.current) return

    const miniMap = new mapboxgl.Map({
      container: containerRef.current,
      style: getMapStyle(),
      center: mainMap.getCenter(),
      zoom: Math.max(0, mainMap.getZoom() + zoomOffset),
      interactive: false,
      attributionControl: false,
      logoPosition: "bottom-left",
    })

    miniMap.on("load", () => {
      addViewportBox(miniMap)
      setMiniMapLoaded(true)
    })

    miniMapRef.current = miniMap

    return () => {
      miniMap.remove()
      miniMapRef.current = null
      setMiniMapLoaded(false)
    }
  }, [mainMap, isLoaded, style, zoomOffset, boxColor, boxBorderWidth])

  useEffect(() => {
    if (!miniMapRef.current || !miniMapLoaded || style) {
      return
    }

    const miniMap = miniMapRef.current

    const handleStyleLoad = () => {
      addViewportBox(miniMap)
    }

    miniMap.once("style.load", handleStyleLoad)
    miniMap.setStyle(getMapStyle())

    return () => {
      miniMap.off("style.load", handleStyleLoad)
    }
  }, [resolvedTheme, styles, miniMapLoaded, style])

  useEffect(() => {
    if (!mainMap || !miniMapRef.current || !miniMapLoaded) return

    const updateMiniMap = () => {
      const miniMap = miniMapRef.current
      if (!miniMap) return

      miniMap.setCenter(mainMap.getCenter())
      miniMap.setZoom(Math.max(0, mainMap.getZoom() + zoomOffset))

      const bounds = mainMap.getBounds()
      if (!bounds) return

      const nw = bounds.getNorthWest()
      const ne = bounds.getNorthEast()
      const se = bounds.getSouthEast()
      const sw = bounds.getSouthWest()

      const boxSource = miniMap.getSource("viewport-box") as mapboxgl.GeoJSONSource
      boxSource?.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [nw.lng, nw.lat],
              [ne.lng, ne.lat],
              [se.lng, se.lat],
              [sw.lng, sw.lat],
              [nw.lng, nw.lat],
            ],
          ],
        },
      })
    }

    mainMap.on("move", updateMiniMap)
    mainMap.on("zoom", updateMiniMap)
    updateMiniMap()

    return () => {
      mainMap.off("move", updateMiniMap)
      mainMap.off("zoom", updateMiniMap)
    }
  }, [mainMap, miniMapLoaded, zoomOffset])

  const getBorderRadius = () => {
    if (rounded === "full") {
      return "9999px"
    }
    if (rounded === "none") {
      return "0px"
    }
    return `${rounded}px`
  }

  const wrapperStyle = draggable && dragPosition ? { left: dragPosition.x, top: dragPosition.y } : undefined

  return (
    <div
      ref={wrapperRef}
      className={cn("absolute z-10", !draggable || !dragPosition ? positionClasses[position] : "")}
      style={wrapperStyle}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={containerRef}
        className="overflow-hidden border-2 border-border shadow-lg"
        style={{
          width,
          height,
          borderRadius: getBorderRadius(),
          cursor: draggable ? "grab" : "default",
        }}
      />
    </div>
  )
}
