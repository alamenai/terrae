import { type RefObject } from "react";
import type { Map, Marker, ProjectionSpecification } from "mapbox-gl";

// Map configuration types
export type MapCoordinates = [longitude: number, latitude: number];
export type MapBounds = [southwest: MapCoordinates, northeast: MapCoordinates];
export type MapPath = MapCoordinates[];
export type MapImageCorners = [topLeft: MapCoordinates, topRight: MapCoordinates, bottomRight: MapCoordinates, bottomLeft: MapCoordinates];
export type MapProjection = ProjectionSpecification["name"];
export type MapThemeStyles = {
  light?: string;
  dark?: string;
};

export const defaultMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
};

// Context types
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
