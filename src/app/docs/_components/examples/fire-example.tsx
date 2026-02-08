import { Map, MapFire } from "@/registry/map"

export const FireExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-121.606, 39.7596]} zoom={12}>
        <MapFire id="fire-basic" coordinates={[-121.606, 39.7596]} />
      </Map>
    </div>
  )
}
