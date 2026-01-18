"use client"

import { useEffect, useState } from "react"
import { Map, MapLineAnimated } from "@/registry/map"
import { Bike } from "lucide-react"

type Waypoint = {
  coordinates: [number, number]
  label: string
}

const PARIS_WAYPOINTS: Waypoint[] = [
  { coordinates: [2.3522, 48.8566], label: "Notre-Dame" },
  { coordinates: [2.3376, 48.8606], label: "Louvre" },
  { coordinates: [2.32, 48.8657], label: "Concorde" },
  { coordinates: [2.2945, 48.8584], label: "Eiffel Tower" },
]

const DEFAULT_CENTER: [number, number] = [2.32, 48.86]
const DEFAULT_ZOOM = 13

const formatWaypointsForOSRM = (waypoints: Waypoint[]) => {
  return waypoints
    .map((p) => {
      return p.coordinates.join(",")
    })
    .join(";")
}

const fetchCyclingRoute = async (waypoints: Waypoint[]) => {
  const coords = formatWaypointsForOSRM(waypoints)

  const response = await fetch(
    `https://router.project-osrm.org/route/v1/bike/${coords}?geometries=geojson&overview=full`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch route")
  }

  const data = await response.json()

  if (!data.routes || data.routes.length === 0) {
    throw new Error("No route found")
  }

  const geometry = data.routes[0].geometry

  return geometry.coordinates as [number, number][]
}

export const CyclistRouteExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCyclingRoute(PARIS_WAYPOINTS)
      .then((coordinates) => {
        setRouteCoordinates(coordinates)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load route")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">Loading cycling route...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-destructive text-sm">{error}</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
        {routeCoordinates.length > 0 && (
          <MapLineAnimated
            id="paris-cyclist-route"
            path={routeCoordinates}
            color="#22c55e"
            width={4}
            duration={8000}
            loop
            markerIcon={<Bike className="size-5 text-white" />}
            markerBorderless
          />
        )}
      </Map>
    </div>
  )
}
