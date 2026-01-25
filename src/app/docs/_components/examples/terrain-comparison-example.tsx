import { MapSync } from "@/registry/map"

export const TerrainComparisonExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapSync
        accessToken={accessToken}
        center={[-105.2705, 40.015]}
        zoom={11}
        pitch={45}
        layout="grid"
        maps={[
          { style: "mapbox://styles/mapbox/outdoors-v12", label: "Outdoors" },
          { style: "mapbox://styles/mapbox/satellite-streets-v12", label: "Satellite" },
          { style: "mapbox://styles/mapbox/streets-v12", label: "Streets" },
          { style: "mapbox://styles/mapbox/light-v11", label: "Light" },
        ]}
        showLabels
      />
    </div>
  )
}
