import { Map, MapSandstorm } from "@/registry/map"

export const SandstormExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[31.2357, 30.0444]} zoom={10}>
        <MapSandstorm id="sandstorm-basic" />
      </Map>
    </div>
  )
}
