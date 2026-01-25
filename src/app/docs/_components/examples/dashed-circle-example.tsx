import { Map, MapCircle } from "@/registry/map"

export const DashedCircleExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.9857, 40.7484]} zoom={12} projection="mercator">
        <MapCircle
          center={[-73.9857, 40.7484]}
          radius={2000}
          fillColor="#f59e0b"
          fillOpacity={0.2}
          strokeColor="#d97706"
          strokeWidth={2}
          dashArray={[4, 4]}
        />
      </Map>
    </div>
  )
}
