import { Map } from "@/registry/map"
import { standardMapStyles } from "@/registry/map/types"

export const StandardMapExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.4194, 37.7749]} zoom={14} styles={standardMapStyles} />
    </div>
  )
}
