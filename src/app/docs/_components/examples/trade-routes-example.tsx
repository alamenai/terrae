import { Map, MapLineRadial } from "@/registry/map"

const SHANGHAI: [number, number] = [121.4737, 31.2304]

const DESTINATIONS: Array<[number, number]> = [
  [103.8198, 1.3521],
  [100.5018, 13.7563],
  [106.6297, 10.8231],
  [139.6917, 35.6895],
  [126.978, 37.5665],
  [151.2093, -33.8688],
  [-122.4194, 37.7749],
  [-118.2437, 34.0522],
  [55.2708, 25.2048],
  [3.7038, 40.4168],
  [-0.1276, 51.5074],
  [4.9041, 52.3676],
]

export const TradeRoutesExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[80, 20]} zoom={1} projection="mercator">
        <MapLineRadial
          id="trade-routes"
          origin={SHANGHAI}
          destinations={DESTINATIONS}
          color="#f97316"
          width={2}
          opacity={0.7}
          curvature="auto"
          curveSegments={40}
          duration={2500}
          staggerDelay={300}
          loop
          loopDelay={2000}
          originMarkerColor="#f97316"
          originMarkerPulse
          showDestinationMarkers
          destinationMarkerColor="#fb923c"
        />
      </Map>
    </div>
  )
}
