import { Map, MapLightning } from "@/registry/map"

export const LightningColorExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-95.7129, 37.0902]} zoom={4}>
        <MapLightning
          id="lightning-purple"
          coordinates={[-95.7129, 37.0902]}
          boltColor="#a855f7"
          flashColor="#c4b5fd"
          strikeInterval={3000}
        />
      </Map>
    </div>
  )
}
