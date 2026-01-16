"use client";

import { Map, MapMarkerAnimated } from "@/registry/map";

export function MultiAnimatedMarkerExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  const routes = [
    {
      id: "vehicle-1",
      coordinates: [
        [-73.9654, 40.7829],
        [-73.9718, 40.7644],
        [-73.9812, 40.7681],
      ] as Array<[number, number]>,
      color: "#ef4444",
      duration: 4000,
    },
    {
      id: "vehicle-2",
      coordinates: [
        [-73.9583, 40.7736],
        [-73.9654, 40.7829],
        [-73.9718, 40.7644],
      ] as Array<[number, number]>,
      color: "#3b82f6",
      duration: 4500,
    },
    {
      id: "vehicle-3",
      coordinates: [
        [-73.9812, 40.7681],
        [-73.9583, 40.7736],
        [-73.9654, 40.7829],
      ] as Array<[number, number]>,
      color: "#10b981",
      duration: 5000,
    },
  ];

  return (
    <div className="h-100 w-full">
      <Map
        accessToken={accessToken}
        center={[-73.9712, 40.7731]}
        zoom={13}
      >
        {routes.map((route) => (
          <MapMarkerAnimated
            key={route.id}
            id={route.id}
            coordinates={route.coordinates}
            color={route.color}
            duration={route.duration}
            showPath
            pathColor={route.color}
          />
        ))}
      </Map>
    </div>
  );
}
