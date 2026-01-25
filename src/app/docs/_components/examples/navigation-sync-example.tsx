import { MapSync } from "@/registry/map"

export const NavigationSyncExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <MapSync
        accessToken={accessToken}
        center={[-118.2437, 34.0522]}
        zoom={14}
        maps={[
          { style: "mapbox://styles/mapbox/navigation-day-v1", label: "Day Navigation" },
          { style: "mapbox://styles/mapbox/navigation-night-v1", label: "Night Navigation" },
        ]}
        showLabels
      />
    </div>
  )
}
