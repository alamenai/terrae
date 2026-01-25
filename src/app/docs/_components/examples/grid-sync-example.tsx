import { MapSync } from "@/registry/map"

export const GridSyncExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapSync
        accessToken={accessToken}
        center={[2.3522, 48.8566]}
        zoom={12}
        layout="grid"
        maps={[
          { style: "mapbox://styles/mapbox/light-v11", label: "Light" },
          { style: "mapbox://styles/mapbox/dark-v11", label: "Dark" },
          { style: "mapbox://styles/mapbox/streets-v12", label: "Streets" },
          { style: "mapbox://styles/mapbox/satellite-streets-v12", label: "Satellite" },
        ]}
        showLabels
      />
    </div>
  )
}
