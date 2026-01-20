import { MapCompare } from "@/registry/map"

export const VerticalCompareExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapCompare
        accessToken={accessToken}
        center={[2.3522, 48.8566]}
        zoom={12}
        orientation="vertical"
        beforeStyle="mapbox://styles/mapbox/streets-v12"
        afterStyle="mapbox://styles/mapbox/satellite-streets-v12"
        showLabels
      />
    </div>
  )
}
