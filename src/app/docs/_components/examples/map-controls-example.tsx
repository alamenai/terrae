import { Map, MapControls, MapZoom, MapOrientation, MapGeolocate, MapFullscreen } from "@/registry/map"

export function MapControlsExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={11}>
        <MapControls position="bottom-right">
          <MapZoom />
          <MapOrientation />
          <MapGeolocate />
          <MapFullscreen />
        </MapControls>
      </Map>
    </div>
  )
}
