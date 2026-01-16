import { Map, MapLine } from "@/registry/map";

const route = [
  [-74.006, 40.7128], // NYC City Hall
  [-73.9857, 40.7484], // Empire State Building
  [-73.9772, 40.7527], // Grand Central
  [-73.9654, 40.7829], // Central Park
] as [number, number][];

export function BasicLineExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.98, 40.75]} zoom={11.2}>
        <MapLine coordinates={route} color="#3b82f6" width={4} opacity={0.8} />
      </Map>
    </div>
  );
}
