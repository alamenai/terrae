"use client"

import type mapboxgl from "mapbox-gl"

import { useEffect, useId, useRef } from "react"
import { useMap } from "./hooks"
import type { MapPath } from "./types"

type MapLineProps = {
  /** Array of [longitude, latitude] coordinate pairs defining the line */
  coordinates: MapPath
  /** Line color as CSS color value (default: "#4285F4") */
  color?: string
  /** Line width in pixels (default: 3) */
  width?: number
  /** Line opacity from 0 to 1 (default: 0.8) */
  opacity?: number
  /** Dash pattern [dash length, gap length] for dashed lines */
  dashArray?: [number, number]
}

export function MapLine({ coordinates, color = "#4285F4", width = 3, opacity = 0.8, dashArray }: MapLineProps) {
  const { map, isLoaded } = useMap()
  const id = useId()
  const sourceId = `line-source-${id}`
  const layerId = `line-layer-${id}`
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!isLoaded || !map || initializedRef.current) return

    try {
      // Create GeoJSON data
      const geojsonData: GeoJSON.Feature<GeoJSON.LineString> = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      }

      // Add source
      map.addSource(sourceId, {
        type: "geojson",
        data: geojsonData,
      })

      // Find the first symbol layer to insert the line layer before it
      const layers = map.getStyle().layers
      let firstSymbolId: string | undefined
      if (layers) {
        for (const layer of layers) {
          if (layer.type === "symbol") {
            firstSymbolId = layer.id
            break
          }
        }
      }

      // Add layer
      map.addLayer(
        {
          id: layerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": color,
            "line-width": width,
            "line-opacity": opacity,
            ...(dashArray && { "line-dasharray": dashArray }),
          },
        },
        firstSymbolId
      )

      initializedRef.current = true
    } catch (error) {
      console.error("Error adding line layer:", error)
    }

    return () => {
      initializedRef.current = false
      try {
        if (map && map.getStyle()) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
          if (map.getSource(sourceId)) {
            map.removeSource(sourceId)
          }
        }
      } catch (error) {
        console.error("Error removing line layer:", error)
      }
    }
  }, [isLoaded, map, sourceId, layerId, color, width, opacity, dashArray])

  // Update coordinates when they change
  useEffect(() => {
    if (!isLoaded || !map || !initializedRef.current) return

    try {
      // Double-check map is valid and has the method
      if (!map || !map.isStyleLoaded()) return

      const source = map.getSource(sourceId)
      if (source && "setData" in source && coordinates.length >= 2) {
        ;(source as mapboxgl.GeoJSONSource).setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        })
      }
    } catch (error) {
      console.error("Error updating line coordinates:", error)
    }
  }, [isLoaded, map, coordinates, sourceId])

  // Update styling when props change
  useEffect(() => {
    if (!isLoaded || !map || !map.isStyleLoaded() || !initializedRef.current) return

    try {
      if (map.getLayer(layerId)) {
        map.setPaintProperty(layerId, "line-color", color)
        map.setPaintProperty(layerId, "line-width", width)
        map.setPaintProperty(layerId, "line-opacity", opacity)
        if (dashArray) {
          map.setPaintProperty(layerId, "line-dasharray", dashArray)
        }
      }
    } catch (error) {
      console.error("Error updating line style:", error)
    }
  }, [isLoaded, map, layerId, color, width, opacity, dashArray])

  return null
}
