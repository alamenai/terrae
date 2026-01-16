import { Map, MapMarker, MarkerContent, MarkerPopup, MapLine, MapControls, MapZoom, MapFullscreen } from "@/registry/map";

export function ComparisonMapExample() {
  const route: [number, number][] = [
    [-74.006, 40.7128],
    [-73.9857, 40.7484],
    [-73.9772, 40.7527],
  ];

  return (
    <div className="h-full w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-74.006, 40.7128]}
        zoom={12}
      >
        <MapMarker coordinates={[-74.006, 40.7128]}>
          <MarkerContent>
            <div className="size-8 rounded-full bg-blue-500 shadow-lg" />
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <h3 className="font-semibold">New York City</h3>
              <p className="text-sm text-muted-foreground">The city that never sleeps</p>
            </div>
          </MarkerPopup>
        </MapMarker>

        <MapLine 
          coordinates={route} 
          color="#3b82f6" 
          width={4} 
        />

        <MapControls position="bottom-right">
          <MapZoom />
          <MapFullscreen />
        </MapControls>
      </Map>
    </div>
  );
}
