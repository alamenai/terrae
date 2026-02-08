import { Map, MapExplosion } from "@/registry/map"

export const ExplosionColorsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={11}>
        <MapExplosion
          id="explosion-fire"
          coordinates={[-122.45, 37.78]}
          coreColor="#ffffff"
          outerColor="#ff3300"
          loop
          loopDelay={2000}
        />
        <MapExplosion
          id="explosion-electric"
          coordinates={[-122.42, 37.77]}
          coreColor="#ffffff"
          outerColor="#00ccff"
          loop
          loopDelay={2500}
        />
        <MapExplosion
          id="explosion-magic"
          coordinates={[-122.39, 37.76]}
          coreColor="#ffffff"
          outerColor="#cc00ff"
          loop
          loopDelay={3000}
        />
      </Map>
    </div>
  )
}
