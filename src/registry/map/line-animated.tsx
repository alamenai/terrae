"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";
import { useMap } from "./hooks";
import type { MapPath } from "./types";

type MapLineAnimatedProps = {
  /** Unique identifier for the line */
  id: string;
  /** Array of coordinates [[lng, lat], ...] */
  coordinates: MapPath;
  /** Line color */
  color?: string;
  /** Line width */
  width?: number;
  /** Line opacity */
  opacity?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Whether to show a marker moving along the line */
  showMarker?: boolean;
  /** Marker color */
  markerColor?: string;
  /** Custom marker icon (React component, e.g., Lucide icon) */
  markerIcon?: ReactNode;
  /** Auto-start animation on mount */
  autoStart?: boolean;
  /** Loop animation */
  loop?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
};

export function MapLineAnimated({
  id,
  coordinates,
  color = "#3b82f6",
  width = 4,
  opacity = 1,
  duration = 3000,
  showMarker = true,
  markerColor = "#3b82f6",
  markerIcon,
  autoStart = true,
  loop = false,
  onComplete,
}: MapLineAnimatedProps) {
  const { map, isLoaded } = useMap();
  const initializedRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const htmlMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const markerElementRef = useRef<HTMLDivElement | null>(null);
  const [markerReady, setMarkerReady] = useState(false);

  // Initialize line layers
  useEffect(() => {
    if (!map || !isLoaded || initializedRef.current) return;

    const sourceId = `${id}-source`;
    const lineLayerId = `${id}-line`;
    const markerSourceId = `${id}-marker-source`;
    const markerLayerId = `${id}-marker`;

    try {
      // Add line source (initially empty)
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      });

      // Add line layer
      map.addLayer({
        id: lineLayerId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": color,
          "line-width": width,
          "line-opacity": opacity,
        },
      });

      // Add marker if enabled
      if (showMarker) {
        if (markerIcon) {
          // Create HTML marker with custom icon
          const el = document.createElement("div");
          el.style.width = "32px";
          el.style.height = "32px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = markerColor;
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.boxShadow = "0 0 0 3px white";
          markerElementRef.current = el;

          const marker = new mapboxgl.Marker(el)
            .setLngLat(coordinates[0])
            .addTo(map);
          htmlMarkerRef.current = marker;
          setMarkerReady(true);
        } else {
          // Add circle marker layer
          map.addSource(markerSourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coordinates[0],
              },
            },
          });

          map.addLayer({
            id: markerLayerId,
            type: "circle",
            source: markerSourceId,
            paint: {
              "circle-radius": 8,
              "circle-color": markerColor,
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
            },
          });
        }
      }

      initializedRef.current = true;
    } catch (error) {
      console.error("Error adding animated line:", error);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (htmlMarkerRef.current) {
        htmlMarkerRef.current.remove();
        htmlMarkerRef.current = null;
      }
      if (map) {
        try {
          if (map.getLayer && map.getLayer(lineLayerId)) map.removeLayer(lineLayerId);
          if (!markerIcon && showMarker && map.getLayer && map.getLayer(markerLayerId)) map.removeLayer(markerLayerId);
          if (map.getSource && map.getSource(sourceId)) map.removeSource(sourceId);
          if (!markerIcon && showMarker && map.getSource && map.getSource(markerSourceId)) map.removeSource(markerSourceId);
        } catch (error) {
          // Silently catch errors during cleanup - map might be in the process of being destroyed
        }
      }
      // Reset state to allow re-initialization
      markerElementRef.current = null;
      setMarkerReady(false);
      initializedRef.current = false;
    };
  }, [map, isLoaded, id, color, width, opacity, showMarker, markerColor, markerIcon, coordinates]);

  // Animation logic
  useEffect(() => {
    if (!map || !isLoaded || !initializedRef.current) return;
    if (!autoStart && !isAnimating) return;

    const sourceId = `${id}-source`;
    const markerSourceId = `${id}-marker-source`;
    const startTime = Date.now();

    const animate = () => {
      // Guard: Check if map is still valid before proceeding
      if (!map || !map.getStyle()) {
        // Map has been removed or is being re-initialized, stop animation
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
        setIsAnimating(false);
        return;
      }

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate how many points to show
      const totalPoints = coordinates.length;
      const currentPointIndex = Math.floor(progress * (totalPoints - 1));
      const segmentProgress = (progress * (totalPoints - 1)) % 1;

      // Get visible portion of line
      const visibleCoordinates = coordinates.slice(0, currentPointIndex + 1);

      // Add interpolated point for smooth animation
      if (currentPointIndex < totalPoints - 1 && segmentProgress > 0) {
        const start = coordinates[currentPointIndex];
        const end = coordinates[currentPointIndex + 1];
        const interpolatedPoint: [number, number] = [
          start[0] + (end[0] - start[0]) * segmentProgress,
          start[1] + (end[1] - start[1]) * segmentProgress,
        ];
        visibleCoordinates.push(interpolatedPoint);
      }

      // Update line - check if source exists
      try {
        const lineSource = map.getSource(sourceId) as mapboxgl.GeoJSONSource;
        if (lineSource) {
          lineSource.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: visibleCoordinates,
            },
          });
        }
      } catch (error) {
        // Source may have been removed during cleanup, stop animation gracefully
        console.warn("Line source no longer available, stopping animation");
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
        setIsAnimating(false);
        return;
      }

      // Update marker position
      if (showMarker && visibleCoordinates.length > 0) {
        const lastPoint = visibleCoordinates[visibleCoordinates.length - 1];

        if (markerIcon && htmlMarkerRef.current) {
          // Update HTML marker position
          htmlMarkerRef.current.setLngLat(lastPoint as [number, number]);
        } else {
          // Update circle marker position
          try {
            const markerSource = map.getSource(markerSourceId) as mapboxgl.GeoJSONSource;
            if (markerSource) {
              markerSource.setData({
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: lastPoint,
                },
              });
            }
          } catch (error) {
            // Marker source may have been removed, continue without error
          }
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onComplete?.();

        if (loop) {
          setTimeout(() => {
            setIsAnimating(true);
          }, 500);
        }
      }
    };

    setIsAnimating(true);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [map, isLoaded, id, coordinates, duration, showMarker, autoStart, isAnimating, loop, onComplete, markerIcon]);

  // Render custom marker icon using portal
  if (markerIcon && markerReady && markerElementRef.current) {
    return createPortal(markerIcon, markerElementRef.current);
  }

  return null;
}

/**
 * Hook to control animated line playback
 */
export function useLineAnimatedControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  const start = () => setIsPlaying(true);
  const stop = () => setIsPlaying(false);
  const toggle = () => setIsPlaying((prev) => !prev);

  return { start, stop, toggle, isPlaying };
}
