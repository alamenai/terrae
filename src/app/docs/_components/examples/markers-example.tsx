import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/registry/map";

const locations = [
  {
    id: 1,
    name: "Empire State Building",
    lng: -73.9857,
    lat: 40.7484,
  },
  {
    id: 2,
    name: "Central Park",
    lng: -73.9654,
    lat: 40.7829,
  },
  { id: 3, name: "Times Square", lng: -73.9855, lat: 40.758 },
];

export function MarkersExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.98, 40.76]} zoom={12}>
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            coordinates={[location.lng, location.lat]}
          >
            <MarkerContent>
              <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>{location.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1">
                <p className="font-medium text-foreground">{location.name}</p>
                <p className="text-xs text-muted-foreground">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
