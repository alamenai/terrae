import { Map, MapAnimatedCircle } from "@/registry/map"

export const BasicAnimatedCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapAnimatedCircle
          id="basic-circle"
          center={[-73.9857, 40.7484]}
          radius={2000}
          strokeColor="#3b82f6"
          duration={2000}
        />
      </Map>
    </div>
  )
}
