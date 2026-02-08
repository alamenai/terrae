import { Map, MapLightning } from "@/registry/map"

export const LightningStormExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-95.7129, 37.0902]} zoom={4}>
        <MapLightning id="storm-1" coordinates={[-96.5, 37.5]} strikeInterval={2000} size={250} />
        <MapLightning id="storm-2" coordinates={[-94.8, 36.8]} strikeInterval={2500} size={200} />
        <MapLightning id="storm-3" coordinates={[-95.2, 37.8]} strikeInterval={3000} size={180} />
      </Map>
    </div>
  )
}
