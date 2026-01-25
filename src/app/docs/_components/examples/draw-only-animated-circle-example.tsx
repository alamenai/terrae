import { Map, MapAnimatedCircle } from "@/registry/map"

export const DrawOnlyAnimatedCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapAnimatedCircle
          id="draw-only-circle"
          center={[-73.9857, 40.7484]}
          radius={2000}
          strokeColor="#ef4444"
          strokeWidth={3}
          duration={2000}
          loop
          loopDelay={500}
        />
      </Map>
    </div>
  )
}
