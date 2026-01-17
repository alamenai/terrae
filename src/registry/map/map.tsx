"use client";

import { useTheme } from "next-themes";
import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { defaultMapStyles, type MapContextValue, type MapThemeStyles } from "./types";

export const MapContext = createContext<MapContextValue | null>(null);

const DefaultLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-muted">
    <div className="flex gap-1">
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
    </div>
  </div>
);

type MapProps = {
  children?: ReactNode;
  /** Mapbox access token. Required. */
  accessToken: string;
  /** Custom loading component */
  loader?: ReactNode;
  /** Single map style (overrides theme-based styles) */
  style?: string;
  /** Map styles for light and dark themes (ignored if style is set) */
  styles?: MapThemeStyles;
  /** Initial map center [longitude, latitude] */
  center?: [number, number];
  /** Initial zoom level */
  zoom?: number;
  /** Map bearing (rotation) */
  bearing?: number;
  /** Map pitch (tilt) */
  pitch?: number;
  /** Map projection. Use "globe" for 3D globe view or "mercator" for flat map (default: "mercator") */
  projection?: "globe" | "mercator" | "naturalEarth" | "equalEarth" | "winkelTripel" | mapboxgl.Projection;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Maximum bounds */
  maxBounds?: [[number, number], [number, number]];
};

export function Map({
  children,
  accessToken,
  loader,
  style,
  styles,
  center = [0, 0],
  zoom = 2,
  bearing = 0,
  pitch = 0,
  projection,
  minZoom,
  maxZoom,
  maxBounds,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const initializedRef = useRef(false);

  const mapStyles = useMemo(
    () => ({
      dark: styles?.dark ?? defaultMapStyles.dark,
      light: styles?.light ?? defaultMapStyles.light,
    }),
    [styles]
  );

  // Initialize map once
  useEffect(() => {
    if (initializedRef.current) return;
    if (!containerRef.current) return;
    if (!accessToken) {
      setError("Mapbox access token is required. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file and restart the dev server.");
      return;
    }

    initializedRef.current = true;
    mapboxgl.accessToken = accessToken;

    const mapStyle = style || (resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light);

    try {
      const mapInstance = new mapboxgl.Map({
        container: containerRef.current,
        style: mapStyle,
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

      mapInstance.on("load", () => {
        setIsLoaded(true);
      });

      mapInstance.on("error", (e: any) => {
        console.error("Mapbox error:", e);
        setError("Failed to load map");
      });

      mapRef.current = mapInstance;

      return () => {
        mapInstance.remove();
        mapRef.current = null;
        setIsLoaded(false);
        initializedRef.current = false;
      };
    } catch (err) {
      console.error("Error creating Mapbox map:", err);
      setError("Failed to create map");
      initializedRef.current = false;
    }
  }, [accessToken, style, styles, center, zoom, bearing, pitch, projection, minZoom, maxZoom, maxBounds, resolvedTheme, mapStyles]);

  const contextValue = useMemo(
    () => ({
      map: mapRef.current,
      isLoaded,
    }),
    [isLoaded]
  );

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
        {/* SSR-safe: children render only when map exists on client */}
        {mapRef.current && children}
      </div>
    </MapContext.Provider>
  );
}
