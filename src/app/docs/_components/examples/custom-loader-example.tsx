import { Map } from "@/registry/map"
import { Loader2 } from "lucide-react"

export const CustomLoaderExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map
        accessToken={accessToken}
        center={[-122.4194, 37.7749]}
        zoom={12}
        loader={
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="size-8 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        }
      />
    </div>
  )
}
