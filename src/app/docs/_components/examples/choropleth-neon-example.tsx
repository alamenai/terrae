"use client"

import { useState, useEffect } from "react"
import { Map, MapChoropleth, MapControls, MapZoom } from "@/registry/map"

type StateProperties = {
  NAME: string
  density: number
}

const STATE_DENSITIES: Record<string, number> = {
  Alabama: 99.2,
  Alaska: 1.3,
  Arizona: 64.9,
  Arkansas: 58.4,
  California: 256.4,
  Colorado: 57.6,
  Connecticut: 739.1,
  Delaware: 508.0,
  Florida: 410.5,
  Georgia: 187.4,
  Hawaii: 226.6,
  Idaho: 22.5,
  Illinois: 231.5,
  Indiana: 189.4,
  Iowa: 57.1,
  Kansas: 36.2,
  Kentucky: 114.1,
  Louisiana: 108.8,
  Maine: 44.2,
  Maryland: 636.1,
  Massachusetts: 901.2,
  Michigan: 178.0,
  Minnesota: 71.7,
  Mississippi: 63.5,
  Missouri: 89.5,
  Montana: 7.8,
  Nebraska: 25.5,
  Nevada: 29.0,
  "New Hampshire": 153.2,
  "New Jersey": 1263.0,
  "New Mexico": 17.5,
  "New York": 421.2,
  "North Carolina": 218.2,
  "North Dakota": 11.7,
  Ohio: 288.8,
  Oklahoma: 58.7,
  Oregon: 44.8,
  Pennsylvania: 290.6,
  "Rhode Island": 1061.4,
  "South Carolina": 173.2,
  "South Dakota": 12.1,
  Tennessee: 171.7,
  Texas: 114.4,
  Utah: 40.8,
  Vermont: 68.0,
  Virginia: 218.6,
  Washington: 117.3,
  "West Virginia": 74.6,
  Wisconsin: 108.8,
  Wyoming: 5.8,
  "District of Columbia": 11686.0,
  "Puerto Rico": 1088.0,
}

const COLOR_SCALE = {
  stops: [
    { value: 0, color: "#00ffff" },
    { value: 1000, color: "#00ffff" },
  ],
  interpolation: "linear" as const,
}

const NEON_COLORS = ["#00ffff", "#a855f7", "#ec4899", "#f97316", "#00ffff"]

type ChoroplethFeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, StateProperties>

export const ChoroplethNeonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [geoData, setGeoData] = useState<ChoroplethFeatureCollection | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson")
        const data = await response.json()

        const enrichedData: ChoroplethFeatureCollection = {
          type: "FeatureCollection",
          features: data.features.map(
            (feature: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, { NAME: string }>) => {
              const stateName = feature.properties?.NAME || ""
              return {
                ...feature,
                properties: {
                  NAME: stateName,
                  density: STATE_DENSITIES[stateName] || 0,
                },
              }
            }
          ),
        }

        setGeoData(enrichedData)
      } catch (error) {
        console.error("Failed to fetch US states GeoJSON:", error)
      }
    }

    fetchData()
  }, [])

  if (!geoData) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">Loading US states...</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-96, 38]} zoom={3.5} style="mapbox://styles/mapbox/dark-v11">
        <MapChoropleth<StateProperties>
          data={geoData}
          valueProperty="density"
          colorScale={COLOR_SCALE}
          fillOpacity={0.7}
          strokeColor="#1a1a2e"
          strokeWidth={1}
          neonAnimated
          neonColors={NEON_COLORS}
          neonDuration={8000}
        />
        <MapControls position="top-right">
          <MapZoom />
        </MapControls>
      </Map>
    </div>
  )
}
