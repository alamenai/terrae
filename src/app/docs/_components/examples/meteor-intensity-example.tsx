import { Map, MapMeteor } from "@/registry/map"

export const MeteorIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-111.5, 35.8]} zoom={8}>
        <MapMeteor id="meteor-light" target={[-112.0, 36.0]} intensity={0.5} loop loopDelay={3000} />
        <MapMeteor id="meteor-normal" target={[-111.5, 35.8]} intensity={1} loop loopDelay={3000} angle={60} />
        <MapMeteor id="meteor-intense" target={[-111.0, 35.6]} intensity={2} loop loopDelay={3000} angle={30} />
      </Map>
    </div>
  )
}
