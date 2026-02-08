import { Map, MapMeteor } from "@/registry/map"

export const MeteorExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-112.4, 36.1]} zoom={10}>
        <MapMeteor id="meteor-basic" target={[-112.4, 36.1]} loop loopDelay={3000} />
      </Map>
    </div>
  )
}
