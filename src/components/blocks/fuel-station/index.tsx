"use client"

import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/registry/map"
import { Fuel } from "lucide-react"
import { cn } from "@/lib/utils"

type FuelPrices = {
  regular: number
  plus: number
  premium: number
  diesel: number
}

type FuelStation = {
  id: string
  brand: string
  address: string
  coordinates: [number, number]
  prices: FuelPrices
  color: string
}

type PriceRowProps = {
  label: string
  price: number
}

type StationMarkerProps = {
  station: FuelStation
}

const FUEL_STATIONS: FuelStation[] = [
  {
    id: "shell-west-midtown",
    brand: "Shell",
    address: "11th Ave & W 42nd St",
    coordinates: [-73.9996, 40.758],
    prices: { regular: 4.29, plus: 4.49, premium: 4.69, diesel: 4.19 },
    color: "#e8a000",
  },
  {
    id: "bp-hells-kitchen",
    brand: "BP",
    address: "W 44th St & 8th Ave",
    coordinates: [-73.9878, 40.7589],
    prices: { regular: 4.59, plus: 4.79, premium: 4.99, diesel: 4.39 },
    color: "#00a651",
  },
  {
    id: "mobil-east-midtown",
    brand: "Mobil",
    address: "1st Ave & E 36th St",
    coordinates: [-73.9725, 40.7483],
    prices: { regular: 4.49, plus: 4.69, premium: 4.89, diesel: 4.29 },
    color: "#e01c22",
  },
  {
    id: "chevron-chelsea",
    brand: "Chevron",
    address: "12th Ave & W 28th St",
    coordinates: [-74.007, 40.749],
    prices: { regular: 4.39, plus: 4.59, premium: 4.79, diesel: 4.29 },
    color: "#e31837",
  },
  {
    id: "exxon-tribeca",
    brand: "Exxon",
    address: "Hudson St & Laight St",
    coordinates: [-74.0089, 40.721],
    prices: { regular: 4.69, plus: 4.89, premium: 5.09, diesel: 4.49 },
    color: "#3b67af",
  },
  {
    id: "gulf-columbus-circle",
    brand: "Gulf",
    address: "W 57th St & 10th Ave",
    coordinates: [-73.992, 40.7668],
    prices: { regular: 4.35, plus: 4.55, premium: 4.75, diesel: 4.25 },
    color: "#f7941d",
  },
]

const CHEAPEST_STATION = [...FUEL_STATIONS].sort((stationA, stationB) => {
  return stationA.prices.regular - stationB.prices.regular
})[0]

const getPriceTierClass = (price: number) => {
  if (price < 4.4) {
    return "text-green-600 dark:text-green-400"
  }
  if (price < 4.6) {
    return "text-amber-600 dark:text-amber-400"
  }
  return "text-red-600 dark:text-red-400"
}

const PriceRow = ({ label, price }: PriceRowProps) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium tabular-nums", getPriceTierClass(price))}>${price.toFixed(2)}</span>
    </div>
  )
}

const StationMarker = ({ station }: StationMarkerProps) => {
  return (
    <MapMarker coordinates={station.coordinates}>
      <MarkerContent>
        <div
          className="flex items-center gap-1 bg-background border rounded-full px-2 py-1 shadow-md text-xs font-semibold hover:scale-105 transition-transform"
          style={{ borderColor: station.color }}
        >
          <Fuel className="size-3" style={{ color: station.color }} />
          <span>${station.prices.regular.toFixed(2)}</span>
        </div>
      </MarkerContent>
      <MarkerTooltip className="rounded-xl bg-popover text-popover-foreground p-4">
        <div className="min-w-44 text-sm">
          <div className="font-semibold">{station.brand}</div>
          <div className="text-xs text-muted-foreground mb-3">{station.address}</div>
          <div className="space-y-1.5">
            <PriceRow label="Regular" price={station.prices.regular} />
            <PriceRow label="Plus" price={station.prices.plus} />
            <PriceRow label="Premium" price={station.prices.premium} />
            <PriceRow label="Diesel" price={station.prices.diesel} />
          </div>
          <div className="text-[10px] text-muted-foreground mt-3 pt-2 border-t border-border/50">Updated 2h ago</div>
        </div>
      </MarkerTooltip>
    </MapMarker>
  )
}

export const FuelStationBlock = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-md rounded-xl p-3 border border-border/50 shadow-lg text-sm">
        <div className="tracking-wider text-[10px] text-muted-foreground uppercase mb-1">Fuel Prices · NYC</div>
        <div className="text-xs text-muted-foreground mt-1">Cheapest Regular</div>
        <div className={cn("font-semibold mt-0.5", getPriceTierClass(CHEAPEST_STATION.prices.regular))}>
          ${CHEAPEST_STATION.prices.regular.toFixed(2)}/gal
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {CHEAPEST_STATION.brand} · {CHEAPEST_STATION.address.split("&")[0].trim()}
        </div>
      </div>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-73.99, 40.75]} zoom={12}>
        {FUEL_STATIONS.map((station) => {
          return <StationMarker key={station.id} station={station} />
        })}
      </Map>
    </div>
  )
}
