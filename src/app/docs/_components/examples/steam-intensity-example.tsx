import { Map, MapSteam } from "@/registry/map"

export const SteamIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapSteam id="steam-light" coordinates={[-122.425, 37.7749]} intensity={0.5} size={80} />
        <MapSteam id="steam-medium" coordinates={[-122.4194, 37.7749]} intensity={1} size={100} />
        <MapSteam id="steam-heavy" coordinates={[-122.4138, 37.7749]} intensity={2} size={140} />
      </Map>
    </div>
  )
}
