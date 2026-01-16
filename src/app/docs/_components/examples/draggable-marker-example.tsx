"use client";

import { useState } from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/registry/map";
import { MapPin } from "lucide-react";

export function DraggableMarkerExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const [draggableMarker, setDraggableMarker] = useState({
    lng: -73.98,
    lat: 40.75,
  });

  const handleMarkerDragEnd = (lngLat: { lng: number; lat: number }) => {
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
