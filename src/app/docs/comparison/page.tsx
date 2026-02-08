import { DocsLayout, DocsSection } from "../_components/docs"
import { CodeBlock } from "../_components/code-block"
import { ComparisonMapExample } from "../_components/examples/comparison-map-example"
import type { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Comparison",
  description: "See how Terrae simplifies Mapbox GL development with declarative components",
}

const imperativeCode = `import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-74.006, 40.7128],
  zoom: 12,
});

map.on('load', () => {
  // Add marker
  const el = document.createElement('div');
  el.id = 'marker';
  el.style.backgroundImage = 'url(marker.png)';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.backgroundSize = '100%';
  el.style.cursor = 'pointer';

  const marker = new mapboxgl.Marker(el)
    .setLngLat([-74.006, 40.7128])
    .addTo(map);

  // Add popup
  const popup = new mapboxgl.Popup({ offset: 25 })
    .setLngLat([-74.006, 40.7128])
    .setHTML('<h3>New York City</h3><p>The city that never sleeps</p>');

  el.addEventListener('click', () => {
    popup.addTo(map);
  });

  // Add line
  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-74.006, 40.7128],
          [-73.9857, 40.7484],
          [-73.9772, 40.7527],
        ],
      },
    },
  });

  map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#3b82f6',
      'line-width': 4,
    },
  });

  // Add controls
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.FullscreenControl()
  );
});`

const declarativeCode = `import { Map, MapMarker, MarkerContent, MarkerPopup, MapLine, MapControls, MapZoom, MapFullscreen } from "@/registry/map";

export function MyMap() {
  const route = [
    [-74.006, 40.7128],
    [-73.9857, 40.7484],
    [-73.9772, 40.7527],
  ];

  return (
    <Map
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      center={[-74.006, 40.7128]}
      zoom={12}
    >
      <MapMarker coordinates={[-74.006, 40.7128]}>
        <MarkerContent>
          <div className="size-8 rounded-full bg-blue-500 shadow-lg" />
        </MarkerContent>
        <MarkerPopup>
          <h3>New York City</h3>
          <p>The city that never sleeps</p>
        </MarkerPopup>
      </MapMarker>

      <MapLine 
        coordinates={route} 
        color="#3b82f6" 
        width={4} 
      />

      <MapControls position="bottom-right">
        <MapZoom />
        <MapFullscreen />
      </MapControls>
    </Map>
  );
}`

const ComparisonPage = () => {
  return (
    <DocsLayout
      title="Comparison"
      description="See the difference between imperative and declarative map development"
      prev={{ title: "Installation", href: "/docs/installation" }}
      next={{ title: "Components", href: "/docs/components" }}
    >
      <DocsSection>
        <p>
          Building interactive maps with raw Mapbox GL JS requires a lot of{" "}
          <a
            href="https://docs.mapbox.com/mapbox-gl-js/guides/install/"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            imperative code
          </a>
          , DOM manipulation, and careful state management. Terrae simplifies this with a declarative, component-based
          approach that feels natural in React.
        </p>
      </DocsSection>

      <DocsSection title="Example">
        <p className="mb-4">
          Let&apos;s create a map with a marker, popup, route line, and controls. Both approaches produce the exact same
          result:
        </p>
        <div className="h-75 sm:h-100 w-full rounded-xl overflow-hidden border">
          <ComparisonMapExample />
        </div>
      </DocsSection>

      <DocsSection title="Without Terrae">
        <p className="mb-4">
          Using Mapbox GL JS directly requires managing the map lifecycle, creating DOM elements manually, and writing
          imperative code for each feature.
        </p>
        <CodeBlock code={imperativeCode} language="typescript" />
      </DocsSection>

      <DocsSection title="With Terrae">
        <p className="mb-4">
          Terrae provides a React-friendly, declarative API. Simply compose components together and the library handles
          all the complexity under the hood.
        </p>
        <CodeBlock code={declarativeCode} language="tsx" />
      </DocsSection>

      <DocsSection title="Key Differences">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Without Terrae</TableHead>
              <TableHead>With Terrae</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Manual DOM creation and manipulation</TableCell>
              <TableCell>Declarative React components</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <a
                  href="https://docs.mapbox.com/mapbox-gl-js/guides/install/"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Imperative
                </a>{" "}
                API with many setup steps
              </TableCell>
              <TableCell>Familiar React patterns and hooks</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Complex lifecycle management</TableCell>
              <TableCell>Automatic lifecycle management</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Boilerplate code for common tasks</TableCell>
              <TableCell>Minimal code for common tasks</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Difficult to compose features together</TableCell>
              <TableCell>Easy to compose components</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>No built-in theme support</TableCell>
              <TableCell>Automatic light/dark theme support</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Limited type safety</TableCell>
              <TableCell>Type-safe with full TypeScript support</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DocsSection>
    </DocsLayout>
  )
}

export default ComparisonPage
