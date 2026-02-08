import { Map } from "@/registry/map"

export function GlobeMapExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[0, 20]} zoom={1.5} projection="globe" />
    </div>
  )
}
