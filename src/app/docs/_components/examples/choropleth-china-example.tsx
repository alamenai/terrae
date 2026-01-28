"use client"

import { useState, useEffect } from "react"
import { Map, MapChoropleth, MapPopup, MapControls, MapZoom } from "@/registry/map"

type ProvinceProperties = {
  name: string
  adcode: number
  population?: number
}

const PROVINCE_POPULATIONS: Record<number, number> = {
  110000: 21893095,
  120000: 13866009,
  130000: 74610235,
  140000: 34915616,
  150000: 24049155,
  210000: 42591407,
  220000: 24073453,
  230000: 31850088,
  310000: 24870895,
  320000: 84748016,
  330000: 64567588,
  340000: 61027171,
  350000: 41540086,
  360000: 45188635,
  370000: 101527453,
  410000: 99365519,
  420000: 57752557,
  430000: 66444864,
  440000: 126012510,
  450000: 50126804,
  460000: 10081232,
  500000: 32054159,
  510000: 83674866,
  520000: 38562148,
  530000: 47209277,
  540000: 3648100,
  610000: 39528999,
  620000: 25019831,
  630000: 5923957,
  640000: 7202654,
  650000: 25852345,
  710000: 23451837,
  810000: 7413070,
  820000: 683218,
}

const COLOR_SCALE = {
  stops: [
    { value: 0, color: "#fee5d9" },
    { value: 10000000, color: "#fcbba1" },
    { value: 30000000, color: "#fc9272" },
    { value: 50000000, color: "#fb6a4a" },
    { value: 80000000, color: "#ef3b2c" },
    { value: 100000000, color: "#cb181d" },
  ],
  interpolation: "linear" as const,
  nullColor: "#f0f0f0",
}

type SelectedProvince = {
  name: string
  population: number
  coordinates: [number, number]
}

type ChoroplethFeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, ProvinceProperties>

const ChoroplethChinaExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [selected, setSelected] = useState<SelectedProvince | null>(null)
  const [geoData, setGeoData] = useState<ChoroplethFeatureCollection | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
        const data = await response.json()

        const enrichedData: ChoroplethFeatureCollection = {
          type: "FeatureCollection",
          features: data.features.map(
            (feature: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, ProvinceProperties>) => {
              return {
                ...feature,
                properties: {
                  ...feature.properties,
                  population: PROVINCE_POPULATIONS[feature.properties?.adcode] || 0,
                },
              }
            }
          ),
        }

        setGeoData(enrichedData)
      } catch (error) {
        console.error("Failed to fetch China GeoJSON:", error)
      }
    }

    fetchData()
  }, [])

  const formatPopulation = (pop: number) => {
    return `${(pop / 1000000).toFixed(1)}M`
  }

  if (!geoData) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">Loading China provinces...</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[104, 35]} zoom={3}>
        <MapChoropleth<ProvinceProperties>
          data={geoData}
          valueProperty="population"
          colorScale={COLOR_SCALE}
          fillOpacity={0.8}
          strokeColor="#ffffff"
          strokeWidth={0.5}
          hoverEnabled
          hoverFillOpacity={0.9}
          hoverStrokeColor="#000000"
          hoverStrokeWidth={2}
          onClick={({ feature, value, coordinates }) => {
            setSelected({
              name: feature.properties?.name || "Unknown",
              population: value ?? 0,
              coordinates,
            })
          }}
        />

        {selected && (
          <MapPopup
            coordinates={selected.coordinates}
            onClose={() => {
              setSelected(null)
            }}
          >
            <div className="bg-background border rounded-lg shadow-lg p-3 min-w-[140px]">
              <p className="font-semibold text-foreground">{selected.name}</p>
              <p className="text-sm text-muted-foreground">Population: {formatPopulation(selected.population)}</p>
            </div>
          </MapPopup>
        )}

        <MapControls position="top-right">
          <MapZoom />
        </MapControls>
      </Map>
    </div>
  )
}

export default ChoroplethChinaExample
