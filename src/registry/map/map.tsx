"use client";

import { useTheme } from "next-themes";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { defaultMapStyles, type MapContextValue, type MapThemeStyles, type MapProjection, type MapCoordinates, type MapBounds } from "./types";

export const MapContext = createContext<MapContextValue | null>(null);

const DEFAULT_CENTER: MapCoordinates = [0, 0];
const DEFAULT_ZOOM = 2;
const DEFAULT_BEARING = 0;
const DEFAULT_PITCH = 0;

type MapProps = {
  accessToken: string;
  children?: ReactNode;
  loader?: ReactNode;
  // Overrides theme-based styles when set
  style?: string;
  styles?: MapThemeStyles;
  center?: MapCoordinates;
  zoom?: number;
  bearing?: number;
  pitch?: number;
  projection?: MapProjection;
  minZoom?: number;
  maxZoom?: number;
  maxBounds?: MapBounds;
};

export const Map = ({
  accessToken,
  children,
  loader,
  style,
  styles,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  bearing = DEFAULT_BEARING,
  pitch = DEFAULT_PITCH,
  projection,
  minZoom,
  maxZoom,
  maxBounds,
}: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const initializedRef = useRef(false);

  const getMapStyle = () => {
    if (style) {
      return style;
    }
    const darkStyle = styles?.dark ?? defaultMapStyles.dark;
    const lightStyle = styles?.light ?? defaultMapStyles.light;

    return resolvedTheme === "dark" ? darkStyle : lightStyle;
  };

  const createMapInstance = (container: HTMLDivElement) => {
    return new mapboxgl.Map({
      container,
      style: getMapStyle(),
      center,
      zoom,
      bearing,
      pitch,
      projection,
      minZoom,
      maxZoom,
      maxBounds,
      attributionControl: false,
    });
  };

  const handleMapLoad = () => {
    setIsLoaded(true);
  };

  const handleMapError = (e: mapboxgl.ErrorEvent) => {
    console.error("Mapbox error:", e.error);
    setError("Failed to load map");
  };

  const cleanupMap = (mapInstance: mapboxgl.Map) => {
    mapInstance.remove();
    mapRef.current = null;
    setIsLoaded(false);
    initializedRef.current = false;
  };

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    if (!containerRef.current) {
      return;
    }
    if (!accessToken) {
      setError("Mapbox access token is required. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file and restart the dev server.");
      return;
    }

    initializedRef.current = true;
    mapboxgl.accessToken = accessToken;

    try {
      const mapInstance = createMapInstance(containerRef.current);
      mapInstance.on("load", handleMapLoad);
      mapInstance.on("error", handleMapError);
      mapRef.current = mapInstance;

      return () => {
        cleanupMap(mapInstance);
      };
    } catch (err) {
      console.error("Error creating Mapbox map:", err);
      setError("Failed to create map");
      initializedRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return;
    }

    mapRef.current.setStyle(getMapStyle());
  }, [style, styles, resolvedTheme]);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return;
    }

    mapRef.current.setCenter(center);
  }, [center]);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return;
    }

    mapRef.current.setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return;
    }

    mapRef.current.setBearing(bearing);
  }, [bearing]);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) {
      return;
    }

    mapRef.current.setPitch(pitch);
  }, [pitch]);

  const contextValue: MapContextValue = {
    map: mapRef.current,
    isLoaded,
  };

  if (error) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-destructive text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className="relative w-full h-full">
        {!isLoaded && (loader || <DefaultLoader />)}
        {mapRef.current && children}
      </div>
    </MapContext.Provider>
  );
};

const DefaultLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-muted">
    <div className="flex gap-1">
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
    </div>
  </div>
);
