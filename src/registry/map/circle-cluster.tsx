"use client"

import { useEffect, useId, useRef } from "react"
import type mapboxgl from "mapbox-gl"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type MapCircleClusterProps<P extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties> = {
  /** GeoJSON FeatureCollection data or URL to fetch GeoJSON from */
  data: string | GeoJSON.FeatureCollection<GeoJSON.Point, P>
  /** Maximum zoom level to cluster points on (default: 14) */
  clusterMaxZoom?: number
  /** Radius of each cluster when clustering points in pixels (default: 50) */
  clusterRadius?: number
  /** Colors for cluster circles: [small, medium, large] based on point count (default: ["#51bbd6", "#f1f075", "#f28cb1"]) */
  clusterColors?: [string, string, string]
  /** Point count thresholds for color/size steps: [medium, large] (default: [100, 750]) */
  clusterThresholds?: [number, number]
  /** Color for unclustered individual points (default: "#3b82f6") */
  pointColor?: string
  /** Callback when an unclustered point is clicked */
  onPointClick?: (feature: GeoJSON.Feature<GeoJSON.Point, P>, coordinates: MapCoordinates) => void
  /** Callback when a cluster is clicked. If not provided, zooms into the cluster */
  onClusterClick?: (clusterId: number, coordinates: MapCoordinates, pointCount: number) => void
}

export function MapCircleCluster<P extends GeoJSON.GeoJsonProperties = GeoJSON.GeoJsonProperties>({
  data,
  clusterMaxZoom = 14,
  clusterRadius = 50,
  clusterColors = ["#be123c", "#1d4ed8", "#f28cb1"],
  clusterThresholds = [100, 750],
  pointColor = "#3b82f6",
  onPointClick,
  onClusterClick,
}: MapCircleClusterProps<P>) {
  const { map, isLoaded } = useMap()
  const id = useId()
  const sourceId = `cluster-source-${id}`
  const clusterLayerId = `cluster-layer-${id}`
  const clusterCountLayerId = `cluster-count-${id}`
  const unclusteredLayerId = `unclustered-point-${id}`

  const initializedRef = useRef(false)
  const stylePropsRef = useRef({
    clusterColors,
    clusterThresholds,
    pointColor,
  })

  // Add source and layers on mount
  useEffect(() => {
    if (!isLoaded || !map || initializedRef.current) return
    if (!map.getContainer?.() || !map.getCanvasContainer?.() || !map.isStyleLoaded()) {
      return
    }

    // Add clustered GeoJSON source
    map.addSource(sourceId, {
      type: "geojson",
      data: typeof data === "string" ? data : data,
      cluster: true,
      clusterMaxZoom,
      clusterRadius,
    })

    // Add cluster circles layer
    map.addLayer({
      id: clusterLayerId,
      type: "circle",
      source: sourceId,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          clusterColors[0],
          clusterThresholds[0],
          clusterColors[1],
          clusterThresholds[1],
          clusterColors[2],
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, clusterThresholds[0], 30, clusterThresholds[1], 40],
      },
    })

    // Add cluster count text layer
    map.addLayer({
      id: clusterCountLayerId,
      type: "symbol",
      source: sourceId,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-size": 12,
      },
      paint: {
        "text-color": "#fff",
      },
    })

    // Add unclustered point layer
    map.addLayer({
      id: unclusteredLayerId,
      type: "circle",
      source: sourceId,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": pointColor,
        "circle-radius": 6,
      },
    })

    initializedRef.current = true

    return () => {
      try {
        if (!map || !map.isStyleLoaded()) return

        const style = map.getStyle()
        if (!style) return

        const hasLayer = (id: string) => style.layers?.some((l) => l.id === id)

        if (hasLayer(clusterCountLayerId)) {
          map.removeLayer(clusterCountLayerId)
        }
        if (hasLayer(unclusteredLayerId)) {
          map.removeLayer(unclusteredLayerId)
        }
        if (hasLayer(clusterLayerId)) {
          map.removeLayer(clusterLayerId)
        }

        if (map.getSource(sourceId)) {
          map.removeSource(sourceId)
        }
      } catch {
        // Map or style already destroyed — safe to ignore
      }
      initializedRef.current = false
    }
  }, [isLoaded, map, sourceId])

  // Update source data when data prop changes (only for non-URL data )
  useEffect(() => {
    if (!isLoaded || !map || typeof data === "string") return

    try {
      // Double-check map is valid and has the method
      if (!map || !map.isStyleLoaded()) return

      // Check if source exists before trying to update it
      const source = map.getSource(sourceId)
      if (source && "setData" in source) {
        ;(source as mapboxgl.GeoJSONSource).setData(data)
      }
    } catch {
      // Silently ignore errors if source doesn't exist yet
      // This can happen during rapid re-renders or navigation
    }
  }, [isLoaded, map, data, sourceId])

  // Update layer styles when props change
  useEffect(() => {
    if (!isLoaded || !map || !map.isStyleLoaded()) return

    const prev = stylePropsRef.current
    const colorsChanged = prev.clusterColors !== clusterColors || prev.clusterThresholds !== clusterThresholds

    try {
      // Update circle cluster colors and sizes
      if (map && map.getLayer(clusterLayerId) && colorsChanged) {
        map.setPaintProperty(clusterLayerId, "circle-color", [
          "step",
          ["get", "point_count"],
          clusterColors[0],
          clusterThresholds[0],
          clusterColors[1],
          clusterThresholds[1],
          clusterColors[2],
        ])
        map.setPaintProperty(clusterLayerId, "circle-radius", [
          "step",
          ["get", "point_count"],
          20,
          clusterThresholds[0],
          30,
          clusterThresholds[1],
          40,
        ])
      }

      // Update unclustered point layer color
      if (map && map.getLayer(unclusteredLayerId) && prev.pointColor !== pointColor) {
        map.setPaintProperty(unclusteredLayerId, "circle-color", pointColor)
      }

      stylePropsRef.current = { clusterColors, clusterThresholds, pointColor }
    } catch (error) {
      console.error("Error updating circle cluster styles:", error)
    }
  }, [isLoaded, map, clusterLayerId, unclusteredLayerId, clusterColors, clusterThresholds, pointColor])

  // Handle click events
  useEffect(() => {
    if (!isLoaded || !map) return

    // Cluster click handler - zoom into cluster
    const handleClusterClick = async (
      e: mapboxgl.MapMouseEvent & {
        features?: mapboxgl.GeoJSONFeature[]
      }
    ) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [clusterLayerId],
      })
      if (!features.length) return

      const feature = features[0]
      const clusterId = feature.properties?.cluster_id as number
      const pointCount = feature.properties?.point_count as number
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates as [number, number]

      if (onClusterClick) {
        onClusterClick(clusterId, coordinates, pointCount)
      } else {
        // Default behavior: zoom to cluster expansion zoom
        const source = map.getSource(sourceId)
        if (source && "getClusterExpansionZoom" in source) {
          ;(source as mapboxgl.GeoJSONSource).getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || zoom === null || zoom === undefined) return
            map.easeTo({
              center: coordinates,
              zoom,
            })
          })
        }
      }
    }

    // Unclustered point click handler
    const handlePointClick = (
      e: mapboxgl.MapMouseEvent & {
        features?: mapboxgl.GeoJSONFeature[]
      }
    ) => {
      if (!onPointClick || !e.features?.length) return

      const feature = e.features[0]
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number]

      // Handle world copies
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      onPointClick(feature as unknown as GeoJSON.Feature<GeoJSON.Point, P>, coordinates)
    }

    // Cursor style handlers
    const handleMouseEnterCluster = () => {
      map.getCanvas().style.cursor = "pointer"
    }
    const handleMouseLeaveCluster = () => {
      map.getCanvas().style.cursor = ""
    }
    const handleMouseEnterPoint = () => {
      if (onPointClick) {
        map.getCanvas().style.cursor = "pointer"
      }
    }
    const handleMouseLeavePoint = () => {
      map.getCanvas().style.cursor = ""
    }

    map.on("click", clusterLayerId, handleClusterClick)
    map.on("click", unclusteredLayerId, handlePointClick)
    map.on("mouseenter", clusterLayerId, handleMouseEnterCluster)
    map.on("mouseleave", clusterLayerId, handleMouseLeaveCluster)
    map.on("mouseenter", unclusteredLayerId, handleMouseEnterPoint)
    map.on("mouseleave", unclusteredLayerId, handleMouseLeavePoint)

    return () => {
      map.off("click", clusterLayerId, handleClusterClick)
      map.off("click", unclusteredLayerId, handlePointClick)
      map.off("mouseenter", clusterLayerId, handleMouseEnterCluster)
      map.off("mouseleave", clusterLayerId, handleMouseLeaveCluster)
      map.off("mouseenter", unclusteredLayerId, handleMouseEnterPoint)
      map.off("mouseleave", unclusteredLayerId, handleMouseLeavePoint)
    }
  }, [isLoaded, map, clusterLayerId, unclusteredLayerId, sourceId, onClusterClick, onPointClick])

  return null
}
