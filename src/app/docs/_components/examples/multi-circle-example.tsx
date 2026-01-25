import { Map, MapCircle } from "@/registry/map"

export const MultiCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.98, 40.75]} zoom={11} projection="mercator">
        <MapCircle
          center={[-73.9857, 40.7484]}
          radius={1500}
          fillColor="#22c55e"
          fillOpacity={0.4}
          strokeColor="#16a34a"
          strokeWidth={2}
        />
        <MapCircle
          center={[-73.9654, 40.7829]}
          radius={1000}
          fillColor="#8b5cf6"
          fillOpacity={0.4}
          strokeColor="#7c3aed"
          strokeWidth={2}
        />
        <MapCircle
          center={[-74.006, 40.7128]}
          radius={2000}
          fillColor="#ef4444"
          fillOpacity={0.3}
          strokeColor="#dc2626"
          strokeWidth={2}
        />
      </Map>
    </div>
  )
}
