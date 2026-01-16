"use client";

import { useState, useEffect, memo } from "react";
import { Map, MapMarker, MarkerContent } from "@/registry/map";
import { Satellite } from "lucide-react";

interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

const ISSInfoPanel = memo(({ position }: { position: ISSPosition | null }) => (
  <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
    <div className="tracking-wider text-[10px] text-muted-foreground uppercase mb-1">
      Space Station
    </div>
    {position ? (
      <>
        <div className="text-xs font-medium mt-1">
          {position.latitude.toFixed(2)}°, {position.longitude.toFixed(2)}°
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </>
    ) : (
      <div className="text-sm text-muted-foreground">Loading...</div>
    )}
  </div>
));
ISSInfoPanel.displayName = "ISSInfoPanel";

const ISSSatelliteMarker = memo(({ position }: { position: ISSPosition }) => (
  <MapMarker coordinates={[position.longitude, position.latitude]}>
    <MarkerContent>
      <div className="relative flex items-center justify-center">
        <div className="absolute rounded-full bg-blue-500/20 size-16 animate-pulse" />
        <div className="relative bg-blue-500 p-2 rounded-full shadow-lg shadow-blue-500/50">
          <Satellite className="size-4 text-white" />
        </div>
      </div>
    </MarkerContent>
  </MapMarker>
));
ISSSatelliteMarker.displayName = "ISSSatelliteMarker";

export function LivePositionMarkerExample() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [initialCenter, setInitialCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await fetch("https://api.open-notify.org/iss-now.json");
        const data = await response.json();
        const newPosition = {
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude),
          timestamp: data.timestamp,
        };

        setIssPosition(newPosition);

        if (!initialCenter) {
          setInitialCenter([newPosition.longitude, newPosition.latitude]);
        }
      } catch (error) {
        console.error("Failed to fetch ISS position:", error);
      }
    };

    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(interval);
  }, [initialCenter]);

  return (
    <div className="w-full h-full relative">
      <ISSInfoPanel position={issPosition} />
      {initialCenter ? (
        <Map
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
          center={initialCenter}
          zoom={1}
          projection="globe"
        >
          {issPosition && <ISSSatelliteMarker position={issPosition} />}
        </Map>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted/20">
          <div className="flex gap-1">
            <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
            <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
            <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      )}
    </div>
  );
}
