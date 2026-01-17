"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMap } from "./hooks";
import type { MapCoordinates } from "./types";

type MarkerContextValue = {
  markerRef: React.RefObject<mapboxgl.Marker | null>;
  markerElementRef: React.RefObject<HTMLDivElement | null>;
  map: mapboxgl.Map | null;
  isReady: boolean;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

type MapMarkerProps = {
  /** Coordinates [longitude, latitude] for marker position */
  coordinates: MapCoordinates;
  /** Marker subcomponents (MarkerContent, MarkerPopup, MarkerTooltip, MarkerLabel) */
  children: ReactNode;
  /** Callback when symbol is clicked */
  onClick?: (e: MouseEvent) => void;
  /** Callback when mouse enters symbol */
  onMouseEnter?: (e: MouseEvent) => void;
  /** Callback when mouse leaves symbol */
  onMouseLeave?: (e: MouseEvent) => void;
  /** Callback when symbol drag starts (requires draggable: true) */
  onDragStart?: (lngLat: { lng: number; lat: number }) => void;
  /** Callback during symbol drag (requires draggable: true) */
  onDrag?: (lngLat: { lng: number; lat: number }) => void;
  /** Callback when symbol drag ends (requires draggable: true) */
  onDragEnd?: (lngLat: { lng: number; lat: number }) => void;
  /** Enable symbol dragging */
  draggable?: boolean;
  /** Offset for the symbol [x, y] */
  offset?: [number, number];
  /** Rotation of the symbol in degrees */
  rotation?: number;
  /** Rotation alignment */
  rotationAlignment?: "map" | "viewport" | "auto";
  /** Pitch alignment */
  pitchAlignment?: "map" | "viewport" | "auto";
};

export function MapMarker({
  coordinates,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDrag,
  onDragEnd,
  draggable = false,
  offset,
  rotation,
  rotationAlignment,
  pitchAlignment,
}: MapMarkerProps) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const markerElementRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleClickCallback = useCallback((e: MouseEvent) => onClick?.(e), [onClick]);
  const handleMouseEnterCallback = useCallback((e: MouseEvent) => onMouseEnter?.(e), [onMouseEnter]);
  const handleMouseLeaveCallback = useCallback((e: MouseEvent) => onMouseLeave?.(e), [onMouseLeave]);
  const handleDragStartCallback = useCallback(() => {
    const lngLat = markerRef.current?.getLngLat();
    if (lngLat) onDragStart?.({ lng: lngLat.lng, lat: lngLat.lat });
  }, [onDragStart]);
  const handleDragCallback = useCallback(() => {
    const lngLat = markerRef.current?.getLngLat();
    if (lngLat) onDrag?.({ lng: lngLat.lng, lat: lngLat.lat });
  }, [onDrag]);
  const handleDragEndCallback = useCallback(() => {
    const lngLat = markerRef.current?.getLngLat();
    if (lngLat) onDragEnd?.({ lng: lngLat.lng, lat: lngLat.lat });
  }, [onDragEnd]);

  useEffect(() => {
    if (!map || !isLoaded || !map.getContainer?.() || !map.getCanvasContainer?.()) {
      return;
    }

    const container = document.createElement("div");
    markerElementRef.current = container;

    const marker = new mapboxgl.Marker({
      element: container,
      draggable,
      offset,
      rotation,
      rotationAlignment,
      pitchAlignment,
    })
      .setLngLat(coordinates)
      .addTo(map);

    markerRef.current = marker;

    container.addEventListener("click", handleClickCallback);
    container.addEventListener("mouseenter", handleMouseEnterCallback);
    container.addEventListener("mouseleave", handleMouseLeaveCallback);

    marker.on("dragstart", handleDragStartCallback);
    marker.on("drag", handleDragCallback);
    marker.on("dragend", handleDragEndCallback);

    setIsReady(true);

    return () => {
      container.removeEventListener("click", handleClickCallback);
      container.removeEventListener("mouseenter", handleMouseEnterCallback);
      container.removeEventListener("mouseleave", handleMouseLeaveCallback);

      marker.off("dragstart", handleDragStartCallback);
      marker.off("drag", handleDragCallback);
      marker.off("dragend", handleDragEndCallback);

      marker.remove();
      markerRef.current = null;
      markerElementRef.current = null;
      setIsReady(false);
    };
  }, [map, isLoaded, draggable, offset, rotation, rotationAlignment, pitchAlignment, handleClickCallback, handleMouseEnterCallback, handleMouseLeaveCallback, handleDragStartCallback, handleDragCallback, handleDragEndCallback]);

  useEffect(() => {
    markerRef.current?.setLngLat(coordinates);
  }, [coordinates]);

  useEffect(() => {
    markerRef.current?.setDraggable(draggable);
  }, [draggable]);

  return (
    <MarkerContext.Provider
      value={{ markerRef, markerElementRef, map, isReady }}
    >
      {children}
    </MarkerContext.Provider>
  );
}

type MarkerContentProps = {
  /** Custom symbol content. Defaults to a blue dot if not provided */
  children?: ReactNode;
  /** Additional CSS classes for the symbol container */
  className?: string;
};

function DefaultMarkerIcon() {
  return (
    <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
  );
}

export function MarkerContent({ children, className }: MarkerContentProps) {
  const { markerElementRef, isReady } = useMarkerContext();

  if (!isReady || !markerElementRef.current) return null;

  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>
      {children || <DefaultMarkerIcon />}
    </div>,
    markerElementRef.current
  );
}

type MarkerPopupProps = {
  /** Popup content */
  children: ReactNode;
  /** Additional CSS classes for the popup container */
  className?: string;
  /** Show a close button in the popup (default: false) */
  closeButton?: boolean;
  /** Offset for the popup [x, y] */
  offset?: number | [number, number];
  /** Maximum width of the popup */
  maxWidth?: string;
};

export function MarkerPopup({
  children,
  className,
  closeButton = false,
  offset = 16,
  maxWidth,
}: MarkerPopupProps) {
  const { markerRef, isReady } = useMarkerContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isReady || !markerRef.current) return;

    const container = document.createElement("div");
    containerRef.current = container;

    const popup = new mapboxgl.Popup({
      offset,
      closeButton: false,
      className: "custom-mapbox-popup",
    })
      .setMaxWidth(maxWidth || "none")
      .setDOMContent(container);

    popupRef.current = popup;
    markerRef.current.setPopup(popup);
    setMounted(true);

    return () => {
      popup.remove();
      popupRef.current = null;
      containerRef.current = null;
      setMounted(false);
    };
  }, [isReady, offset, maxWidth]);

  const handleClose = () => popupRef.current?.remove();

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <div
      className={cn(
        "relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {closeButton && (
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-1 right-1 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </div>,
    containerRef.current
  );
}

type MarkerTooltipProps = {
  /** Tooltip content */
  children: ReactNode;
  /** Additional CSS classes for the tooltip container */
  className?: string;
  /** Offset for the tooltip [x, y] */
  offset?: number | [number, number];
  /** Maximum width of the tooltip */
  maxWidth?: string;
};

export function MarkerTooltip({
  children,
  className,
  offset = 16,
  maxWidth,
}: MarkerTooltipProps) {
  const { markerRef, markerElementRef, map, isReady } = useMarkerContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isReady || !markerRef.current || !markerElementRef.current || !map)
      return;

    const container = document.createElement("div");
    containerRef.current = container;

    const popup = new mapboxgl.Popup({
      offset,
      closeOnClick: true,
      closeButton: false,
      className: "custom-mapbox-popup",
    })
      .setMaxWidth(maxWidth || "none")
      .setDOMContent(container);

    popupRef.current = popup;

    const markerElement = markerElementRef.current;
    const marker = markerRef.current;

    const handleMouseEnter = () => {
      popup.setLngLat(marker.getLngLat()).addTo(map);
    };
    const handleMouseLeave = () => popup.remove();

    markerElement.addEventListener("mouseenter", handleMouseEnter);
    markerElement.addEventListener("mouseleave", handleMouseLeave);
    setMounted(true);

    return () => {
      markerElement.removeEventListener("mouseenter", handleMouseEnter);
      markerElement.removeEventListener("mouseleave", handleMouseLeave);
      popup.remove();
      popupRef.current = null;
      containerRef.current = null;
      setMounted(false);
    };
  }, [isReady, map, offset, maxWidth]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <div
      className={cn(
        "rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {children}
    </div>,
    containerRef.current
  );
}

type MarkerLabelProps = {
  /** Label text content */
  children: ReactNode;
  /** Additional CSS classes for the label */
  className?: string;
  /** Position of the label relative to the symbol (default: "top") */
  position?: "top" | "bottom";
};

export function MarkerLabel({
  children,
  className,
  position = "top",
}: MarkerLabelProps) {
  const positionClasses = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1",
  };

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
        "text-[10px] font-medium text-foreground",
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  );
}

type MarkerAvatarProps = {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** Size of the avatar in pixels (default: 40) */
  size?: number;
  /** Show online status indicator */
  online?: boolean;
  /** Status indicator color (default: "green" for online) */
  statusColor?: "green" | "red" | "yellow" | "blue";
  /** Additional CSS classes for the avatar container */
  className?: string;
};

export function MarkerAvatar({
  src,
  alt,
  size = 40,
  online,
  statusColor = "green",
  className,
}: MarkerAvatarProps) {
  const statusColors = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <div
        className="absolute rounded-full bg-primary/10 animate-pulse"
        style={{
          width: size * 1.4,
          height: size * 1.4,
        }}
      />

      {/* Avatar container */}
      <div
        className={cn(
          "relative rounded-full border-2 border-background shadow-lg overflow-hidden",
          className
        )}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Status indicator */}
      {online !== undefined && (
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            statusColors[statusColor],
            online && "animate-pulse"
          )}
          style={{
            width: size * 0.25,
            height: size * 0.25,
          }}
        />
      )}
    </div>
  );
}
