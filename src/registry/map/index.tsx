// ========================================
// Primary exports (new names)
// ========================================
export { Map } from "./map"
export { MapLine } from "./line"
export { MapLineAnimated, useLineAnimatedControl } from "./line-animated"
export { MapLineRadial } from "./line-radial"
export { MapArcAnimated, useArcAnimatedControl } from "./arc-animated"
export { MapPolygon } from "./polygon"
export { MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, MarkerLabel, MarkerAvatar } from "./marker"
export { MapMarkerAnimated, useMarkerAnimatedControl } from "./marker-animated"
export { MapAnimatedPulse } from "./animated-pulse"
export { MapAnimatedPolygon } from "./animated-polygon"
export { MapCircleCluster } from "./circle-cluster"
export { MapRasterVideo, useRasterVideoControl } from "./raster-video"
export { MapControls, MapZoom, MapOrientation, MapGeolocate, MapFullscreen } from "./controls"
export { MapCompare } from "./map-compare"
export { MapPopup } from "./popup"
export { MapRain, createZoomInterpolation } from "./rain"
export { MapMiniMap } from "./mini-map"
export { MapImage } from "./image"
export { MapBlurArea } from "./blur-area"
export { useMap } from "./hooks"
export { defaultMapStyles, navigationMapStyles, type MapCompareOrientation } from "./types"

// ========================================
// Deprecated aliases (remove in v2.0)
// ========================================

/** @deprecated Use MapLine instead. Will be removed in v2.0 */
export { MapLine as MapRoute } from "./line"

/** @deprecated Use MapLineAnimated instead. Will be removed in v2.0 */
export { MapLineAnimated as MapAnimatedRoute, useLineAnimatedControl as useAnimatedRouteControl } from "./line-animated"

/** @deprecated Use MapCircleCluster instead. Will be removed in v2.0 */
export { MapCircleCluster as MapClusterLayer } from "./circle-cluster"

/** @deprecated Use MapRasterVideo instead. Will be removed in v2.0 */
export { MapRasterVideo as MapVideoLayer, useRasterVideoControl as useVideoControl } from "./raster-video"
