import { Map, MapMeteor } from "@/registry/map"

export const MeteorColorsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-111.5, 35.8]} zoom={8}>
        <MapMeteor
          id="meteor-ice"
          target={[-112.0, 36.0]}
          meteorColor="#00ccff"
          trailColor="#0088cc"
          impactColor="#00ffff"
          loop
          loopDelay={4000}
        />
        <MapMeteor
          id="meteor-green"
          target={[-111.0, 35.6]}
          meteorColor="#00ff88"
          trailColor="#00cc66"
          impactColor="#88ff88"
          loop
          loopDelay={4000}
          angle={200}
        />
      </Map>
    </div>
  )
}
