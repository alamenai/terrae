import { MapCompare } from "@/registry/map";

export function StyleCompareExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <MapCompare
        accessToken={accessToken}
        center={[-122.4194, 37.7749]}
        zoom={13}
        beforeStyle="mapbox://styles/mapbox/streets-v12"
        afterStyle="mapbox://styles/mapbox/satellite-streets-v12"
      />
    </div>
  );
}
