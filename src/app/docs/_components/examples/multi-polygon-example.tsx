import { Map, MapPolygon } from "@/registry/map"

const ZONE_A: Array<[number, number]> = [
  [-0.13, 51.515],
  [-0.11, 51.515],
  [-0.11, 51.505],
  [-0.13, 51.505],
]

const ZONE_B: Array<[number, number]> = [
  [-0.1, 51.515],
  [-0.08, 51.515],
  [-0.08, 51.505],
  [-0.1, 51.505],
]

const ZONE_C: Array<[number, number]> = [
  [-0.115, 51.52],
  [-0.095, 51.52],
  [-0.095, 51.518],
  [-0.115, 51.518],
]

export const MultiPolygonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-0.105, 51.512]} zoom={14} projection="mercator">
        <MapPolygon coordinates={ZONE_A} fillColor="#3b82f6" fillOpacity={0.4} strokeColor="#2563eb" strokeWidth={2} />
        <MapPolygon coordinates={ZONE_B} fillColor="#f97316" fillOpacity={0.4} strokeColor="#ea580c" strokeWidth={2} />
        <MapPolygon coordinates={ZONE_C} fillColor="#8b5cf6" fillOpacity={0.4} strokeColor="#7c3aed" strokeWidth={2} />
      </Map>
    </div>
  )
}
