import { Map, MapTsunami } from "@/registry/map"

export const TsunamiExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[141.2, 38.3]} zoom={8}>
        <MapTsunami id="tsunami-basic" origin={[141.5, 38.3]} target={[140.9, 38.3]} loop />
      </Map>
    </div>
  )
}
