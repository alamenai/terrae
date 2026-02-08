import { Map, MapFire } from "@/registry/map"

export const FireSpreadExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-122.7141, 38.4404]} zoom={11} pitch={45}>
        <MapFire
          id="fire-spread-1"
          coordinates={[-122.76, 38.46]}
          size={250}
          intensity={1.2}
          spread
          spreadSpeed={1000}
          spreadRadius={0.6}
          maxSpreadPoints={8}
        />
        <MapFire
          id="fire-spread-2"
          coordinates={[-122.68, 38.42]}
          size={200}
          intensity={1}
          spread
          spreadSpeed={1200}
          spreadRadius={0.5}
          maxSpreadPoints={6}
        />
        <MapFire
          id="fire-spread-3"
          coordinates={[-122.72, 38.41]}
          size={180}
          intensity={0.8}
          spread
          spreadSpeed={1500}
          spreadRadius={0.4}
          maxSpreadPoints={5}
        />
      </Map>
    </div>
  )
}
