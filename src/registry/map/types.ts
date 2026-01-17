import { type RefObject } from "react";
import type { Map, Marker } from "mapbox-gl";

export type MapContextValue = {
  map: Map | null;
  isLoaded: boolean;
};

export type MarkerContextValue = {
  markerRef: RefObject<Marker | null>;
  markerElementRef: RefObject<HTMLDivElement | null>;
  map: Map | null;
  isReady: boolean;
};

export const defaultMapStyles = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
};
