import { Map, MapTsunami } from "@/registry/map"

export const TsunamiColorsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[141.2, 38.3]} zoom={8}>
        <MapTsunami
          id="tsunami-dark"
          origin={[141.5, 38.5]}
          target={[140.9, 38.5]}
          waterColor="#1a3a4a"
          foamColor="#a0d2db"
          loop
        />
        <MapTsunami
          id="tsunami-tropical"
          origin={[141.5, 38.1]}
          target={[140.9, 38.1]}
          waterColor="#00b4d8"
          foamColor="#ffffff"
          loop
          loopDelay={1000}
        />
      </Map>
    </div>
  )
}
