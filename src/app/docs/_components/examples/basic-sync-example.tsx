import { MapSync } from "@/registry/map"

export const BasicSyncExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapSync
        accessToken={accessToken}
        center={[-74.006, 40.7128]}
        zoom={12}
        maps={[
          { style: "mapbox://styles/mapbox/light-v11", label: "Light" },
          { style: "mapbox://styles/mapbox/dark-v11", label: "Dark" },
        ]}
        showLabels
      />
    </div>
  )
}
