"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Minus, Plus, Locate, Maximize, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMap } from "./hooks";

type MapControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type MapControlsProps = {
  children: ReactNode;
  position?: MapControlPosition;
  className?: string;
};

type ControlButtonProps = {
  onClick: () => void;
  label: string;
  children: ReactNode;
  disabled?: boolean;
};

type MapGeolocateProps = {
  onLocate?: (coords: GeolocationCoordinates) => void;
};

type GeolocationCoordinates = {
  longitude: number;
  latitude: number;
};

const DEFAULT_POSITION: MapControlPosition = "bottom-right";
const ZOOM_STEP = 1;
const ZOOM_DURATION = 300;
const GEOLOCATE_ZOOM = 14;
const GEOLOCATE_DURATION = 1500;

const POSITION_CLASSES: Record<MapControlPosition, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};
const DEFAULT_DISABLED = false;
const DEFAULT_GEOLOCATE_PROPS: MapGeolocateProps = {};

const ControlGroup = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border">
      {children}
    </div>
  );
};

const ControlButton = ({
  onClick,
  label,
  children,
  disabled = DEFAULT_DISABLED,
}: ControlButtonProps) => {
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
};

export const MapControls = ({
  children,
  position = DEFAULT_POSITION,
  className,
}: MapControlsProps) => {
  const { isLoaded } = useMap();

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute z-10 flex flex-col gap-1.5",
        POSITION_CLASSES[position],
        className
      )}
    >
      {children}
    </div>
  );
};

export const MapZoom = () => {
  const { map } = useMap();

  const handleZoomIn = () => {
    map?.zoomTo(map.getZoom() + ZOOM_STEP, { duration: ZOOM_DURATION });
  };

  const handleZoomOut = () => {
    map?.zoomTo(map.getZoom() - ZOOM_STEP, { duration: ZOOM_DURATION });
  };

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
};

export const MapOrientation = () => {
  const { map, isLoaded } = useMap();
  const compassRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isLoaded || !map || !compassRef.current) {
      return;
    }

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

  const handleResetBearing = () => {
    map?.resetNorthPitch({ duration: ZOOM_DURATION });
  };

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
};

export const MapGeolocate = ({ onLocate }: MapGeolocateProps = DEFAULT_GEOLOCATE_PROPS) => {
  const { map } = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: GeolocationCoordinates = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          map?.flyTo({
            center: [coords.longitude, coords.latitude],
            zoom: GEOLOCATE_ZOOM,
            duration: GEOLOCATE_DURATION,
          });
          onLocate?.(coords);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <ControlGroup>
      <ControlButton
        onClick={handleLocate}
        label="Find my location"
        disabled={isLocating}
      >
        {isLocating ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Locate className="size-4" />
        )}
      </ControlButton>
    </ControlGroup>
  );
};

export const MapFullscreen = () => {
  const { map } = useMap();

  const handleFullscreen = () => {
    const container = map?.getContainer();
    if (!container) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  return (
    <ControlGroup>
      <ControlButton onClick={handleFullscreen} label="Toggle fullscreen">
        <Maximize className="size-4" />
      </ControlButton>
    </ControlGroup>
  );
};
