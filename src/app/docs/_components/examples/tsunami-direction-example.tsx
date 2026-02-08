import { Map, MapTsunami } from "@/registry/map"

export const TsunamiDirectionExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[141.0, 38.3]} zoom={7}>
        <MapTsunami id="tsunami-west" origin={[141.6, 38.6]} target={[140.8, 38.6]} size={250} loop loopDelay={500} />
        <MapTsunami
          id="tsunami-southwest"
          origin={[141.6, 38.2]}
          target={[140.8, 38.0]}
          size={250}
          loop
          loopDelay={1500}
        />
      </Map>
    </div>
  )
}
