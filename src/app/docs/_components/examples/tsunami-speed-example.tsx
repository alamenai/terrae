import { Map, MapTsunami } from "@/registry/map"

export const TsunamiSpeedExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[141.2, 38.3]} zoom={8}>
        <MapTsunami
          id="tsunami-fast"
          origin={[141.5, 38.5]}
          target={[140.9, 38.5]}
          speed={1500}
          waveHeight={0.5}
          loop
        />
        <MapTsunami
          id="tsunami-slow"
          origin={[141.5, 38.1]}
          target={[140.9, 38.1]}
          speed={5000}
          waveHeight={0.3}
          loop
        />
      </Map>
    </div>
  )
}
