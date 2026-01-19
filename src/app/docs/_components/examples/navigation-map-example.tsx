import { Map, navigationMapStyles } from "@/registry/map"

export const NavigationMapExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} styles={navigationMapStyles} center={[-122.4194, 37.7749]} zoom={12} />
    </div>
  )
}
