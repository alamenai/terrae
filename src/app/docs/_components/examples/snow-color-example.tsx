import { Map, MapSnow } from "@/registry/map"

export const SnowColorExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12}>
        <MapSnow id="snow-color" color="#e0f0ff" intensity={1.5} />
      </Map>
    </div>
  )
}
