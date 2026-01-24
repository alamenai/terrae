import { Map, MapPolygon } from "@/registry/map"

const BOUNDARY: Array<[number, number]> = [
  [2.348, 48.862],
  [2.352, 48.862],
  [2.352, 48.858],
  [2.348, 48.858],
]

export const OutlinePolygonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.35, 48.86]} zoom={15} projection="mercator">
        <MapPolygon coordinates={BOUNDARY} fillOpacity={0} strokeColor="#8b5cf6" strokeWidth={3} />
      </Map>
    </div>
  )
}
