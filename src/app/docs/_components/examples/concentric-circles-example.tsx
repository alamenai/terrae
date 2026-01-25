import { Map, MapCircle } from "@/registry/map"

export const ConcentricCirclesExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const center: [number, number] = [-73.9857, 40.7484]

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={center} zoom={11} projection="mercator">
        <MapCircle
          center={center}
          radius={4000}
          fillColor="#ef4444"
          fillOpacity={0.2}
          strokeColor="#dc2626"
          strokeWidth={2}
        />
        <MapCircle
          center={center}
          radius={2500}
          fillColor="#f97316"
          fillOpacity={0.3}
          strokeColor="#ea580c"
          strokeWidth={2}
        />
        <MapCircle
          center={center}
          radius={1000}
          fillColor="#22c55e"
          fillOpacity={0.4}
          strokeColor="#16a34a"
          strokeWidth={2}
        />
      </Map>
    </div>
  )
}
