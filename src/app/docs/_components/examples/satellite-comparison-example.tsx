import { MapSync } from "@/registry/map"

export const SatelliteComparisonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapSync
        accessToken={accessToken}
        center={[-73.9857, 40.7484]}
        zoom={16}
        maps={[
          { style: "mapbox://styles/mapbox/satellite-v9", label: "Satellite" },
          { style: "mapbox://styles/mapbox/satellite-streets-v12", label: "Satellite + Streets" },
        ]}
        showLabels
      />
    </div>
  )
}
