import { Map, MapVolcano } from "@/registry/map"

export const VolcanoIntensityExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[14.426, 40.821]} zoom={11}>
        <MapVolcano id="volcano-low" coordinates={[14.376, 40.821]} intensity={0.2} size={150} />
        <MapVolcano id="volcano-medium" coordinates={[14.426, 40.821]} intensity={0.5} size={200} />
        <MapVolcano id="volcano-high" coordinates={[14.476, 40.821]} intensity={0.9} size={250} />
      </Map>
    </div>
  )
}
