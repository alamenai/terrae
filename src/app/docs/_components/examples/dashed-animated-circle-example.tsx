import { Map, MapAnimatedCircle } from "@/registry/map"

export const DashedAnimatedCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapAnimatedCircle
          id="dashed-circle"
          center={[-73.9857, 40.7484]}
          radius={2000}
          strokeColor="#f59e0b"
          strokeWidth={2}
          strokeDashArray={[4, 4]}
          duration={2000}
          loop
          loopDelay={500}
        />
      </Map>
    </div>
  )
}
