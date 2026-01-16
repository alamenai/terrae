"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useMap } from "./hooks";
import { cn } from "@/lib/utils";

type MapMiniMapProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  width?: number;
  height?: number;
  zoomOffset?: number;
  style?: string;
  boxColor?: string;
  boxBorderWidth?: number;
};

export function MapMiniMap({
  position = "bottom-right",
  width = 200,
  height = 150,
  zoomOffset = -4,
  style,
  boxColor = "#3b82f6",
  boxBorderWidth = 2,
}: MapMiniMapProps) {
  const { map: mainMap, isLoaded } = useMap();
  const containerRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<mapboxgl.Map | null>(null);
  const [miniMapLoaded, setMiniMapLoaded] = useState(false);

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  useEffect(() => {
    if (!mainMap || !isLoaded || !containerRef.current) return;

    const miniMap = new mapboxgl.Map({
      container: containerRef.current,
      style: style || mainMap.getStyle(),
      center: mainMap.getCenter(),
      zoom: Math.max(0, mainMap.getZoom() + zoomOffset),
      interactive: false,
      attributionControl: false,
      logoPosition: "bottom-left",
    });

    miniMap.on("load", () => {
      miniMap.addSource("viewport-box", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "Polygon", coordinates: [[]] },
        },
      });

      miniMap.addLayer({
        id: "viewport-box-fill",
        type: "fill",
        source: "viewport-box",
        paint: { "fill-color": boxColor, "fill-opacity": 0.1 },
      });

      miniMap.addLayer({
        id: "viewport-box-outline",
        type: "line",
        source: "viewport-box",
        paint: { "line-color": boxColor, "line-width": boxBorderWidth },
      });

      setMiniMapLoaded(true);
    });

    miniMapRef.current = miniMap;

    return () => {
      miniMap.remove();
      miniMapRef.current = null;
      setMiniMapLoaded(false);
    };
  }, [mainMap, isLoaded, style, zoomOffset, boxColor, boxBorderWidth]);

  useEffect(() => {
    if (!mainMap || !miniMapRef.current || !miniMapLoaded) return;

    const updateMiniMap = () => {
      const miniMap = miniMapRef.current;
      if (!miniMap) return;

      miniMap.setCenter(mainMap.getCenter());
      miniMap.setZoom(Math.max(0, mainMap.getZoom() + zoomOffset));

      const bounds = mainMap.getBounds();
      if (!bounds) return;

      const nw = bounds.getNorthWest();
      const ne = bounds.getNorthEast();
      const se = bounds.getSouthEast();
      const sw = bounds.getSouthWest();

      const boxSource = miniMap.getSource("viewport-box") as mapboxgl.GeoJSONSource;
      boxSource?.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[[nw.lng, nw.lat], [ne.lng, ne.lat], [se.lng, se.lat], [sw.lng, sw.lat], [nw.lng, nw.lat]]],
        },
      });
    };

    mainMap.on("move", updateMiniMap);
    mainMap.on("zoom", updateMiniMap);
    updateMiniMap();

    return () => {
      mainMap.off("move", updateMiniMap);
      mainMap.off("zoom", updateMiniMap);
    };
  }, [mainMap, miniMapLoaded, zoomOffset]);

  return (
    <div className={cn("absolute z-100", positionClasses[position])}>
      <div
        ref={containerRef}
        className="rounded-lg overflow-hidden border-2 border-border shadow-lg"
        style={{ width, height }}
      />
    </div>
  );
}
