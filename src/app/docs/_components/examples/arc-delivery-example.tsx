import { Map, MapArcAnimated } from "@/registry/map"

const WAREHOUSE: [number, number] = [-0.1276, 51.5074]
const CUSTOMER: [number, number] = [2.3522, 48.8566]

export const ArcDeliveryExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[1.1, 50.2]} zoom={5} projection="mercator">
        <MapArcAnimated
          id="delivery-route"
          origin={WAREHOUSE}
          destination={CUSTOMER}
          color="#10b981"
          width={4}
          height={0.4}
          duration={2000}
          loop
          loopDelay={800}
          markerColor="#10b981"
        />
      </Map>
    </div>
  )
}
