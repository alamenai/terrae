import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapLine,
} from "@/registry/map";

const route = [
  [-74.006, 40.7128], // NYC City Hall
  [-73.9857, 40.7484], // Empire State Building
  [-73.9772, 40.7527], // Grand Central
  [-73.9654, 40.7829], // Central Park
] as [number, number][];

const stops = [
  { name: "City Hall", lng: -74.006, lat: 40.7128 },
  { name: "Empire State Building", lng: -73.9857, lat: 40.7484 },
  { name: "Grand Central Terminal", lng: -73.9772, lat: 40.7527 },
  { name: "Central Park", lng: -73.9654, lat: 40.7829 },
];

export function RouteExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.98, 40.75]} zoom={11.2}>
        <MapLine coordinates={route} color="#3b82f6" width={4} opacity={0.8} />

        {stops.map((stop, index) => (
          <MapMarker key={stop.name} coordinates={[stop.lng, stop.lat]}>
            <MarkerContent>
              <div className="size-4.5 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-semibold">
                {index + 1}
              </div>
            </MarkerContent>
            <MarkerTooltip>{stop.name}</MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
