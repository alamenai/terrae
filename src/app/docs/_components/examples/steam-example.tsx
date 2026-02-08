import { Map, MapSteam } from "@/registry/map"

export const SteamExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapSteam id="steam-basic" coordinates={[-122.4194, 37.7749]} />
      </Map>
    </div>
  )
}
