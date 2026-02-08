import { Map, MapExplosion } from "@/registry/map"

export const ExplosionNuclearExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={10}>
        <MapExplosion
          id="explosion-nuclear"
          coordinates={[-122.4194, 37.7749]}
          type="nuclear"
          size={500}
          duration={5000}
          loop
          loopDelay={2000}
        />
      </Map>
    </div>
  )
}
