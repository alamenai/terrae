import { MapCompare } from "@/registry/map"

export const BasicCompareExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapCompare
        accessToken={accessToken}
        center={[-74.006, 40.7128]}
        zoom={12}
        beforeStyle="mapbox://styles/mapbox/light-v11"
        afterStyle="mapbox://styles/mapbox/dark-v11"
        showLabels
      />
    </div>
  )
}
