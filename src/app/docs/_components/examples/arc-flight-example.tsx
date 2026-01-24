import { Map, MapArcAnimated } from "@/registry/map"

const SAN_FRANCISCO: [number, number] = [-122.4194, 37.7749]
const NEW_YORK: [number, number] = [-74.006, 40.7128]

export const ArcFlightExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-98, 38]} zoom={3} projection="mercator">
        <MapArcAnimated
          id="sf-to-ny"
          origin={SAN_FRANCISCO}
          destination={NEW_YORK}
          color="#3b82f6"
          width={3}
          height={0.3}
          duration={2500}
          loop
          loopDelay={1000}
        />
      </Map>
    </div>
  )
}
