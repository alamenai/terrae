import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsLink,
  DocsNote,
  DocsPropTable,
  NewBadge,
  UpdatedBadge,
} from "../_components/docs"
import { CodeBlock } from "../_components/code-block"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reference",
}

const anatomyCode = `<Map>
  {/* Markers */}
  <MapMarker coordinates={[lng, lat]}>
    <MarkerContent>
      <MarkerLabel />
    </MarkerContent>
    <MarkerPopup />
    <MarkerTooltip />
  </MapMarker>

  {/* Popup */}
  <MapPopup coordinates={[lng, lat]} />

  {/* Controls */}
  <MapControls position="bottom-right">
    <MapZoom />
    <MapOrientation />
    <MapGeolocate />
    <MapFullscreen />
  </MapControls>

  {/* Features */}
  <MapMiniMap />
  <MapLine coordinates={[[lng, lat], ...]} />
  <MapLineAnimated id="route" path={[[lng, lat], ...]} />
  <MapCircleCluster data={geoJsonData} />
  <MapAnimatedPulse id="pulse" size={100} coordinates={[lng, lat]} />
  <MapImage id="overlay" url="..." coordinates={[...]} />
  <MapRasterVideo id="video" urls={[...]} coordinates={[...]} />
  <MapBlurArea coordinates={[[lng, lat], ...]} />
  <MapRain />
</Map>`

export default function ApiReferencePage() {
  return (
    <DocsLayout
      title="Reference"
      description="Complete reference for all map components and their props."
      prev={{ title: "Hooks", href: "/docs/hooks" }}
      next={{ title: "Map", href: "/docs/basic-map" }}
    >
      <DocsNote>
        <strong>Tip:</strong> This library is built on top of{" "}
        <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/" external>
          Mapbox GL JS
        </DocsLink>
        . Most components extend the native Mapbox options. Refer to the{" "}
        <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/map/" external>
          Mapbox Map API
        </DocsLink>{" "}
        for additional configuration options.
      </DocsNote>

      <DocsSection title="Component Anatomy">
        <p>All components you can use and combine to build your map.</p>
        <CodeBlock code={anatomyCode} showCopyButton={false} />
      </DocsSection>

      {/* Map */}
      <DocsSection title="Map">
        <p>
          The root container that initializes Mapbox GL and provides context to all child components. Automatically
          handles theme switching between light and dark modes.
        </p>
        <p>
          Extends{" "}
          <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters" external>
            MapOptions
          </DocsLink>{" "}
          from Mapbox GL (excluding <DocsCode>container</DocsCode> and <DocsCode>style</DocsCode>).
        </p>
        <DocsPropTable
          props={[
            {
              name: "accessToken",
              type: "string",
              description: "Mapbox access token. Required.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Child components (markers, popups, controls, features).",
            },
            {
              name: "center",
              type: "[number, number]",
              default: "[0, 0]",
              description: "Initial map center [longitude, latitude].",
            },
            {
              name: "zoom",
              type: "number",
              default: "2",
              description: "Initial zoom level.",
            },
            {
              name: "bearing",
              type: "number",
              default: "0",
              description: "Map bearing (rotation) in degrees.",
            },
            {
              name: "pitch",
              type: "number",
              default: "0",
              description: "Map pitch (tilt) in degrees.",
            },
            {
              name: "projection",
              type: "string",
              default: '"mercator"',
              description:
                "Map projection: mercator, globe, albers, equalEarth, equirectangular, lambertConformalConic, naturalEarth, winkelTripel.",
            },
            {
              name: "style",
              type: "string",
              description: "Map style URL (e.g., 'mapbox://styles/mapbox/streets-v12'). Overrides theme-based styles.",
            },
            {
              name: "styles",
              type: "MapThemeStyles",
              default: "defaultMapStyles",
              description:
                "Theme-aware styles object. Use presets: defaultMapStyles, standardMapStyles, streetsMapStyles, outdoorsMapStyles, satelliteMapStyles, navigationMapStyles.",
              isNew: true,
            },
            {
              name: "minZoom",
              type: "number",
              default: "0",
              description: "Minimum zoom level constraint.",
            },
            {
              name: "maxZoom",
              type: "number",
              default: "22",
              description: "Maximum zoom level constraint.",
            },
            {
              name: "maxBounds",
              type: "[[number, number], [number, number]]",
              description: "Restrict map panning to a geographic area [southwest, northeast].",
            },
            {
              name: "loader",
              type: "ReactNode",
              description: "Custom loading component shown while map initializes.",
            },
            {
              name: "showLoader",
              type: "boolean",
              description:
                "Controls loader visibility. When true, forces loader. When false, hides. When undefined, uses internal loading state.",
              isNew: true,
            },
          ]}
        />
      </DocsSection>

      {/* MapControls */}
      <DocsSection title="MapControls">
        <p>
          Container for map control components. Accepts composable control components as children (MapZoom,
          MapOrientation, MapGeolocate, MapFullscreen). Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"bottom-right"',
              description: "Position of the controls on the map.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Control components (MapZoom, MapOrientation, MapGeolocate, MapFullscreen).",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the controls container.",
            },
          ]}
        />
      </DocsSection>

      {/* MapZoom */}
      <DocsSection title="MapZoom">
        <p>
          Zoom in and zoom out control buttons. Must be used inside <DocsCode>MapControls</DocsCode>.
        </p>
        <p>No props required.</p>
      </DocsSection>

      {/* MapOrientation */}
      <DocsSection title="MapOrientation">
        <p>
          Compass control that shows map orientation and resets bearing to north when clicked. Must be used inside{" "}
          <DocsCode>MapControls</DocsCode>.
        </p>
        <p>No props required.</p>
      </DocsSection>

      {/* MapGeolocate */}
      <DocsSection title="MapGeolocate">
        <p>
          Geolocate control to find and fly to user's current location. Must be used inside{" "}
          <DocsCode>MapControls</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "onLocate",
              type: "(coords: { longitude: number; latitude: number }) => void",
              description: "Callback with user coordinates when located.",
            },
          ]}
        />
      </DocsSection>

      {/* MapFullscreen */}
      <DocsSection title="MapFullscreen">
        <p>
          Fullscreen toggle control. Must be used inside <DocsCode>MapControls</DocsCode>.
        </p>
        <p>No props required.</p>
      </DocsSection>

      {/* MapMarker */}
      <DocsSection title="MapMarker">
        <p>
          A container for marker-related components. Provides context for its children and handles marker positioning.
        </p>
        <p>
          Extends{" "}
          <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-parameters" external>
            MarkerOptions
          </DocsLink>{" "}
          from Mapbox GL (excluding <DocsCode>element</DocsCode>).
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for marker position.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Marker subcomponents (MarkerContent, MarkerPopup, etc).",
            },
            {
              name: "onClick",
              type: "(e: MouseEvent) => void",
              description: "Callback when marker is clicked.",
            },
            {
              name: "onMouseEnter",
              type: "(e: MouseEvent) => void",
              description: "Callback when mouse enters marker.",
            },
            {
              name: "onMouseLeave",
              type: "(e: MouseEvent) => void",
              description: "Callback when mouse leaves marker.",
            },
            {
              name: "onDragStart",
              type: "(lngLat: LngLatCoordinates) => void",
              description: "Callback when marker drag starts (requires draggable: true).",
            },
            {
              name: "onDrag",
              type: "(lngLat: LngLatCoordinates) => void",
              description: "Callback during marker drag (requires draggable: true).",
            },
            {
              name: "onDragEnd",
              type: "(lngLat: LngLatCoordinates) => void",
              description: "Callback when marker drag ends (requires draggable: true).",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerContent */}
      <DocsSection title="MarkerContent">
        <p>
          Renders the visual content of a marker. Must be used inside <DocsCode>MapMarker</DocsCode>. If no children
          provided, renders a default blue dot marker.
        </p>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Custom marker content. Defaults to a blue dot.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the marker container.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerPopup */}
      <DocsSection title="MarkerPopup">
        <p>
          Renders a popup attached to the marker that opens on click. Must be used inside <DocsCode>MapMarker</DocsCode>
          .
        </p>
        <p>
          Extends{" "}
          <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup-parameters" external>
            PopupOptions
          </DocsLink>{" "}
          from Mapbox GL (excluding <DocsCode>className</DocsCode> and <DocsCode>closeButton</DocsCode>).
        </p>
        <DocsNote>
          The <DocsCode>className</DocsCode> and <DocsCode>closeButton</DocsCode> from Mapbox&apos;s PopupOptions are
          excluded to prevent style conflicts. Use the component&apos;s own props to style the popup. Mapbox&apos;s
          default popup styles are reset via CSS.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Popup content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the popup container.",
            },
            {
              name: "closeButton",
              type: "boolean",
              default: "false",
              description: "Show a close button in the popup.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerTooltip */}
      <DocsSection title="MarkerTooltip">
        <p>
          Renders a tooltip that appears on hover. Must be used inside <DocsCode>MapMarker</DocsCode>.
        </p>
        <p>
          Extends{" "}
          <DocsLink href="https://mapbox.com/maplibre-gl-js/docs/API/type-aliases/PopupOptions/" external>
            PopupOptions
          </DocsLink>{" "}
          from Mapbox GL (excluding <DocsCode>className</DocsCode>, <DocsCode>closeButton</DocsCode>, and{" "}
          <DocsCode>closeOnClick</DocsCode> as tooltips auto-dismiss on hover out).
        </p>
        <DocsNote>
          The <DocsCode>className</DocsCode> from Mapbox&apos;s PopupOptions is excluded to prevent style conflicts. Use
          the component&apos;s own <DocsCode>className</DocsCode> prop to style the tooltip content. Mapbox&apos;s
          default popup styles are reset via CSS.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Tooltip content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the tooltip container.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerLabel */}
      <DocsSection title="MarkerLabel">
        <p>
          Renders a text label above or below the marker. Must be used inside <DocsCode>MarkerContent</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Label text content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the label.",
            },
            {
              name: "position",
              type: '"top" | "bottom"',
              default: '"top"',
              description: "Position of the label relative to the marker.",
            },
          ]}
        />
      </DocsSection>

      {/* MapPopup */}
      <DocsSection title="MapPopup">
        <p>
          A standalone popup component that can be placed anywhere on the map without a marker. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <p>
          Extends{" "}
          <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup-parameters" external>
            PopupOptions
          </DocsLink>{" "}
          from Mapbox GL (excluding <DocsCode>className</DocsCode> and <DocsCode>closeButton</DocsCode>).
        </p>
        <DocsNote>
          The <DocsCode>className</DocsCode> and <DocsCode>closeButton</DocsCode> from Mapbox&apos;s PopupOptions are
          excluded to prevent style conflicts. Use the component&apos;s own props to style the popup. Mapbox&apos;s
          default popup styles are reset via CSS.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for popup position.",
            },
            {
              name: "onClose",
              type: "() => void",
              description: "Callback when popup is closed.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Popup content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the popup container.",
            },
            {
              name: "closeButton",
              type: "boolean",
              default: "false",
              description: "Show a close button in the popup.",
            },
          ]}
        />
      </DocsSection>

      {/* MapLine */}
      <DocsSection title="MapLine">
        <p>
          Renders a line on the map connecting coordinate points. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] coordinate pairs.",
            },
            {
              name: "color",
              type: "string",
              default: '"#4285F4"',
              description: "Line color (CSS color value).",
            },
            {
              name: "width",
              type: "number",
              default: "3",
              description: "Line width in pixels.",
            },
            {
              name: "opacity",
              type: "number",
              default: "0.8",
              description: "Line opacity (0 to 1).",
            },
            {
              name: "dashArray",
              type: "[number, number]",
              description: "Dash pattern [dash length, gap length] for dashed lines.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCircleCluster */}
      <DocsSection title="MapCircleCluster">
        <p>
          Renders clustered point data using Mapbox GL&apos;s native clustering. Automatically groups nearby points into
          clusters that expand on click. Must be used inside <DocsCode>Map</DocsCode>. Supports a generic type parameter
          for typed feature properties: <DocsCode>{"MapCircleCluster<MyProperties>"}</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "data",
              type: "string | GeoJSON.FeatureCollection",
              description: "GeoJSON FeatureCollection data or URL to fetch GeoJSON from.",
            },
            {
              name: "clusterMaxZoom",
              type: "number",
              default: "14",
              description: "Maximum zoom level to cluster points on.",
            },
            {
              name: "clusterRadius",
              type: "number",
              default: "50",
              description: "Radius of each cluster when clustering points (in pixels).",
            },
            {
              name: "clusterColors",
              type: "[string, string, string]",
              default: '["#51bbd6", "#f1f075", "#f28cb1"]',
              description: "Colors for cluster circles: [small, medium, large] based on point count.",
            },
            {
              name: "clusterThresholds",
              type: "[number, number]",
              default: "[100, 750]",
              description: "Point count thresholds for color/size steps: [medium, large].",
            },
            {
              name: "pointColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color for unclustered individual points.",
            },
            {
              name: "onPointClick",
              type: "(feature: GeoJSON.Feature, coordinates: [number, number]) => void",
              description: "Callback when an unclustered point is clicked.",
            },
            {
              name: "onClusterClick",
              type: "(clusterId: number, coordinates: [number, number], pointCount: number) => void",
              description: "Callback when a cluster is clicked. If not provided, zooms into the cluster.",
            },
          ]}
        />
      </DocsSection>

      {/* MapAnimatedPulse */}
      <DocsSection title="MapAnimatedPulse">
        <p>
          Renders an animated pulsing dot at specified coordinates. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the pulse animation.",
            },
            {
              name: "size",
              type: "number",
              description: "Pulse size in pixels.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for pulse position.",
            },
            {
              name: "color",
              type: "string",
              default: '"rgba(0, 100, 255, 1)"',
              description: "Inner circle color.",
            },
            {
              name: "pulseColor",
              type: "string",
              default: '"rgba(0, 100, 255, 0.8)"',
              description: "Outer pulsing circle color.",
            },
            {
              name: "duration",
              type: "number",
              default: "1000",
              description: "Animation duration in milliseconds.",
            },
          ]}
        />
      </DocsSection>

      {/* MapMiniMap */}
      <DocsSection title="MapMiniMap" badge={<UpdatedBadge />}>
        <p>
          Displays an overview minimap showing the current viewport context. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"bottom-right"',
              description: "Position of the minimap on the map.",
            },
            {
              name: "width",
              type: "number",
              default: "200",
              description: "Minimap width in pixels.",
            },
            {
              name: "height",
              type: "number",
              default: "150",
              description: "Minimap height in pixels.",
            },
            {
              name: "zoomOffset",
              type: "number",
              default: "-4",
              description: "Zoom offset relative to main map.",
            },
            {
              name: "style",
              type: "string",
              description: "Custom map style URL for the minimap.",
            },
            {
              name: "boxColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color of the viewport box outline.",
            },
            {
              name: "boxBorderWidth",
              type: "number",
              default: "2",
              description: "Width of the viewport box border.",
            },
            {
              name: "rounded",
              type: 'number | "full" | "none"',
              default: "8",
              description: 'Border radius in pixels, "full" for circular, or "none".',
              isNew: true,
            },
            {
              name: "draggable",
              type: "boolean",
              default: "false",
              description: "Allow users to drag the minimap anywhere within the map.",
              isNew: true,
            },
          ]}
        />
      </DocsSection>

      {/* MapBlurArea */}
      <DocsSection title="MapBlurArea" badge={<NewBadge />}>
        <p>
          Renders blur effect overlays on specified areas of the map. Supports single or multiple areas. Must be used
          inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] coordinate pairs defining a single blur area.",
            },
            {
              name: "areas",
              type: "BlurAreaConfig[]",
              description:
                "Array of blur area configs for multiple regions. Each config: { coordinates, blur?, backgroundColor?, rounded? }.",
              isNew: true,
            },
            {
              name: "blur",
              type: "number",
              default: "8",
              description: "Default blur intensity in pixels.",
            },
            {
              name: "backgroundColor",
              type: "string",
              description: 'Default background color overlay (e.g., "rgba(0,0,0,0.3)").',
            },
            {
              name: "rounded",
              type: 'number | "full"',
              default: "0",
              description: 'Default border radius in pixels or "full" for circular.',
            },
            {
              name: "blockInteraction",
              type: "boolean",
              default: "false",
              description: "Prevent map interactions on blur areas.",
            },
          ]}
        />
      </DocsSection>

      {/* MapLineAnimated */}
      <DocsSection title="MapLineAnimated">
        <p>
          Renders an animated line that draws progressively along the route. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the animated line.",
            },
            {
              name: "path",
              type: "Array<[number, number]>",
              description: "Array of [longitude, latitude] coordinate pairs.",
            },
            {
              name: "color",
              type: "string",
              default: '"#3b82f6"',
              description: "Line color.",
            },
            {
              name: "width",
              type: "number",
              default: "4",
              description: "Line width in pixels.",
            },
            {
              name: "opacity",
              type: "number",
              default: "1",
              description: "Line opacity (0 to 1).",
            },
            {
              name: "dashArray",
              type: "[number, number]",
              description: "Dash pattern [dash length, gap length] for dashed lines.",
            },
            {
              name: "duration",
              type: "number",
              default: "3000",
              description: "Animation duration in milliseconds.",
            },
            {
              name: "showMarker",
              type: "boolean",
              default: "true",
              description: "Whether to show a marker moving along the line.",
            },
            {
              name: "markerColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Marker color.",
            },
            {
              name: "markerIcon",
              type: "ReactNode",
              description: "Custom marker icon (React component).",
            },
            {
              name: "markerBorderless",
              type: "boolean",
              default: "false",
              description: "Remove border/outline from marker.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Auto-start animation on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop animation continuously.",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when animation completes.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCompare */}
      <DocsSection title="MapCompare" badge={<UpdatedBadge />}>
        <p>
          Displays two maps side-by-side for visual comparison. This component creates its own map instances and does
          not require a parent <DocsCode>Map</DocsCode> component.
        </p>
        <DocsPropTable
          props={[
            {
              name: "accessToken",
              type: "string",
              description: "Mapbox access token. Required.",
            },
            {
              name: "beforeStyle",
              type: "string",
              description: "Map style for the before (left/top) map.",
            },
            {
              name: "afterStyle",
              type: "string",
              description: "Map style for the after (right/bottom) map.",
            },
            {
              name: "center",
              type: "[number, number]",
              default: "[0, 0]",
              description: "Initial map center [longitude, latitude].",
            },
            {
              name: "zoom",
              type: "number",
              default: "2",
              description: "Initial zoom level.",
            },
            {
              name: "bearing",
              type: "number",
              default: "0",
              description: "Map bearing (rotation) in degrees.",
            },
            {
              name: "pitch",
              type: "number",
              default: "0",
              description: "Map pitch (tilt) in degrees.",
            },
            {
              name: "projection",
              type: '"globe" | "mercator" | "naturalEarth" | "equalEarth" | "winkelTripel"',
              description: "Map projection type.",
            },
            {
              name: "defaultSize",
              type: "number",
              default: "50",
              description: "Initial split position as percentage (0-100).",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Compare layout direction. Horizontal shows left/right, vertical shows top/bottom.",
              isNew: true,
            },
            {
              name: "showLabels",
              type: "boolean",
              default: "false",
              description: "Show Before/After or Top/Bottom labels on each map panel.",
              isNew: true,
            },
            {
              name: "loader",
              type: "ReactNode",
              description: "Custom loading component.",
            },
          ]}
        />
      </DocsSection>

      {/* MapImage */}
      <DocsSection title="MapImage">
        <p>
          Overlays an image on the map at specified coordinates. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the image layer.",
            },
            {
              name: "url",
              type: "string",
              description: "Image URL to display.",
            },
            {
              name: "coordinates",
              type: "[[number, number], [number, number], [number, number], [number, number]]",
              description: "Four corner coordinates [topLeft, topRight, bottomRight, bottomLeft] as [lng, lat] pairs.",
            },
            {
              name: "opacity",
              type: "number",
              default: "1",
              description: "Image opacity (0 to 1).",
            },
          ]}
        />
      </DocsSection>

      {/* MapRasterVideo */}
      <DocsSection title="MapRasterVideo">
        <p>
          Overlays video content on the map at specified coordinates. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the video layer.",
            },
            {
              name: "urls",
              type: "string[]",
              description: "Array of video URLs (provide multiple formats for browser compatibility).",
            },
            {
              name: "coordinates",
              type: "[[number, number], [number, number], [number, number], [number, number]]",
              description: "Four corner coordinates [topLeft, topRight, bottomRight, bottomLeft] as [lng, lat] pairs.",
            },
            {
              name: "opacity",
              type: "number",
              default: "1",
              description: "Video opacity (0 to 1).",
            },
            {
              name: "autoplay",
              type: "boolean",
              default: "false",
              description: "Auto-play video on load.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "true",
              description: "Loop video playback.",
            },
            {
              name: "muted",
              type: "boolean",
              default: "true",
              description: "Mute video audio.",
            },
          ]}
        />
      </DocsSection>

      {/* MapRain */}
      <DocsSection title="MapRain">
        <p>
          Adds an animated rain weather effect overlay to the map. Requires Mapbox GL JS v3.9 or higher. Must be used
          inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsNote>
          This component requires Mapbox GL JS v3.9+. Use the <DocsCode>createZoomInterpolation</DocsCode> helper to
          create zoom-based effects.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "density",
              type: "number | any[]",
              default: "0.5",
              description: "Rain density (0-1) or Mapbox expression for zoom-based density.",
            },
            {
              name: "intensity",
              type: "number",
              default: "1.0",
              description: "Rain intensity (0-1).",
            },
            {
              name: "color",
              type: "string",
              default: '"#a8adbc"',
              description: "Rain droplet color.",
            },
            {
              name: "opacity",
              type: "number",
              default: "0.7",
              description: "Rain opacity (0-1).",
            },
            {
              name: "vignette",
              type: "number | any[]",
              default: "1.0",
              description: "Vignette effect strength (0-1) or Mapbox expression.",
            },
            {
              name: "vignetteColor",
              type: "string",
              default: '"#464646"',
              description: "Vignette color.",
            },
            {
              name: "direction",
              type: "[number, number]",
              default: "[0, 80]",
              description: "Wind direction [x, y].",
            },
            {
              name: "dropletSize",
              type: "[number, number]",
              default: "[2.6, 18.2]",
              description: "Droplet size range [min, max].",
            },
            {
              name: "distortionStrength",
              type: "number",
              default: "0.7",
              description: "Distortion strength (0-1).",
            },
            {
              name: "centerThinning",
              type: "number",
              default: "0",
              description: "Center thinning effect (0 = full screen).",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerAvatar */}
      <DocsSection title="MarkerAvatar">
        <p>
          Renders an avatar image with optional status indicator. Must be used inside <DocsCode>MarkerContent</DocsCode>
          .
        </p>
        <DocsPropTable
          props={[
            {
              name: "src",
              type: "string",
              description: "Image source URL.",
            },
            {
              name: "alt",
              type: "string",
              description: "Alt text for the image.",
            },
            {
              name: "size",
              type: "number",
              default: "40",
              description: "Size of the avatar in pixels.",
            },
            {
              name: "online",
              type: "boolean",
              description: "Show online status indicator.",
            },
            {
              name: "statusColor",
              type: '"green" | "red" | "yellow" | "blue"',
              default: '"green"',
              description: "Status indicator color.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the avatar container.",
            },
          ]}
        />
      </DocsSection>

      {/* Helper Functions */}
      <DocsSection title="Helper Functions">
        <div>
          <h3 className="text-lg font-semibold mb-2">createZoomInterpolation</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Creates a Mapbox zoom-based interpolation expression for dynamic effects. Useful for rain density and
            vignette that scale with zoom level.
          </p>
          <CodeBlock
            code={`import { Map, MapRain, createZoomInterpolation } from "@/registry/map";

export function RainMapExample() {
  // Gradually increase rain density from zoom 11 to 13
  const density = createZoomInterpolation(0.8, 11, 13);
  const vignette = createZoomInterpolation(0.5, 11, 13);

  return (
    <Map
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      center={[-74.006, 40.7128]}
      zoom={12}
    >
      <MapRain
        density={density}
        vignette={vignette}
        intensity={1.0}
        color="#a8adbc"
      />
    </Map>
  );
}`}
            language="tsx"
            showCopyButton={false}
          />
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
