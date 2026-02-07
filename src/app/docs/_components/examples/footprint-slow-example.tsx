import { Map, MapAnimatedFootprint } from "@/registry/map"

const center: [number, number] = [-0.1258, 51.5056]

const path: [number, number][] = [
  [-0.1278, 51.5074],
  [-0.1272, 51.5068],
  [-0.1265, 51.5062],
  [-0.1258, 51.5056],
  [-0.1251, 51.505],
  [-0.1244, 51.5044],
  [-0.1237, 51.5038],
]

export const FootprintSlowExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={16}>
        <MapAnimatedFootprint path={path} color="#ec4899" staggerDelay={800} loop />
      </Map>
    </div>
  )
}
