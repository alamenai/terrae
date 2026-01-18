import { Map, MapLineAnimated } from "@/registry/map"

export const BasicAnimatedRouteExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  // Route coordinates (Central Park, NYC)
  const route: Array<[number, number]> = [
    [-73.9654, 40.7829],
    [-73.9718, 40.7644],
    [-73.9812, 40.7681],
    [-73.9583, 40.7736],
    [-73.9654, 40.7829],
  ]

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9712, 40.7731]} zoom={13}>
        <MapLineAnimated id="basic-route" path={route} duration={3000} />
      </Map>
    </div>
  )
}
