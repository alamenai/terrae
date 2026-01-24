import { Map, MapPolygon } from "@/registry/map"

const CENTRAL_PARK: Array<[number, number]> = [
  [-73.9654, 40.8006],
  [-73.9493, 40.7968],
  [-73.9579, 40.7644],
  [-73.9743, 40.7679],
]

export const BasicPolygonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9654, 40.7825]} zoom={13} projection="mercator">
        <MapPolygon
          coordinates={CENTRAL_PARK}
          fillColor="#22c55e"
          fillOpacity={0.4}
          strokeColor="#16a34a"
          strokeWidth={2}
        />
      </Map>
    </div>
  )
}
