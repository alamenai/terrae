"use client";

import { useEffect, useRef } from "react";
import { useMap } from "./hooks";
import type { MapCoordinates } from "./types";

type MapAnimatedPulseProps = {
  /** Unique identifier for the pulsing animation */
  id: string;
  /** Pulse size in pixels */
  size: number;
  /** Coordinates [longitude, latitude] for pulse position */
  coordinates: MapCoordinates;
  /** Inner circle color */
  color?: string;
  /** Outer pulsing circle color */
  pulseColor?: string;
  /** Animation duration in milliseconds */
  duration?: number;
};

function createPulsingDot(
  size: number,
  color: string,
  pulseColor: string,
  duration: number
) {
  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd: function (this: any) {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d", { willReadFrequently: true });
    },

    render: function (this: any) {
      const t = (performance.now() % duration) / duration;
      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context as CanvasRenderingContext2D;

      // Draw pulsing outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = pulseColor;
      context.globalAlpha = 1 - t;
      context.fill();

      // Draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = color;
      context.globalAlpha = 1;
      context.fill();

      this.data = context.getImageData(0, 0, this.width, this.height).data;
      return true;
    },
  };
}

export function MapAnimatedPulse({
  id,
  size,
  coordinates,
  color = "rgba(0, 100, 255, 1)",
  pulseColor = "rgba(0, 100, 255, 0.8)",
  duration = 1000,
}: MapAnimatedPulseProps) {
  const { map, isLoaded } = useMap();
  const animationFrameRef = useRef<number | null>(null);
  const sourceId = `${id}-source`;
  const layerId = `${id}-layer`;

  useEffect(() => {
    if (!isLoaded || !map) return;

    const pulsingDot = createPulsingDot(size, color, pulseColor, duration);

    // Add the pulse image
    if (!map.hasImage(id)) {
      map.addImage(id, pulsingDot as any, { pixelRatio: 2 });
    }

    // Start animation loop
    const animate = () => {
      map.triggerRepaint();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (map.hasImage(id)) {
        map.removeImage(id);
      }
    };
  }, [map, isLoaded, id, size, color, pulseColor, duration]);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const setup = () => {
      // Wait for both style and image to be ready
      if (!map.isStyleLoaded() || !map.hasImage(id)) {
        requestAnimationFrame(setup);
        return;
      }

      // Add source
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates },
                properties: {},
              },
            ],
          },
        });
      }

      // Add layer
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "icon-image": id,
            "icon-allow-overlap": true,
          },
        });
      }
    };

    const rafId = requestAnimationFrame(setup);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      if (map.isStyleLoaded()) {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      }
    };
  }, [map, isLoaded, coordinates, id, sourceId, layerId]);

  return null;
}
