import { Map, MapAnimatedCircle } from "@/registry/map"

export const LoopingAnimatedCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapAnimatedCircle
          id="looping-circle"
          center={[-73.9857, 40.7484]}
          radius={2000}
          strokeColor="#8b5cf6"
          fillColor="#8b5cf6"
          fillOpacity={0.4}
          duration={2000}
          fillDuration={800}
          loop
          loopDelay={1000}
        />
      </Map>
    </div>
  )
}
