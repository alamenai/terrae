"use client"

import { useState } from "react"
import { Map } from "@/registry/map"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export const CustomLoaderExample = () => {
  const [showLoader, setShowLoader] = useState(true)
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  const handleShowMap = () => {
    setShowLoader(false)
  }

  return (
    <div className="h-full w-full">
      <Map
        accessToken={accessToken}
        center={[-122.4194, 37.7749]}
        zoom={12}
        showLoader={showLoader}
        loader={
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-16 animate-ping rounded-full bg-primary/20" />
              <div className="absolute size-12 animate-pulse rounded-full bg-primary/30" />
              <div className="relative flex size-10 items-center justify-center rounded-full bg-primary shadow-lg">
                <MapPin className="size-5 text-primary-foreground" />
              </div>
            </div>
            <Button
              onClick={handleShowMap}
              variant="outline"
              size="sm"
              className="absolute bottom-4 right-4 cursor-pointer rounded-full"
              aria-label="Show the map"
            >
              Show Map
            </Button>
          </div>
        }
      />
    </div>
  )
}
