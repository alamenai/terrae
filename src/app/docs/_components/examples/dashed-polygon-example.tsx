import { Map, MapPolygon } from "@/registry/map"

const RESTRICTED_AREA: Array<[number, number]> = [
  [-122.42, 37.79],
  [-122.4, 37.79],
  [-122.4, 37.77],
  [-122.42, 37.77],
]

export const DashedPolygonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.41, 37.78]} zoom={13} projection="mercator">
        <MapPolygon
          coordinates={RESTRICTED_AREA}
          fillColor="#ef4444"
          fillOpacity={0.2}
          strokeColor="#dc2626"
          strokeWidth={2}
          strokeOpacity={0.8}
          dashArray={[4, 4]}
        />
      </Map>
    </div>
  )
}
