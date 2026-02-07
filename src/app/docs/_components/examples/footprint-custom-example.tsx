import { Map, MapAnimatedFootprint } from "@/registry/map"

const center: [number, number] = [2.2965, 48.8566]

const path: [number, number][] = [
  [2.2945, 48.8584],
  [2.2951, 48.8578],
  [2.2958, 48.8572],
  [2.2965, 48.8566],
  [2.2972, 48.856],
  [2.298, 48.8554],
  [2.2987, 48.8548],
]

export const FootprintCustomExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={16}>
        <MapAnimatedFootprint path={path} color="#f59e0b" stepSpacing={30} loop />
      </Map>
    </div>
  )
}
