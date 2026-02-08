"use client"

import { useEffect, useState } from "react"
import { Map, MapLine, MapMarker } from "@/registry/map"

const waypoints = [
  { coordinates: [-74.006, 40.7128], label: "Start" },
  { coordinates: [-73.9857, 40.7484], label: "Waypoint" },
  { coordinates: [-73.9654, 40.7829], label: "End" },
]

export function OSRMRouteExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        // Format coordinates for OSRM API (lon,lat;lon,lat;...)
        const coords = waypoints.map((p) => p.coordinates.join(",")).join(";")

        // Call OSRM routing service
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson&overview=full`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch route")
        }

        const data = await response.json()

        if (data.routes && data.routes.length > 0) {
          // Extract coordinates from the route geometry
          const geometry = data.routes[0].geometry
          const coordinates = geometry.coordinates as [number, number][]
          setRouteCoordinates(coordinates)
        } else {
          setError("No route found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load route")
      } finally {
        setLoading(false)
      }
    }

    fetchRoute()
  }, [])

  return (
    <div className="h-full w-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-white">Loading route...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-red-400">{error}</div>
        </div>
      )}
      <Map accessToken={accessToken} center={[-73.98, 40.75]} zoom={11.2}>
        {/* Display the calculated route */}
        {routeCoordinates.length > 0 && (
          <MapLine coordinates={routeCoordinates} color="#3b82f6" width={4} opacity={0.8} />
        )}

        {/* Display waypoints */}
        {waypoints.map((waypoint, index) => (
          <MapMarker key={index} coordinates={waypoint.coordinates as [number, number]}>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
              {index + 1}
            </div>
          </MapMarker>
        ))}
      </Map>
    </div>
  )
}
