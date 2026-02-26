import { Map, MapVolcano } from "@/registry/map"

export const VolcanoLavaSpreadExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[14.426, 40.821]} zoom={12}>
        <MapVolcano
          id="volcano-spread"
          coordinates={[14.426, 40.821]}
          size={300}
          intensity={0.6}
          spread
          spreadSpeed={1500}
          spreadRadius={0.35}
          maxSpreadPoints={8}
        />
      </Map>
    </div>
  )
}
