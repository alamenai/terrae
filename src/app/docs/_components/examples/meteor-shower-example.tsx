import { Map, MapMeteor } from "@/registry/map"

export const MeteorShowerExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-111.0, 35.5]} zoom={8}>
        <MapMeteor id="meteor-shower" target={[-111.0, 35.5]} shower showerCount={8} loop loopDelay={2000} size={400} />
      </Map>
    </div>
  )
}
