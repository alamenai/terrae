import { Map, MapLightning } from "@/registry/map"

export const LightningExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-95.7129, 37.0902]} zoom={4}>
        <MapLightning id="lightning-basic" coordinates={[-95.7129, 37.0902]} />
      </Map>
    </div>
  )
}
