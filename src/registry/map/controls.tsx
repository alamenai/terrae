"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Minus, Plus, Locate, Maximize, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMap } from "./hooks";

type MapControlsProps = {
  /** Position of the controls on the map (default: "bottom-right") */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Control components (MapZoom, MapOrientation, MapGeolocate, MapFullscreen) */
  children: ReactNode;
  /** Additional CSS classes for the controls container */
  className?: string;
};

const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};

function ControlGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border">
      {children}
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  children,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      type="button"
      className={cn(
        "flex items-center justify-center size-10 md:size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function MapControls({
  position = "bottom-right",
  children,
  className,
}: MapControlsProps) {
  const { isLoaded } = useMap();

  if (!isLoaded) return null;

  return (
    <div
      className={cn(
        "absolute z-10 flex flex-col gap-1.5",
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  );
}

export function MapZoom() {
  const { map } = useMap();

  const handleZoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);

  return (
    <ControlGroup>
      <ControlButton onClick={handleZoomIn} label="Zoom in">
        <Plus className="size-4" />
      </ControlButton>
      <ControlButton onClick={handleZoomOut} label="Zoom out">
        <Minus className="size-4" />
      </ControlButton>
    </ControlGroup>
  );
}

export function MapOrientation() {
  const { map, isLoaded } = useMap();
  const compassRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isLoaded || !map || !compassRef.current) return;

    const compass = compassRef.current;

    const updateRotation = () => {
      const bearing = map.getBearing();
      const pitch = map.getPitch();
      compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`;
    };

    map.on("rotate", updateRotation);
    map.on("pitch", updateRotation);
    updateRotation();

    return () => {
      map.off("rotate", updateRotation);
      map.off("pitch", updateRotation);
    };
  }, [isLoaded, map]);

  const handleResetBearing = useCallback(() => {
    map?.resetNorthPitch({ duration: 300 });
  }, [map]);

  return (
    <ControlGroup>
      <ControlButton onClick={handleResetBearing} label="Reset bearing to north">
        <svg
          ref={compassRef}
          viewBox="0 0 24 24"
          className="size-5 transition-transform duration-200"
          style={{ transformStyle: "preserve-3d" }}
        >
          <path d="M12 2L16 12H12V2Z" className="fill-red-500" />
          <path d="M12 2L8 12H12V2Z" className="fill-red-300" />
          <path d="M12 22L16 12H12V22Z" className="fill-muted-foreground/60" />
          <path d="M12 22L8 12H12V22Z" className="fill-muted-foreground/30" />
        </svg>
      </ControlButton>
    </ControlGroup>
  );
}

type MapGeolocateProps = {
  /** Callback with user coordinates when located */
  onLocate?: (coords: { longitude: number; latitude: number }) => void;
};

export function MapGeolocate({ onLocate }: MapGeolocateProps = {}) {
  const { map } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);

  const handleLocate = useCallback(() => {
    setWaitingForLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          map?.flyTo({
            center: [coords.longitude, coords.latitude],
            zoom: 14,
            duration: 1500,
          });
          onLocate?.(coords);
          setWaitingForLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setWaitingForLocation(false);
        }
      );
    }
  }, [map, onLocate]);

  return (
    <ControlGroup>
      <ControlButton
        onClick={handleLocate}
        label="Find my location"
        disabled={waitingForLocation}
      >
        {waitingForLocation ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Locate className="size-4" />
        )}
      </ControlButton>
    </ControlGroup>
  );
}

export function MapFullscreen() {
  const { map } = useMap();

  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [map]);

  return (
    <ControlGroup>
      <ControlButton onClick={handleFullscreen} label="Toggle fullscreen">
        <Maximize className="size-4" />
      </ControlButton>
    </ControlGroup>
  );
}
