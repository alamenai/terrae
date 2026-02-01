"use client"

import { useState, useEffect } from "react"
import { Map, MapChoropleth, MapPopup } from "@/registry/map"

type CountryProperties = {
  name: string
  population: number
}

const COUNTRY_POPULATIONS: Record<string, number> = {
  Germany: 83200000,
  France: 67390000,
  "United Kingdom": 67220000,
  Italy: 60360000,
  Spain: 47350000,
  Poland: 37950000,
  Romania: 19290000,
  Netherlands: 17440000,
  Belgium: 11590000,
  "Czech Republic": 10700000,
  Czechia: 10700000,
  Greece: 10420000,
  Portugal: 10310000,
  Sweden: 10380000,
  Hungary: 9660000,
  Austria: 9010000,
  Switzerland: 8670000,
  Bulgaria: 6900000,
  Denmark: 5830000,
  Finland: 5540000,
  Slovakia: 5460000,
  Norway: 5420000,
  Ireland: 5010000,
  Croatia: 4050000,
  Moldova: 2620000,
  "Bosnia and Herzegovina": 3280000,
  Albania: 2880000,
  Lithuania: 2790000,
  "North Macedonia": 2080000,
  Slovenia: 2100000,
  Latvia: 1880000,
  Estonia: 1330000,
  Montenegro: 620000,
  Luxembourg: 640000,
  Malta: 520000,
  Iceland: 370000,
  Russia: 144100000,
  Ukraine: 41170000,
  Belarus: 9200000,
  Serbia: 6800000,
  Turkey: 84340000,
}

const COLOR_SCALE = {
  stops: [
    { value: 0, color: "#eff6ff" },
    { value: 5000000, color: "#bfdbfe" },
    { value: 10000000, color: "#93c5fd" },
    { value: 30000000, color: "#60a5fa" },
    { value: 50000000, color: "#3b82f6" },
    { value: 80000000, color: "#1d4ed8" },
  ],
  interpolation: "linear" as const,
  nullColor: "#e5e5e5",
}

const GEOJSON_URL = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"

type SelectedCountry = {
  name: string
  population: number
  coordinates: [number, number]
}

type ChoroplethFeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, CountryProperties>

const formatPopulation = (pop: number) => {
  if (pop >= 1000000) {
    return `${(pop / 1000000).toFixed(1)}M`
  }

  return pop.toLocaleString()
}

export const ChoroplethDemo = () => {
  const [selected, setSelected] = useState<SelectedCountry | null>(null)
  const [geoData, setGeoData] = useState<ChoroplethFeatureCollection | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(GEOJSON_URL)
      const data = await response.json()

      const enrichedData: ChoroplethFeatureCollection = {
        type: "FeatureCollection",
        features: data.features.map(
          (feature: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, { ADMIN?: string; name?: string }>) => {
            const countryName = feature.properties?.ADMIN || feature.properties?.name || ""

            return {
              ...feature,
              properties: {
                name: countryName,
                population: COUNTRY_POPULATIONS[countryName] || 0,
              },
            }
          }
        ),
      }

      setGeoData(enrichedData)
    }

    fetchData()
  }, [])

  const handleCountryClick = ({
    feature,
    value,
    coordinates,
  }: {
    feature: GeoJSON.Feature
    value: number | null
    coordinates: [number, number]
  }) => {
    setSelected({
      name: feature.properties?.name || "Unknown",
      population: value ?? 0,
      coordinates,
    })
  }

  const handlePopupClose = () => {
    setSelected(null)
  }

  if (!geoData) {
    return null
  }

  return (
    <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[15, 50]} zoom={4}>
      <MapChoropleth<CountryProperties>
        data={geoData}
        valueProperty="population"
        colorScale={COLOR_SCALE}
        fillOpacity={0.8}
        strokeColor="#ffffff"
        strokeWidth={0.5}
        hoverEnabled
        hoverFillOpacity={0.95}
        hoverStrokeColor="#2563eb"
        hoverStrokeWidth={2}
        onClick={handleCountryClick}
      />

      {selected && (
        <MapPopup coordinates={selected.coordinates} onClose={handlePopupClose}>
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 border border-blue-200 dark:border-blue-800 rounded-lg shadow-lg p-3 min-w-[140px]">
            <p className="font-semibold text-blue-900 dark:text-blue-100">{selected.name}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Population: {formatPopulation(selected.population)}
            </p>
          </div>
        </MapPopup>
      )}
    </Map>
  )
}
