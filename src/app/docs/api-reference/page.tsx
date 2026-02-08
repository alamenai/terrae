import { DocsLayout, DocsSection, DocsCode, DocsLink, DocsNote, DocsPropTable } from "../_components/docs"
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
      <MarkerAvatar src="..." />
      <MarkerAvatarPin src="..." />
    </MarkerContent>
    <MarkerPopup />
    <MarkerTooltip />
  </MapMarker>
  <MapMarkerAnimated id="animated" path={[[lng, lat], ...]} />

  {/* Popup */}
  <MapPopup coordinates={[lng, lat]} />

  {/* Controls */}
  <MapControls position="bottom-right">
    <MapZoom />
    <MapOrientation />
    <MapGeolocate />
    <MapFullscreen />
  </MapControls>
  <MapCompass />

  {/* Features */}
  <MapMiniMap />
  <MapLine coordinates={[[lng, lat], ...]} />
  <MapPolygon coordinates={[[lng, lat], ...]} />
  <MapCircle center={[lng, lat]} radius={1000} />
  <MapAnimatedCircle id="zone" center={[lng, lat]} radius={1000} />
  <MapLineAnimated id="route" path={[[lng, lat], ...]} />
  <MapLineRadial id="radial" origin={[lng, lat]} destinations={[[lng, lat], ...]} />
  <MapArcAnimated id="arc" origin={[lng, lat]} destination={[lng, lat]} />
  <MapCameraFollow path={[[lng, lat], ...]} />
  <MapAnimatedPolygon id="zone" coordinates={[[lng, lat], ...]} />
  <MapCircleCluster data={geoJsonData} />
  <MapChoropleth data={geoJsonData} valueProperty="density" colorScale={colorScale} />
  <MapAnimatedPulse id="pulse" size={100} coordinates={[lng, lat]} />
  <MapImage id="overlay" url="..." coordinates={[...]} />
  <MapRasterVideo id="video" urls={[...]} coordinates={[...]} />
  <MapBlurArea coordinates={[[lng, lat], ...]} />
  <MapTargetingReticle coordinates={[lng, lat]} />
  <MapRain />
  <MapSnow />
  <MapSandstorm />

  {/* Effects */}
  <MapFire id="fire" coordinates={[lng, lat]} />
  <MapExplosion id="explosion" coordinates={[lng, lat]} />
  <MapCyclone id="cyclone" coordinates={[lng, lat]} />
  <MapMeteor id="meteor" target={[lng, lat]} />
  <MapLightning id="lightning" coordinates={[lng, lat]} />
  <MapSteam id="steam" coordinates={[lng, lat]} />
  <MapTsunami id="tsunami" origin={[lng, lat]} target={[lng, lat]} />

  {/* Overlays */}
  <MapMusicDisc coordinates={[lng, lat]} />
  <MapAnimatedFootprint path={[[lng, lat], ...]} />
  <MapGrid />
  <MapRadar id="radar" coordinates={[lng, lat]} />
  <MapWatermark>TEXT</MapWatermark>
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
        <strong>Tip:</strong> This library supports both{" "}
        <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/" external>
          Mapbox GL JS
        </DocsLink>{" "}
        and{" "}
        <DocsLink href="https://maplibre.org/maplibre-gl-js/docs/" external>
          MapLibre GL JS
        </DocsLink>
        . Most components extend native map options. Refer to the{" "}
        <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/api/map/" external>
          Mapbox Map API
        </DocsLink>{" "}
        or{" "}
        <DocsLink href="https://maplibre.org/maplibre-gl-js/docs/API/" external>
          MapLibre API
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
          The root container that initializes the map and provides context to all child components. Supports both Mapbox
          GL JS and MapLibre GL JS. Automatically handles theme switching between light and dark modes.
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
            },
            {
              name: "autoRotate",
              type: "boolean",
              default: "false",
              description: 'Enables automatic rotation. Only works with projection="globe".',
            },
            {
              name: "rotateSpeed",
              type: "number",
              default: "3",
              description: "Rotation speed in degrees per second when autoRotate is enabled.",
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
          Geolocate control to find and fly to user&apos;s current location. Must be used inside{" "}
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

      {/* MapCompass */}
      <DocsSection title="MapCompass">
        <p>
          Interactive compass with drag-to-rotate functionality. Dragging the compass rotates the map bearing. Must be
          used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "size",
              type: '"sm" | "md" | "lg" | "xl" | number',
              default: '"md"',
              description: "Compass size. T-shirt sizes map to 48, 64, 80, 96 pixels respectively.",
            },
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"top-right"',
              description: "Position of the compass on the map.",
            },
            {
              name: "showCardinals",
              type: "boolean",
              default: "true",
              description: "Show N, S, E, W cardinal direction labels.",
            },
            {
              name: "showRing",
              type: "boolean",
              default: "true",
              description: "Show outer ring with degree tick marks.",
            },
            {
              name: "showBearing",
              type: "boolean",
              default: "false",
              description: "Display current bearing in degrees below the compass.",
            },
            {
              name: "autoRotate",
              type: "boolean",
              default: "false",
              description: "Enable automatic rotation of the compass.",
            },
            {
              name: "autoRotateSpeed",
              type: "number",
              default: "2",
              description: "Speed of auto rotation in degrees per frame.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
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

      {/* MapMarkerAnimated */}
      <DocsSection title="MapMarkerAnimated">
        <p>
          Renders an animated marker that moves along a path. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the animated marker.",
            },
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] pairs defining the path.",
            },
            {
              name: "color",
              type: "string",
              default: '"#3b82f6"',
              description: "Marker color.",
            },
            {
              name: "size",
              type: "number",
              default: "10",
              description: "Marker radius in pixels.",
            },
            {
              name: "duration",
              type: "number",
              default: "5000",
              description: "Animation duration in milliseconds.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop animation continuously.",
            },
            {
              name: "showPath",
              type: "boolean",
              default: "false",
              description: "Show the path/route line.",
            },
            {
              name: "pathColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Path line color.",
            },
            {
              name: "pathWidth",
              type: "number",
              default: "4",
              description: "Path line width in pixels.",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when animation completes.",
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

      {/* MapPolygon */}
      <DocsSection title="MapPolygon">
        <p>
          Renders a filled polygon on the map. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] coordinate pairs defining the polygon vertices.",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Fill color of the polygon.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0.4",
              description: "Fill opacity (0 to 1).",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Stroke/outline color.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Stroke width in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "1",
              description: "Stroke opacity (0 to 1).",
            },
            {
              name: "dashArray",
              type: "[number, number]",
              description: "Dash pattern [dash length, gap length] for dashed strokes.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCircle */}
      <DocsSection title="MapCircle">
        <p>
          Renders a geographic circle on the map with a center point and radius in meters. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "center",
              type: "[number, number]",
              description: "Center point [longitude, latitude] of the circle.",
            },
            {
              name: "radius",
              type: "number",
              description: "Radius of the circle in meters.",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Fill color of the circle.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0",
              description: "Fill opacity (0 to 1).",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Stroke/outline color.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Stroke width in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "1",
              description: "Stroke opacity (0 to 1).",
            },
            {
              name: "dashArray",
              type: "[number, number]",
              description: "Dash pattern [dash length, gap length] for dashed strokes.",
            },
            {
              name: "segments",
              type: "number",
              default: "64",
              description: "Number of segments for circle smoothness.",
            },
            {
              name: "draggable",
              type: "boolean",
              default: "false",
              description: "Enable dragging to reposition the circle.",
            },
            {
              name: "cursor",
              type: "string",
              default: '"grab"',
              description: "Cursor style when hovering over draggable circle.",
            },
            {
              name: "onDragStart",
              type: "(center: [number, number]) => void",
              description: "Callback when drag begins.",
            },
            {
              name: "onDrag",
              type: "(center: [number, number]) => void",
              description: "Callback during drag with new center coordinates.",
            },
            {
              name: "onDragEnd",
              type: "(center: [number, number]) => void",
              description: "Callback when drag ends with final center coordinates.",
            },
          ]}
        />
      </DocsSection>

      {/* MapAnimatedCircle */}
      <DocsSection title="MapAnimatedCircle">
        <p>
          Renders an animated circle with drawing outline and fill effects. Must be used inside <DocsCode>Map</DocsCode>
          .
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the animated circle.",
            },
            {
              name: "center",
              type: "[number, number]",
              description: "Center point [longitude, latitude] of the circle.",
            },
            {
              name: "radius",
              type: "number",
              description: "Radius of the circle in meters.",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color of the circle outline.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Width of the circle outline in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "1",
              description: "Opacity of the circle outline (0-1).",
            },
            {
              name: "strokeDashArray",
              type: "number[]",
              default: "-",
              description: "Dash pattern [dash, gap] for dashed outline effect.",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color of the circle fill.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0.3",
              description: "Target opacity of the circle fill (0-1).",
            },
            {
              name: "duration",
              type: "number",
              default: "2000",
              description: "Duration of outline drawing animation in milliseconds.",
            },
            {
              name: "fillDuration",
              type: "number",
              default: "1000",
              description: "Duration of fill animation in milliseconds.",
            },
            {
              name: "animationMode",
              type: '"draw" | "fill"',
              default: '"draw"',
              description: "Animation mode: outline only or outline then fill.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the animation continuously.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "1000",
              description: "Delay before restarting loop in milliseconds.",
            },
            {
              name: "segments",
              type: "number",
              default: "64",
              description: "Number of segments for circle smoothness.",
            },
            {
              name: "onDrawComplete",
              type: "() => void",
              description: "Callback when outline drawing completes.",
            },
            {
              name: "onFillComplete",
              type: "() => void",
              description: "Callback when fill animation completes.",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when entire animation completes.",
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

      {/* MapChoropleth */}
      <DocsSection title="MapChoropleth">
        <p>
          Colors geographic regions based on data values. Supports GeoJSON data with Polygon or MultiPolygon features.
          Must be used inside <DocsCode>Map</DocsCode>. Supports a generic type parameter for typed feature properties:{" "}
          <DocsCode>{"MapChoropleth<MyProperties>"}</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "data",
              type: "string | GeoJSON.FeatureCollection",
              description: "GeoJSON URL or FeatureCollection with Polygon/MultiPolygon features.",
            },
            {
              name: "valueProperty",
              type: "string",
              description: "Property name in feature.properties to use for coloring.",
            },
            {
              name: "colorScale",
              type: "ChoroplethColorScale",
              description:
                "Color scale configuration: { stops: [{ value, color }], interpolation?: 'linear' | 'step', nullColor? }.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0.8",
              description: "Fill opacity (0-1).",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#ffffff"',
              description: "Border color between regions.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Border width in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "1",
              description: "Border opacity (0-1).",
            },
            {
              name: "hoverEnabled",
              type: "boolean",
              default: "false",
              description: "Enable hover highlighting effect.",
            },
            {
              name: "hoverFillOpacity",
              type: "number",
              default: "1",
              description: "Fill opacity when hovered.",
            },
            {
              name: "hoverStrokeColor",
              type: "string",
              default: '"#000000"',
              description: "Border color when hovered.",
            },
            {
              name: "hoverStrokeWidth",
              type: "number",
              default: "4",
              description: "Border width when hovered.",
            },
            {
              name: "onClick",
              type: "(event: ChoroplethClickEvent) => void",
              description: "Callback when a region is clicked. Event includes feature, value, and coordinates.",
            },
            {
              name: "onHover",
              type: "(event: ChoroplethHoverEvent) => void",
              description: "Callback when hovering over regions. Event includes feature, value, and coordinates.",
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

      {/* MapAnimatedPolygon */}
      <DocsSection title="MapAnimatedPolygon">
        <p>
          Renders an animated polygon with drawing outline and fill effects. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the polygon.",
            },
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] pairs defining polygon vertices.",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color of the polygon outline.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Width of the polygon outline in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "1",
              description: "Opacity of the polygon outline (0-1).",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color of the polygon fill.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0.3",
              description: "Target opacity of the polygon fill (0-1).",
            },
            {
              name: "duration",
              type: "number",
              default: "2000",
              description: "Duration of outline drawing animation in milliseconds.",
            },
            {
              name: "fillDuration",
              type: "number",
              default: "1000",
              description: "Duration of fill animation in milliseconds.",
            },
            {
              name: "animationMode",
              type: '"draw" | "fill" | "draw-then-fill"',
              default: '"draw-then-fill"',
              description: "Animation sequence mode.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the animation continuously.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "1000",
              description: "Delay before restarting loop in milliseconds.",
            },
            {
              name: "onDrawComplete",
              type: "() => void",
              description: "Callback when outline drawing completes.",
            },
            {
              name: "onFillComplete",
              type: "() => void",
              description: "Callback when fill animation completes.",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when entire animation completes.",
            },
          ]}
        />
      </DocsSection>

      {/* MapMiniMap */}
      <DocsSection title="MapMiniMap">
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
              description: "Custom map style URL for the minimap. Overrides theme-based styles.",
            },
            {
              name: "styles",
              type: "MapThemeStyles",
              description: "Theme-aware styles object with light/dark variants. Automatically switches based on theme.",
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
            },
            {
              name: "draggable",
              type: "boolean",
              default: "false",
              description: "Allow users to drag the minimap anywhere within the map.",
            },
          ]}
        />
      </DocsSection>

      {/* MapBlurArea */}
      <DocsSection title="MapBlurArea">
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

      {/* MapTargetingReticle */}
      <DocsSection title="MapTargetingReticle">
        <p>
          Renders a targeting reticle overlay with corner brackets that can track and lock onto targets. Must be used
          inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Current reticle position [longitude, latitude].",
            },
            {
              name: "target",
              type: "[number, number]",
              description: "Target coordinates to track towards.",
            },
            {
              name: "size",
              type: "number",
              default: "120",
              description: "Reticle size in pixels.",
            },
            {
              name: "bracketLength",
              type: "number",
              default: "24",
              description: "Length of corner brackets in pixels.",
            },
            {
              name: "bracketThickness",
              type: "number",
              default: "2",
              description: "Thickness of corner brackets in pixels.",
            },
            {
              name: "gap",
              type: "number",
              default: "8",
              description: "Gap between brackets and reticle edge in pixels.",
            },
            {
              name: "color",
              type: "string",
              default: '"rgba(59, 130, 246, 0.9)"',
              description: "Default reticle color.",
            },
            {
              name: "lockedColor",
              type: "string",
              default: '"rgba(34, 197, 94, 0.9)"',
              description: "Color when locked on target.",
            },
            {
              name: "locked",
              type: "boolean",
              default: "false",
              description: "Whether the reticle is locked on target.",
            },
            {
              name: "trackingSpeed",
              type: "number",
              default: "0.02",
              description: "Speed of tracking interpolation (0-1).",
            },
            {
              name: "showCrosshair",
              type: "boolean",
              default: "true",
              description: "Show crosshair lines in the center.",
            },
            {
              name: "showCoordinates",
              type: "boolean",
              default: "false",
              description: "Display coordinates below the reticle.",
            },
            {
              name: "onLocked",
              type: "() => void",
              description: "Callback when reticle locks onto target.",
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

      {/* MapLineRadial */}
      <DocsSection title="MapLineRadial">
        <p>
          Renders animated curved lines spreading from a central origin to multiple destinations. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the radial lines.",
            },
            {
              name: "origin",
              type: "[number, number]",
              description: "Origin coordinates [longitude, latitude].",
            },
            {
              name: "destinations",
              type: "RadialDestination[]",
              description: "Array of destinations. Each can be [lng, lat] or { coordinates, color?, label? }.",
            },
            {
              name: "color",
              type: "string",
              default: '"#3b82f6"',
              description: "Default line color.",
            },
            {
              name: "width",
              type: "number",
              default: "2",
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
            {
              name: "curvature",
              type: 'number | "auto"',
              default: "0.3",
              description: 'Curve intensity (0-1) or "auto" to calculate based on distance.',
            },
            {
              name: "curveSegments",
              type: "number",
              default: "50",
              description: "Number of segments for smooth curves.",
            },
            {
              name: "duration",
              type: "number",
              default: "2000",
              description: "Animation duration per line in milliseconds.",
            },
            {
              name: "staggerDelay",
              type: "number",
              default: "200",
              description: "Delay between starting each line animation.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the animation continuously.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "1000",
              description: "Delay before restarting loop in milliseconds.",
            },
            {
              name: "showOriginMarker",
              type: "boolean",
              default: "true",
              description: "Show marker at origin point.",
            },
            {
              name: "originMarkerColor",
              type: "string",
              default: '"#ef4444"',
              description: "Origin marker color.",
            },
            {
              name: "originMarkerIcon",
              type: "ReactNode",
              description: "Custom origin marker icon.",
            },
            {
              name: "originMarkerPulse",
              type: "boolean",
              default: "true",
              description: "Show pulse animation on origin marker.",
            },
            {
              name: "showDestinationMarkers",
              type: "boolean",
              default: "true",
              description: "Show markers at destination points.",
            },
            {
              name: "destinationMarkerColor",
              type: "string",
              description: "Destination marker color (defaults to line color).",
            },
            {
              name: "destinationMarkerIcon",
              type: "ReactNode",
              description: "Custom destination marker icon.",
            },
            {
              name: "showTravelingMarker",
              type: "boolean",
              default: "false",
              description: "Show marker traveling along the active line.",
            },
            {
              name: "travelingMarkerColor",
              type: "string",
              description: "Traveling marker color (defaults to line color).",
            },
            {
              name: "travelingMarkerIcon",
              type: "ReactNode",
              description: "Custom traveling marker icon.",
            },
            {
              name: "onLineComplete",
              type: "(index: number, destination: [number, number]) => void",
              description: "Callback when a line animation completes.",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when all line animations complete.",
            },
          ]}
        />
      </DocsSection>

      {/* MapArcAnimated */}
      <DocsSection title="MapArcAnimated">
        <p>
          Renders an animated curved arc between two points. Useful for visualizing flights, deliveries, and
          point-to-point connections. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the arc.",
            },
            {
              name: "origin",
              type: "[number, number]",
              description: "Starting point coordinates [longitude, latitude].",
            },
            {
              name: "destination",
              type: "[number, number]",
              description: "Ending point coordinates [longitude, latitude].",
            },
            {
              name: "color",
              type: "string",
              default: '"#3b82f6"',
              description: "Arc line color.",
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
              description: "Dash pattern [dash length, gap length] for dashed arcs.",
            },
            {
              name: "height",
              type: "number",
              default: "0.3",
              description: "Curve height multiplier (0 = straight line, higher = more curved).",
            },
            {
              name: "segments",
              type: "number",
              default: "50",
              description: "Number of segments for curve smoothness.",
            },
            {
              name: "duration",
              type: "number",
              default: "2000",
              description: "Animation duration in milliseconds.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the animation continuously.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "500",
              description: "Delay before restarting loop in milliseconds.",
            },
            {
              name: "headType",
              type: '"none" | "circle" | "square" | "arrow"',
              default: '"circle"',
              description: "Shape of the traveling marker at the arc tip.",
            },
            {
              name: "headSize",
              type: "number",
              default: "16",
              description: "Size of the head marker in pixels.",
            },
            {
              name: "showOriginMarker",
              type: "boolean",
              default: "false",
              description: "Show marker at the origin point.",
            },
            {
              name: "originMarkerColor",
              type: "string",
              description: "Origin marker color (defaults to arc color).",
            },
            {
              name: "showDestinationMarker",
              type: "boolean",
              default: "false",
              description: "Show marker at destination when animation completes.",
            },
            {
              name: "destinationMarkerColor",
              type: "string",
              description: "Destination marker color (defaults to arc color).",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when animation completes.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCameraFollow */}
      <DocsSection title="MapCameraFollow">
        <p>
          Animates the camera along a path of coordinates for immersive fly-through experiences. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "path",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] coordinates for the camera to follow. Required.",
            },
            {
              name: "duration",
              type: "number",
              default: "20000",
              description: "Animation duration in milliseconds.",
            },
            {
              name: "zoom",
              type: "number",
              default: "14",
              description: "Camera zoom level during flight.",
            },
            {
              name: "pitch",
              type: "number",
              default: "60",
              description: "Camera tilt angle (0-85 degrees).",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the animation continuously.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "1000",
              description: "Delay before restarting loop in milliseconds.",
            },
            {
              name: "onComplete",
              type: "() => void",
              description: "Callback when animation completes.",
            },
            {
              name: "marker",
              type: "boolean | ReactNode",
              description: "Navigation marker. Use true for default arrow, or pass a custom React element.",
            },
            {
              name: "markerSize",
              type: "number",
              default: "48",
              description: "Size of the default navigation marker in pixels.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCompare */}
      <DocsSection title="MapCompare">
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
            },
            {
              name: "showLabels",
              type: "boolean",
              default: "false",
              description: "Show Before/After or Top/Bottom labels on each map panel.",
            },
            {
              name: "loader",
              type: "ReactNode",
              description: "Custom loading component.",
            },
          ]}
        />
      </DocsSection>

      {/* MapSync */}
      <DocsSection title="MapSync">
        <p>
          Displays 2 or 4 synchronized maps where panning, zooming, or rotating one map updates all others in real-time.
          This component creates its own map instances and does not require a parent <DocsCode>Map</DocsCode> component.
        </p>
        <DocsPropTable
          props={[
            {
              name: "accessToken",
              type: "string",
              description: "Mapbox access token. Required.",
            },
            {
              name: "maps",
              type: "MapConfig[]",
              description: "Array of 2 or 4 map configurations. Each config: { style?, styles?, label? }.",
            },
            {
              name: "layout",
              type: '"horizontal" | "vertical" | "grid"',
              default: '"horizontal"',
              description: "Layout arrangement. Grid requires 4 maps for a 2x2 layout.",
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
              name: "showLabels",
              type: "boolean",
              default: "false",
              description: "Show labels on each map panel.",
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

      {/* MapSnow */}
      <DocsSection title="MapSnow">
        <p>
          Adds an animated snowfall weather effect overlay to the map. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "intensity",
              type: "number",
              default: "1",
              description: "Snowfall intensity multiplier.",
            },
            {
              name: "particleCount",
              type: "number",
              default: "150",
              description: "Number of snowflake particles.",
            },
            {
              name: "color",
              type: "string",
              default: '"#ffffff"',
              description: "Snowflake color.",
            },
            {
              name: "windSpeed",
              type: "number",
              default: "0.5",
              description: "Horizontal wind speed affecting drift.",
            },
            {
              name: "windDirection",
              type: "number",
              default: "0",
              description: "Wind direction in degrees.",
            },
            {
              name: "fallSpeed",
              type: "number",
              default: "1",
              description: "Vertical fall speed multiplier.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
          ]}
        />
      </DocsSection>

      {/* MapSandstorm */}
      <DocsSection title="MapSandstorm">
        <p>
          Adds an atmospheric sandstorm effect with horizontal particle movement and reduced visibility. Must be used
          inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "intensity",
              type: "number",
              default: "1",
              description: "Sandstorm intensity multiplier.",
            },
            {
              name: "particleCount",
              type: "number",
              default: "200",
              description: "Number of sand particles.",
            },
            {
              name: "color",
              type: "string",
              default: '"#d4a574"',
              description: "Sand particle color.",
            },
            {
              name: "windSpeed",
              type: "number",
              default: "4",
              description: "Horizontal wind speed.",
            },
            {
              name: "windDirection",
              type: "number",
              default: "0",
              description: "Wind direction in degrees.",
            },
            {
              name: "visibility",
              type: "number",
              default: "0.3",
              description: "Visibility level (0 = no visibility, 1 = clear).",
            },
            {
              name: "turbulence",
              type: "number",
              default: "0.5",
              description: "Turbulence amount affecting particle movement.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
          ]}
        />
      </DocsSection>

      {/* MapFire */}
      <DocsSection title="MapFire">
        <p>
          Renders a realistic animated fire effect with particle simulation at map coordinates. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Use <DocsCode>useFireControl</DocsCode> hook to control programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the fire effect.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for the fire position.",
            },
            {
              name: "size",
              type: "number",
              default: "120",
              description: "Fire canvas size in pixels.",
            },
            {
              name: "intensity",
              type: "number",
              default: "1",
              description: "Fire intensity multiplier.",
            },
            {
              name: "particleCount",
              type: "number",
              default: "50",
              description: "Number of fire particles.",
            },
            {
              name: "baseColor",
              type: "string",
              default: '"#ffcc00"',
              description: "Base flame color.",
            },
            {
              name: "tipColor",
              type: "string",
              default: '"#ff3300"',
              description: "Flame tip color.",
            },
            {
              name: "spread",
              type: "boolean",
              default: "false",
              description: "Enable fire spreading to nearby points.",
            },
            {
              name: "spreadSpeed",
              type: "number",
              default: "2000",
              description: "Time between spread points in milliseconds.",
            },
            {
              name: "spreadRadius",
              type: "number",
              default: "0.4",
              description: "Maximum spread radius as fraction of canvas size.",
            },
            {
              name: "maxSpreadPoints",
              type: "number",
              default: "8",
              description: "Maximum number of fire spread sources.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
          ]}
        />
      </DocsSection>

      {/* MapExplosion */}
      <DocsSection title="MapExplosion">
        <p>
          Renders an animated explosion burst effect with radial particles and flash. Supports burst and nuclear types.
          Must be used inside <DocsCode>Map</DocsCode>. Use <DocsCode>useExplosionControl</DocsCode> hook to trigger
          programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the explosion.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for the explosion.",
            },
            {
              name: "type",
              type: '"burst" | "nuclear"',
              default: '"burst"',
              description: "Explosion type. Nuclear creates a mushroom cloud effect.",
            },
            {
              name: "size",
              type: "number",
              default: "150",
              description: "Explosion canvas size in pixels.",
            },
            {
              name: "particleCount",
              type: "number",
              default: "60",
              description: "Number of explosion particles.",
            },
            {
              name: "duration",
              type: "number",
              default: "3000",
              description: "Explosion duration in milliseconds.",
            },
            {
              name: "coreColor",
              type: "string",
              default: '"#ffffff"',
              description: "Core flash color.",
            },
            {
              name: "outerColor",
              type: "string",
              default: '"#ff6600"',
              description: "Outer explosion color.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Trigger explosion automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the explosion animation.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "3000",
              description: "Delay before restarting loop in milliseconds.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCyclone */}
      <DocsSection title="MapCyclone">
        <p>
          Renders an animated cyclone funnel with swirling particles and debris. Supports movement along a path. Must be
          used inside <DocsCode>Map</DocsCode>. Use <DocsCode>useCycloneControl</DocsCode> hook to control
          programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the cyclone.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for the cyclone position.",
            },
            {
              name: "path",
              type: "[number, number][]",
              description: "Optional path for the cyclone to travel along.",
            },
            {
              name: "duration",
              type: "number",
              default: "10000",
              description: "Duration of path movement in milliseconds.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the path movement.",
            },
            {
              name: "size",
              type: "number",
              default: "200",
              description: "Cyclone canvas size in pixels.",
            },
            {
              name: "intensity",
              type: "number",
              default: "1",
              description: "Cyclone intensity multiplier.",
            },
            {
              name: "scale",
              type: "number",
              default: "1",
              description: "Cyclone visual scale (0.2 to 2).",
            },
            {
              name: "particleCount",
              type: "number",
              default: "120",
              description: "Number of swirling particles.",
            },
            {
              name: "funnelColor",
              type: "string",
              default: '"#8b9dc3"',
              description: "Funnel particle color.",
            },
            {
              name: "debrisColor",
              type: "string",
              default: '"#5c4033"',
              description: "Debris particle color.",
            },
            {
              name: "rotationSpeed",
              type: "number",
              default: "1",
              description: "Rotation speed multiplier.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
          ]}
        />
      </DocsSection>

      {/* MapMeteor */}
      <DocsSection title="MapMeteor">
        <p>
          Renders animated meteors falling from sky with fiery trail and impact effect. Supports single or shower mode.
          Must be used inside <DocsCode>Map</DocsCode>. Use <DocsCode>useMeteorControl</DocsCode> hook to control
          programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the meteor.",
            },
            {
              name: "target",
              type: "[number, number]",
              description: "Impact coordinates [longitude, latitude].",
            },
            {
              name: "size",
              type: "number",
              default: "300",
              description: "Effect canvas size in pixels.",
            },
            {
              name: "angle",
              type: "number",
              default: "45",
              description: "Meteor entry angle in degrees.",
            },
            {
              name: "speed",
              type: "number",
              default: "1500",
              description: "Fall duration in milliseconds.",
            },
            {
              name: "intensity",
              type: "number",
              default: "1",
              description: "Effect intensity multiplier.",
            },
            {
              name: "meteorColor",
              type: "string",
              default: '"#ffaa00"',
              description: "Meteor body color.",
            },
            {
              name: "trailColor",
              type: "string",
              default: '"#ff6600"',
              description: "Meteor trail color.",
            },
            {
              name: "impactColor",
              type: "string",
              default: '"#ffdd00"',
              description: "Impact flash color.",
            },
            {
              name: "tailLength",
              type: "number",
              default: "0.4",
              description: "Tail length as fraction of canvas size.",
            },
            {
              name: "meteorSize",
              type: "number",
              default: "8",
              description: "Meteor head radius in pixels.",
            },
            {
              name: "impactSize",
              type: "number",
              default: "0.3",
              description: "Impact radius as fraction of canvas size.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the meteor animation.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "2000",
              description: "Delay before restarting loop in milliseconds.",
            },
            {
              name: "shower",
              type: "boolean",
              default: "false",
              description: "Enable meteor shower mode with multiple meteors.",
            },
            {
              name: "showerCount",
              type: "number",
              default: "5",
              description: "Number of meteors in shower mode.",
            },
          ]}
        />
      </DocsSection>

      {/* MapLightning */}
      <DocsSection title="MapLightning">
        <p>
          Renders animated lightning bolt strikes with branching and flash effects. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Use <DocsCode>useLightningControl</DocsCode> hook to trigger strikes
          programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the lightning.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for the lightning strike zone.",
            },
            {
              name: "size",
              type: "number",
              default: "200",
              description: "Lightning canvas size in pixels.",
            },
            {
              name: "boltColor",
              type: "string",
              default: '"#ffffff"',
              description: "Lightning bolt color.",
            },
            {
              name: "flashColor",
              type: "string",
              default: '"#e0e8ff"',
              description: "Flash illumination color.",
            },
            {
              name: "flashIntensity",
              type: "number",
              default: "0.6",
              description: "Flash brightness (0-1).",
            },
            {
              name: "autoStrike",
              type: "boolean",
              default: "true",
              description: "Enable automatic periodic strikes.",
            },
            {
              name: "strikeInterval",
              type: "number",
              default: "4000",
              description: "Interval between auto-strikes in milliseconds.",
            },
            {
              name: "boltWidth",
              type: "number",
              default: "4",
              description: "Main bolt width in pixels.",
            },
            {
              name: "branchProbability",
              type: "number",
              default: "0.3",
              description: "Probability of branching at each segment (0-1).",
            },
          ]}
        />
      </DocsSection>

      {/* MapSteam */}
      <DocsSection title="MapSteam">
        <p>
          Renders a rising steam effect with wispy particle animation. Must be used inside <DocsCode>Map</DocsCode>. Use{" "}
          <DocsCode>useSteamControl</DocsCode> hook to control programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the steam effect.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for the steam position.",
            },
            {
              name: "size",
              type: "number",
              default: "100",
              description: "Steam canvas size in pixels.",
            },
            {
              name: "intensity",
              type: "number",
              default: "1",
              description: "Steam intensity multiplier.",
            },
            {
              name: "particleCount",
              type: "number",
              default: "40",
              description: "Number of steam particles.",
            },
            {
              name: "color",
              type: "string",
              default: '"#ffffff"',
              description: "Steam particle color.",
            },
            {
              name: "drift",
              type: "number",
              default: "0.4",
              description: "Horizontal drift amount.",
            },
            {
              name: "riseSpeed",
              type: "number",
              default: "1",
              description: "Vertical rise speed multiplier.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
          ]}
        />
      </DocsSection>

      {/* MapTsunami */}
      <DocsSection title="MapTsunami">
        <p>
          Renders an animated tsunami wave effect with incoming wave, crashing foam, and debris. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Use <DocsCode>useTsunamiControl</DocsCode> hook to control programmatically.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the tsunami.",
            },
            {
              name: "origin",
              type: "[number, number]",
              description: "Wave origin coordinates [longitude, latitude].",
            },
            {
              name: "target",
              type: "[number, number]",
              description: "Wave target/impact coordinates [longitude, latitude].",
            },
            {
              name: "size",
              type: "number",
              default: "300",
              description: "Tsunami canvas size in pixels.",
            },
            {
              name: "waveHeight",
              type: "number",
              default: "0.4",
              description: "Wave height as fraction of canvas size.",
            },
            {
              name: "waveWidth",
              type: "number",
              default: "0.8",
              description: "Wave width as fraction of canvas size.",
            },
            {
              name: "speed",
              type: "number",
              default: "3000",
              description: "Wave approach duration in milliseconds.",
            },
            {
              name: "waterColor",
              type: "string",
              default: '"#0077be"',
              description: "Wave water color.",
            },
            {
              name: "foamColor",
              type: "string",
              default: '"#ffffff"',
              description: "Wave foam/crest color.",
            },
            {
              name: "particleCount",
              type: "number",
              default: "40",
              description: "Number of foam and debris particles on crash.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the tsunami animation.",
            },
            {
              name: "loopDelay",
              type: "number",
              default: "2000",
              description: "Delay before restarting loop in milliseconds.",
            },
          ]}
        />
      </DocsSection>

      {/* MapMusicDisc */}
      <DocsSection title="MapMusicDisc">
        <p>
          Renders a rotating vinyl disc with floating music notes at map coordinates. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for disc position.",
            },
            {
              name: "size",
              type: "number",
              default: "64",
              description: "Disc diameter in pixels.",
            },
            {
              name: "image",
              type: "string",
              description: "Album cover image URL for the disc center.",
            },
            {
              name: "spinning",
              type: "boolean",
              default: "true",
              description: "Enable disc rotation animation.",
            },
            {
              name: "spinDuration",
              type: "number",
              default: "4000",
              description: "Full rotation duration in milliseconds.",
            },
            {
              name: "showNotes",
              type: "boolean",
              default: "true",
              description: "Show floating music note animations.",
            },
            {
              name: "noteColor",
              type: "string",
              default: '"#a855f7"',
              description: "Music note color.",
            },
            {
              name: "discColor",
              type: "string",
              default: '"#0a0a0a"',
              description: "Disc background color.",
            },
            {
              name: "centerColor",
              type: "string",
              default: '"#171717"',
              description: "Disc center/label area color.",
            },
            {
              name: "pitchAlignment",
              type: '"map" | "viewport" | "auto"',
              default: '"viewport"',
              description: "How the disc aligns with the map pitch.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the disc container.",
            },
          ]}
        />
      </DocsSection>

      {/* MapAnimatedFootprint */}
      <DocsSection title="MapAnimatedFootprint">
        <p>
          Renders animated footprint steps that walk along a path on the map. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "path",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] pairs defining the walking path.",
            },
            {
              name: "color",
              type: "string",
              default: '"currentColor"',
              description: "Footprint icon color.",
            },
            {
              name: "size",
              type: "number",
              default: "20",
              description: "Footprint icon size in pixels.",
            },
            {
              name: "stepSpacing",
              type: "number",
              default: "48",
              description: "Distance between steps in meters.",
            },
            {
              name: "staggerDelay",
              type: "number",
              default: "200",
              description: "Delay between revealing each step in milliseconds.",
            },
            {
              name: "duration",
              type: "number",
              default: "400",
              description: "Fade-in duration per step in milliseconds.",
            },
            {
              name: "autoStart",
              type: "boolean",
              default: "true",
              description: "Start animation automatically on mount.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Loop the walking animation.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for each footprint element.",
            },
          ]}
        />
      </DocsSection>

      {/* MapGrid */}
      <DocsSection title="MapGrid">
        <p>
          Renders a coordinate grid overlay with latitude/longitude lines and labels. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              default: '"map-grid"',
              description: "Unique identifier prefix for grid sources and layers.",
            },
            {
              name: "latitudeInterval",
              type: "number",
              default: "10",
              description: "Degrees between latitude lines.",
            },
            {
              name: "longitudeInterval",
              type: "number",
              default: "10",
              description: "Degrees between longitude lines.",
            },
            {
              name: "lineColor",
              type: "string",
              default: '"#ffffff"',
              description: "Grid line color.",
            },
            {
              name: "lineOpacity",
              type: "number",
              default: "0.3",
              description: "Grid line opacity (0-1).",
            },
            {
              name: "lineWidth",
              type: "number",
              default: "1",
              description: "Grid line width in pixels.",
            },
            {
              name: "showLabels",
              type: "boolean",
              default: "true",
              description: "Show coordinate labels at line intersections.",
            },
            {
              name: "labelColor",
              type: "string",
              default: '"#ffffff"',
              description: "Label text color.",
            },
            {
              name: "labelSize",
              type: "number",
              default: "10",
              description: "Label font size in pixels.",
            },
            {
              name: "labelBackground",
              type: "string",
              default: '"rgba(0, 0, 0, 0.5)"',
              description: "Label background color.",
            },
          ]}
        />
      </DocsSection>

      {/* MapRadar */}
      <DocsSection title="MapRadar">
        <p>
          Renders an animated radar sweep signal overlay at map coordinates. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the radar.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Coordinates [longitude, latitude] for the radar position.",
            },
            {
              name: "size",
              type: "number",
              default: "200",
              description: "Radar display size in pixels.",
            },
            {
              name: "color",
              type: "string",
              default: '"rgba(0, 255, 70, 1)"',
              description: "Sweep and ring color.",
            },
            {
              name: "gridColor",
              type: "string",
              default: '"rgba(0, 255, 70, 0.3)"',
              description: "Grid line color.",
            },
            {
              name: "backgroundColor",
              type: "string",
              default: '"rgba(0, 20, 0, 0.8)"',
              description: "Radar background color.",
            },
            {
              name: "duration",
              type: "number",
              default: "2000",
              description: "Full sweep rotation duration in milliseconds.",
            },
            {
              name: "rings",
              type: "number",
              default: "4",
              description: "Number of concentric range rings.",
            },
            {
              name: "showCrosshairs",
              type: "boolean",
              default: "true",
              description: "Show crosshair lines through the center.",
            },
          ]}
        />
      </DocsSection>

      {/* MapWatermark */}
      <DocsSection title="MapWatermark">
        <p>
          Renders a text watermark overlay on the map with configurable position. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Watermark content (typically text).",
            },
            {
              name: "position",
              type: '"center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top" | "bottom" | "left" | "right"',
              default: '"center"',
              description: "Watermark position on the map.",
            },
            {
              name: "className",
              type: "string",
              default: '"text-[8rem] font-extrabold..."',
              description: "CSS classes for styling. Defaults to large translucent text.",
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

      {/* MarkerAvatarPin */}
      <DocsSection title="MarkerAvatarPin">
        <p>
          Renders an avatar inside a teardrop/pin shape that points to the exact location. Must be used inside{" "}
          <DocsCode>MarkerContent</DocsCode>.
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
              default: "56",
              description: "Diameter of the circular avatar in pixels.",
            },
            {
              name: "borderWidth",
              type: "number",
              default: "4",
              description: "Border thickness in pixels.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the pin container.",
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
