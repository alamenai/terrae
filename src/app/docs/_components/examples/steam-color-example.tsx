import { Map, MapSteam } from "@/registry/map"

export const SteamColorExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapSteam id="steam-white" coordinates={[-122.425, 37.7749]} color="#ffffff" />
        <MapSteam id="steam-yellow" coordinates={[-122.4194, 37.7749]} color="#fef08a" />
        <MapSteam id="steam-green" coordinates={[-122.4138, 37.7749]} color="#86efac" />
      </Map>
    </div>
  )
}
