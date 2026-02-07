import { Map, MapAnimatedFootprint } from "@/registry/map"

const center: [number, number] = [-0.1255, 51.5056]

const path: [number, number][] = [
  [-0.1276, 51.5074],
  [-0.1269, 51.5068],
  [-0.1262, 51.5062],
  [-0.1255, 51.5056],
  [-0.1248, 51.505],
  [-0.1241, 51.5044],
  [-0.1234, 51.5038],
]

export const FootprintSizeExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={16}>
        <MapAnimatedFootprint path={path} color="#ef4444" size={48} stepSpacing={60} loop />
      </Map>
    </div>
  )
}
