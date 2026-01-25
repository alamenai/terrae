import { Map, MapAnimatedCircle } from "@/registry/map"

export const FillOnlyAnimatedCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapAnimatedCircle
          id="fill-only-circle"
          center={[-73.9857, 40.7484]}
          radius={2000}
          strokeColor="#22c55e"
          fillColor="#22c55e"
          fillOpacity={0.5}
          animationMode="fill"
          fillDuration={1000}
        />
      </Map>
    </div>
  )
}
