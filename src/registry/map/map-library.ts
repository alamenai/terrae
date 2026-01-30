import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

export type MapLibraryName = "mapbox" | "maplibre"

// Change these two lines to switch between Mapbox GL and MapLibre GL:
//   import mapboxgl from "maplibre-gl"
//   import "maplibre-gl/dist/maplibre-gl.css"
//   const detectedLibrary: MapLibraryName = "maplibre"
const detectedLibrary: MapLibraryName = "mapbox"

const mapgl = mapboxgl

export { mapgl, detectedLibrary }
