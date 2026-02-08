"use client"

import { useEffect } from "react"
import { Map, useMap } from "@/registry/map"

function HeatmapLayer() {
  const { map, isLoaded } = useMap()

  useEffect(() => {
    if (!isLoaded || !map || !map.isStyleLoaded()) return

    try {
      // Sample earthquake data
      map.addSource("earthquakes", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
      })

      map.addLayer({
        id: "earthquakes-heat",
        type: "heatmap",
        source: "earthquakes",
        maxzoom: 15,
        paint: {
          // Increase weight as diameter increases
          "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
          // Increase intensity as zoom level increases
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
          // Color ramp for heatmap
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
          ],
          // Adjust radius by zoom level
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 20],
          // Transition from heatmap to circle layer
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 15, 0],
        },
      })

      // Add circle layer for individual points at high zoom
      map.addLayer({
        id: "earthquakes-point",
        type: "circle",
        source: "earthquakes",
        minzoom: 7,
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
            16,
            ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1,
            "rgba(33,102,172,0)",
            2,
            "rgb(103,169,207)",
            3,
            "rgb(209,229,240)",
            4,
            "rgb(253,219,199)",
            5,
            "rgb(239,138,98)",
            6,
            "rgb(178,24,43)",
          ],
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
        },
      })

      return () => {
        try {
          if (map && map.isStyleLoaded()) {
            if (map.getLayer("earthquakes-heat")) map.removeLayer("earthquakes-heat")
            if (map.getLayer("earthquakes-point")) map.removeLayer("earthquakes-point")
            if (map.getSource("earthquakes")) map.removeSource("earthquakes")
          }
        } catch (error) {
          console.error("Error cleaning up heatmap layers:", error)
        }
      }
    } catch (error) {
      console.error("Error setting up heatmap:", error)
    }
  }, [map, isLoaded])

  return null
}

export function HeatmapExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-120, 50]} zoom={2}>
        <HeatmapLayer />
      </Map>
    </div>
  )
}
