import { Map, MapVolcano } from "@/registry/map"

export const VolcanoExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[14.426, 40.821]} zoom={12}>
        <MapVolcano id="volcano-basic" coordinates={[14.426, 40.821]} />
      </Map>
    </div>
  )
}
