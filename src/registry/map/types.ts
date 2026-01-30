import { type RefObject } from "react"
import type { Map, Marker, ProjectionSpecification } from "mapbox-gl"
import type { MapLibraryName } from "./map-library"

export type { MapLibraryName }

export type MapCoordinates = [longitude: number, latitude: number]
export type MapBounds = [southwest: MapCoordinates, northeast: MapCoordinates]
export type MapPath = MapCoordinates[]
export type MapImageCorners = [
  topLeft: MapCoordinates,
  topRight: MapCoordinates,
  bottomRight: MapCoordinates,
  bottomLeft: MapCoordinates,
]
export type MapProjection = ProjectionSpecification["name"]

export type LngLatCoordinates = {
  lng: number
  lat: number
}

export type MapThemeStyles = {
  light?: string
  dark?: string
}

export const defaultMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
}

export const standardMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/standard",
  dark: "mapbox://styles/mapbox/standard",
}

export const streetsMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
}

export const outdoorsMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/outdoors-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
}

export const satelliteMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/satellite-streets-v12",
  dark: "mapbox://styles/mapbox/satellite-streets-v12",
}

export const navigationMapStyles: Required<MapThemeStyles> = {
  light: "mapbox://styles/mapbox/navigation-day-v1",
  dark: "mapbox://styles/mapbox/navigation-night-v1",
}

export const defaultMapLibreStyles: Required<MapThemeStyles> = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
}

export type MapCompareOrientation = "horizontal" | "vertical"

export type MapSyncLayout = "horizontal" | "vertical" | "grid"

export type MapContextValue = {
  map: Map | null
  isLoaded: boolean
  library: MapLibraryName
}

export type MarkerContextValue = {
  markerRef: RefObject<Marker | null>
  markerElementRef: RefObject<HTMLDivElement | null>
  map: Map | null
  isReady: boolean
}
