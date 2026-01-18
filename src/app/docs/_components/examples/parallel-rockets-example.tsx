"use client"

import { Map, MapLineAnimated } from "@/registry/map"
import { Rocket } from "lucide-react"

export const ParallelRocketsExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const rocketIconStyle = { filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))" }

  // Four parallel routes going in the same direction (west to east)
  const routes = [
    {
      id: "rocket-1",
      path: [
        [-122.5, 37.77],
        [-122.45, 37.77],
        [-122.4, 37.77],
        [-122.35, 37.77],
      ] as Array<[number, number]>,
      color: "#ef4444",
      duration: 3000,
      icon: <Rocket className="size-6 text-red-500 rotate-45" style={rocketIconStyle} />,
    },
    {
      id: "rocket-2",
      path: [
        [-122.5, 37.775],
        [-122.45, 37.775],
        [-122.4, 37.775],
        [-122.35, 37.775],
      ] as Array<[number, number]>,
      color: "#3b82f6",
      duration: 3200,
      icon: <Rocket className="size-6 text-blue-500 rotate-45" style={rocketIconStyle} />,
    },
    {
      id: "rocket-3",
      path: [
        [-122.5, 37.78],
        [-122.45, 37.78],
        [-122.4, 37.78],
        [-122.35, 37.78],
      ] as Array<[number, number]>,
      color: "#10b981",
      duration: 3400,
      icon: <Rocket className="size-6 text-emerald-500 rotate-45" style={rocketIconStyle} />,
    },
    {
      id: "rocket-4",
      path: [
        [-122.5, 37.785],
        [-122.45, 37.785],
        [-122.4, 37.785],
        [-122.35, 37.785],
      ] as Array<[number, number]>,
      color: "#f59e0b",
      duration: 3600,
      icon: <Rocket className="size-6 text-amber-500 rotate-45" style={rocketIconStyle} />,
    },
  ]

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.425, 37.7775]} zoom={12}>
        {routes.map((route) => (
          <MapLineAnimated
            key={route.id}
            id={route.id}
            path={route.path}
            color={route.color}
            width={4}
            duration={route.duration}
            markerColor="transparent"
            markerIcon={route.icon}
          />
        ))}
      </Map>
    </div>
  )
}
