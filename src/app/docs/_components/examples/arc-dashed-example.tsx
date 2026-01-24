import { Map, MapArcAnimated } from "@/registry/map"

const SYDNEY: [number, number] = [151.2093, -33.8688]
const DUBAI: [number, number] = [55.2708, 25.2048]

export const ArcDashedExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[100, -5]} zoom={2} projection="mercator">
        <MapArcAnimated
          id="dashed-arc"
          origin={SYDNEY}
          destination={DUBAI}
          color="#f59e0b"
          width={3}
          dashArray={[4, 4]}
          height={0.35}
          duration={2500}
          loop
          loopDelay={1000}
          markerColor="#f59e0b"
        />
      </Map>
    </div>
  )
}
