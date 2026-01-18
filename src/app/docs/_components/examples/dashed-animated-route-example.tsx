import { Map, MapLineAnimated } from "@/registry/map"

export const DashedAnimatedRouteExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const path: Array<[number, number]> = [
    [-122.4194, 37.7749],
    [-122.4094, 37.7849],
    [-122.3994, 37.7749],
    [-122.3894, 37.7849],
    [-122.3794, 37.7749],
  ]

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.3994, 37.7799]} zoom={13}>
        <MapLineAnimated
          id="dashed-route"
          path={path}
          color="#8b5cf6"
          width={4}
          dashArray={[2, 4]}
          duration={4000}
          loop
          markerColor="#8b5cf6"
        />
      </Map>
    </div>
  )
}
