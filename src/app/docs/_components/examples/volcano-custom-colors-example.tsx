import { Map, MapVolcano } from "@/registry/map"

export const VolcanoCustomColorsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[14.426, 40.821]} zoom={12}>
        <MapVolcano id="volcano-blue" coordinates={[14.426, 40.821]} lavaColor="#3B82F6" ashColor="#1E3A5F" />
      </Map>
    </div>
  )
}
