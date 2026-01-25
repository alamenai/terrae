import { MapSync } from "@/registry/map"

export const VerticalSyncExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapSync
        accessToken={accessToken}
        center={[-122.4194, 37.7749]}
        zoom={13}
        layout="vertical"
        maps={[
          { style: "mapbox://styles/mapbox/streets-v12", label: "Streets" },
          { style: "mapbox://styles/mapbox/satellite-streets-v12", label: "Satellite" },
        ]}
        showLabels
      />
    </div>
  )
}
