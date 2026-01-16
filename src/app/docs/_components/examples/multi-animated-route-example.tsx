import { Map, MapLineAnimated } from "@/registry/map";

export function MultiAnimatedRouteExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  // Multiple delivery routes in NYC
  const routes = [
    {
      id: "route-1",
      coordinates: [
        [-74.006, 40.7128],
        [-74.015, 40.7089],
        [-74.008, 40.7058],
      ] as Array<[number, number]>,
      color: "#3b82f6",
      duration: 3000,
    },
    {
      id: "route-2",
      coordinates: [
        [-73.995, 40.7228],
        [-73.985, 40.7189],
        [-73.978, 40.7158],
      ] as Array<[number, number]>,
      color: "#10b981",
      duration: 3500,
    },
    {
      id: "route-3",
      coordinates: [
        [-74.016, 40.7328],
        [-74.006, 40.7289],
        [-73.996, 40.7258],
      ] as Array<[number, number]>,
      color: "#f59e0b",
      duration: 4000,
    },
  ];

  return (
    <div className="h-100 w-full">
      <Map
        accessToken={accessToken}
        center={[-74.001, 40.719]}
        zoom={12.5}
      >
        {routes.map((route) => (
          <MapLineAnimated
            key={route.id}
            id={route.id}
            coordinates={route.coordinates}
            color={route.color}
            duration={route.duration}
            markerColor={route.color}
          />
        ))}
      </Map>
    </div>
  );
}
