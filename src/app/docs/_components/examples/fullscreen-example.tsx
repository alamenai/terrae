import { Map, MapControls, MapFullscreen } from "@/registry/map"

export function FullscreenControlExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[2.3522, 48.8566]} zoom={11}>
        <MapControls position="top-right">
          <MapFullscreen />
        </MapControls>
      </Map>
    </div>
  )
}
