import { Map, MapAnimatedFootprint } from "@/registry/map"

const center: [number, number] = [-73.9838, 40.7468]

const path: [number, number][] = [
  [-73.9857, 40.7484],
  [-73.9851, 40.7479],
  [-73.9845, 40.7473],
  [-73.9838, 40.7468],
  [-73.9831, 40.7462],
  [-73.9824, 40.7456],
  [-73.9817, 40.745],
  [-73.981, 40.7444],
]

export const FootprintExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={16}>
        <MapAnimatedFootprint path={path} color="#8b5cf6" size={18} loop />
      </Map>
    </div>
  )
}
