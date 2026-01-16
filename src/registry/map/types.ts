import { type RefObject } from "react";
import type mapboxgl from "mapbox-gl";

export type MapContextValue = {
  map: mapboxgl.Map | null;
  isLoaded: boolean;
};

export type MarkerContextValue = {
  markerRef: RefObject<mapboxgl.Marker | null>;
  markerElementRef: RefObject<HTMLDivElement | null>;
  map: mapboxgl.Map | null;
  isReady: boolean;
};

export const defaultMapStyles = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
};
