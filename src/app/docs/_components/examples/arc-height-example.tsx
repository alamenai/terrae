import { Map, MapArcAnimated } from "@/registry/map"

const NEW_YORK: [number, number] = [-74.006, 40.7128]
const LONDON: [number, number] = [-0.1276, 51.5074]

export const ArcHeightExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-37, 50]} zoom={0} projection="mercator">
        <MapArcAnimated
          id="high-arc"
          origin={NEW_YORK}
          destination={LONDON}
          color="#8b5cf6"
          width={3}
          height={0.5}
          duration={3000}
          loop
          loopDelay={1000}
        />
      </Map>
    </div>
  )
}
