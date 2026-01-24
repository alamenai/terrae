import { Map, MapLineRadial } from "@/registry/map"

const LOS_ANGELES: [number, number] = [-118.2437, 34.0522]

const DESTINATIONS = [
  { coordinates: [-122.4194, 37.7749] as [number, number], color: "#10b981" },
  { coordinates: [-104.9903, 39.7392] as [number, number], color: "#10b981" },
  { coordinates: [-87.6298, 41.8781] as [number, number], color: "#f59e0b" },
  { coordinates: [-74.006, 40.7128] as [number, number], color: "#f59e0b" },
  { coordinates: [-80.1918, 25.7617] as [number, number], color: "#ef4444" },
  { coordinates: [-149.9003, 61.2181] as [number, number], color: "#8b5cf6" },
  { coordinates: [-157.8583, 21.3069] as [number, number], color: "#8b5cf6" },
]

export const FlightRoutesExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-98, 38]} zoom={2.5} projection="mercator">
        <MapLineRadial
          id="flight-routes"
          origin={LOS_ANGELES}
          destinations={DESTINATIONS}
          color="#3b82f6"
          width={2}
          opacity={0.8}
          dashArray={[2, 2]}
          curvature={0.3}
          duration={1800}
          staggerDelay={250}
          loop
          loopDelay={1500}
          originMarkerColor="#3b82f6"
          originMarkerPulse
          showDestinationMarkers
        />
      </Map>
    </div>
  )
}
