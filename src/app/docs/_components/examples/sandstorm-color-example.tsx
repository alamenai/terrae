import { Map, MapSandstorm } from "@/registry/map"

export const SandstormColorExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[31.2357, 30.0444]} zoom={10}>
        <MapSandstorm id="sandstorm-color" color="#8b4513" visibility={0.4} />
      </Map>
    </div>
  )
}
