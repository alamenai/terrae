"use client"

import { Map, MapMarker, MarkerContent } from "@/registry/map"
import { Activity } from "lucide-react"
import { InfoPanel } from "./info-panel"

type CovidData = {
  country: string
  cases: number
  lat: number
  lng: number
}

const COVID_DATA: CovidData[] = [
  { country: "United States", cases: 107000000, lat: 37.0902, lng: -95.7129 },
  { country: "China", cases: 99000000, lat: 35.8617, lng: 104.1954 },
  { country: "India", cases: 45000000, lat: 20.5937, lng: 78.9629 },
  { country: "Japan", cases: 22000000, lat: 36.2048, lng: 138.2529 },
  { country: "Germany", cases: 35000000, lat: 51.1657, lng: 10.4515 },
  { country: "Brazil", cases: 34000000, lat: -14.235, lng: -51.9253 },
  { country: "United Kingdom", cases: 24000000, lat: 55.3781, lng: -3.436 },
  { country: "France", cases: 33000000, lat: 46.2276, lng: 2.2137 },
  { country: "Russia", cases: 21000000, lat: 61.524, lng: 105.3188 },
  { country: "South Korea", cases: 31000000, lat: 35.9078, lng: 127.7669 },
]

const TOTAL_CASES = (
  COVID_DATA.reduce((sum, c) => {
    return sum + c.cases
  }, 0) / 1000000
).toFixed(1)

export const CircleMarkersDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Total Cases">
        <div className="text-2xl font-semibold leading-tight">{TOTAL_CASES}M</div>
        <div className="flex items-center gap-1 mt-1">
          <Activity className="size-3 text-red-500" />
          <span className="text-xs text-muted-foreground">Top 10</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[0, 20]} zoom={1}>
        {COVID_DATA.map((country, index) => {
          const size = 16 - index * 1.2
          return (
            <MapMarker key={country.country} coordinates={[country.lng, country.lat]}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full bg-red-500/20" style={{ width: size * 2, height: size * 2 }} />
                  <div
                    className="relative rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                    style={{ width: size, height: size }}
                  />
                </div>
              </MarkerContent>
            </MapMarker>
          )
        })}
      </Map>
    </div>
  )
}
