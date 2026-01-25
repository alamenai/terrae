import { Map, MapCircle } from "@/registry/map"

export const OutlineCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapCircle center={[-73.9857, 40.7484]} radius={2000} fillOpacity={0} strokeColor="#ef4444" strokeWidth={3} />
      </Map>
    </div>
  )
}
