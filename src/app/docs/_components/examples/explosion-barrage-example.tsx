import { Map, MapExplosion } from "@/registry/map"

export const ExplosionBarrageExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[34.38, 31.4]} zoom={10}>
        <MapExplosion
          id="barrage-1"
          coordinates={[34.44, 31.5]}
          type="nuclear"
          size={300}
          duration={5000}
          loop
          loopDelay={1500}
        />
        <MapExplosion
          id="barrage-2"
          coordinates={[34.4, 31.45]}
          type="nuclear"
          size={250}
          duration={4500}
          loop
          loopDelay={2500}
        />
        <MapExplosion
          id="barrage-3"
          coordinates={[34.34, 31.35]}
          type="nuclear"
          size={350}
          duration={5500}
          loop
          loopDelay={1000}
        />
        <MapExplosion
          id="barrage-4"
          coordinates={[34.3, 31.3]}
          type="nuclear"
          size={280}
          duration={4000}
          loop
          loopDelay={3000}
        />
        <MapExplosion
          id="barrage-5"
          coordinates={[34.36, 31.4]}
          type="nuclear"
          size={400}
          duration={6000}
          loop
          loopDelay={2000}
        />
      </Map>
    </div>
  )
}
