import { Map, MapExplosion } from "@/registry/map"

export const ExplosionExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={12}>
        <MapExplosion id="explosion-basic" coordinates={[-122.4194, 37.7749]} duration={4000} loop loopDelay={2000} />
      </Map>
    </div>
  )
}
