import { Map, MapLineRadial } from "@/registry/map"

const WUHAN: [number, number] = [114.3055, 30.5928]

const DESTINATIONS: Array<[number, number]> = [
  [-122.4194, 37.7749],
  [-74.006, 40.7128],
  [-0.1276, 51.5074],
  [2.3522, 48.8566],
  [139.6917, 35.6895],
  [126.978, 37.5665],
  [103.8198, 1.3521],
  [151.2093, -33.8688],
  [-43.1729, -22.9068],
  [37.6173, 55.7558],
  [28.9784, 41.0082],
  [31.2357, 30.0444],
  [77.209, 28.6139],
  [116.4074, 39.9042],
  [-99.1332, 19.4326],
]

export const CovidSpreadExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[30, 20]} zoom={0.5} projection="mercator">
        <MapLineRadial
          id="covid-spread"
          origin={WUHAN}
          destinations={DESTINATIONS}
          color="#ef4444"
          width={2}
          opacity={0.7}
          curvature={0.4}
          duration={1500}
          staggerDelay={150}
          loop
          loopDelay={2000}
          originMarkerColor="#ef4444"
          originMarkerPulse
          showDestinationMarkers
          destinationMarkerColor="#ef4444"
        />
      </Map>
    </div>
  )
}
