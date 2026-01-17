"use client";

import { useState } from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/registry/map";
import type { LngLatCoordinates } from "@/registry/map/types";
import { MapPin } from "lucide-react";

const DEFAULT_MARKER_POSITION: LngLatCoordinates = {
  lng: -73.98,
  lat: 40.75,
};

export function DraggableMarkerExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const [draggableMarker, setDraggableMarker] = useState<LngLatCoordinates>(DEFAULT_MARKER_POSITION);

  const handleMarkerDragEnd = (lngLat: LngLatCoordinates) => {
    setDraggableMarker({ lng: lngLat.lng, lat: lngLat.lat });
  };

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-73.98, 40.76]} zoom={12}>
        <MapMarker
          draggable
          coordinates={[draggableMarker.lng, draggableMarker.lat]}
          onDragEnd={handleMarkerDragEnd}
        >
          <MarkerContent>
            <div className="cursor-move">
              <MapPin
                className="fill-black stroke-white dark:fill-white"
                size={28}
              />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Coordinates</p>
              <p className="text-xs text-muted-foreground">
                {draggableMarker.lat.toFixed(4)},{" "}
                {draggableMarker.lng.toFixed(4)}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  );
}
