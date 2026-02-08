import { Map, MapFire } from "@/registry/map"

export const FireCustomColorsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-119.2965, 34.462]} zoom={11}>
        <MapFire id="fire-blue" coordinates={[-119.34, 34.48]} baseColor="#00ccff" tipColor="#0066ff" />
        <MapFire id="fire-green" coordinates={[-119.3, 34.46]} baseColor="#66ff66" tipColor="#009900" />
        <MapFire id="fire-purple" coordinates={[-119.26, 34.44]} baseColor="#ff66ff" tipColor="#9900cc" />
      </Map>
    </div>
  )
}
