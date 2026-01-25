import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { CovidSpreadExample } from "../_components/examples/covid-spread-example"
import { FlightRoutesExample } from "../_components/examples/flight-routes-example"
import { NetworkHubExample } from "../_components/examples/network-hub-example"
import { TradeRoutesExample } from "../_components/examples/trade-routes-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Animated Radial Lines",
}

const RadialLinesPage = () => {
  const covidSpreadSource = getExampleSource("covid-spread-example.tsx")
  const flightRoutesSource = getExampleSource("flight-routes-example.tsx")
  const networkHubSource = getExampleSource("network-hub-example.tsx")
  const tradeRoutesSource = getExampleSource("trade-routes-example.tsx")

  return (
    <DocsLayout
      title="Animated Radial Lines"
      description="Animated lines spreading from a central origin to multiple destinations."
      prev={{ title: "Animated Lines", href: "/docs/lines-animated" }}
      next={{ title: "Animated Arc", href: "/docs/arc-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the radial line component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-line-radial.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={covidSpreadSource}>
        <CovidSpreadExample />
      </ComponentPreview>

      <DocsSection title="Colored Destinations with Dashed Lines">
        <p>
          Each destination can have its own color by passing objects with <DocsCode>coordinates</DocsCode> and{" "}
          <DocsCode>color</DocsCode> properties. Use <DocsCode>dashArray</DocsCode> to create dashed line patterns.
        </p>
      </DocsSection>

      <ComponentPreview code={flightRoutesSource}>
        <FlightRoutesExample />
      </ComponentPreview>

      <DocsSection title="Custom Icons and Traveling Marker">
        <p>
          Add custom icons to origin and destination markers using <DocsCode>originMarkerIcon</DocsCode> and{" "}
          <DocsCode>destinationMarkerIcon</DocsCode>. Enable <DocsCode>showTravelingMarker</DocsCode> to show a marker
          traveling along the active line. Set <DocsCode>curvature=0</DocsCode> for straight lines.
        </p>
      </DocsSection>

      <ComponentPreview code={networkHubSource}>
        <NetworkHubExample />
      </ComponentPreview>

      <DocsSection title="Auto Curvature">
        <p>
          Set <DocsCode>curvature="auto"</DocsCode> to automatically calculate curvature based on the distance between
          origin and destination. Longer distances get more curve, shorter distances stay straighter. Adjust{" "}
          <DocsCode>curveSegments</DocsCode> to control smoothness (lower values for better performance).
        </p>
      </DocsSection>

      <ComponentPreview code={tradeRoutesSource}>
        <TradeRoutesExample />
      </ComponentPreview>

      <DocsSection title="Line Curvature">
        <p>
          Control the curvature of lines using the <DocsCode>curvature</DocsCode> prop. A value of 0 creates straight
          lines, while higher values (0.3-0.5) create more pronounced curves. Set to <DocsCode>"auto"</DocsCode> to
          automatically calculate curvature based on distance.
        </p>
      </DocsSection>

      <DocsSection title="Staggered Animation">
        <p>
          Lines animate sequentially with a configurable delay between each. Use <DocsCode>staggerDelay</DocsCode> to
          control the timing between lines starting their animation, and <DocsCode>duration</DocsCode> for how long each
          line takes to draw.
        </p>
      </DocsSection>

      <DocsSection title="Origin Marker">
        <p>
          The origin point can display a marker with an optional pulse effect. Customize with{" "}
          <DocsCode>showOriginMarker</DocsCode>, <DocsCode>originMarkerColor</DocsCode>, and{" "}
          <DocsCode>originMarkerPulse</DocsCode>. You can also provide a custom icon via{" "}
          <DocsCode>originMarkerIcon</DocsCode>.
        </p>
      </DocsSection>

      <DocsSection title="Destination Markers">
        <p>
          Destination markers appear when their respective lines complete. Control visibility with{" "}
          <DocsCode>showDestinationMarkers</DocsCode> and customize appearance with{" "}
          <DocsCode>destinationMarkerColor</DocsCode> or <DocsCode>destinationMarkerIcon</DocsCode>.
        </p>
      </DocsSection>

      <DocsSection title="Properties">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>id</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Unique identifier for the radial lines</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>origin</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Central origin point [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>destinations</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">Array</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of destination coordinates or objects with coordinates and optional color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Default line color for all lines</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>width</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2</TableCell>
                <TableCell>Line width in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>opacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.8</TableCell>
                <TableCell>Line opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>curvature</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number | "auto"</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Line curvature (0 = straight, higher = more curved)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>curveSegments</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">50</TableCell>
                <TableCell>Number of segments for curve smoothness</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Animation duration per line in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>staggerDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Delay between each line starting in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Auto-start animation on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Loop animation continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1000</TableCell>
                <TableCell>Delay before restarting loop in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showOriginMarker</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show marker at the origin point</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>originMarkerColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#ef4444"</TableCell>
                <TableCell>Color of the origin marker</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>originMarkerIcon</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">ReactNode</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Custom icon for origin marker</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>originMarkerPulse</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show pulse effect around origin marker</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showDestinationMarkers</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show markers at destinations when lines complete</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>destinationMarkerColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Color of destination markers (defaults to line color)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showTravelingMarker</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Show marker traveling along the active line</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onLineComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">(index, coords) =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Callback when each line completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Callback when all lines complete</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Disease Spread</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize how diseases, trends, or information spread from an origin
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Flight Routes</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Show flight connections from a hub airport to destinations
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Supply Chain</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize distribution from warehouses to retail locations
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Network Topology</h4>
            <p className="text-xs text-muted-foreground mt-1">Display data flow from central servers to edge nodes</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Migration Patterns</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Show population movement from a region to various destinations
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Trade Routes</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize export/import connections from a central port
            </p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Performance Tips">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Limit destinations to 20-30 for smooth performance</li>
          <li>
            Reduce <DocsCode>curveSegments</DocsCode> for distant destinations (30-40 is often sufficient)
          </li>
          <li>
            Increase <DocsCode>staggerDelay</DocsCode> to reduce simultaneous animations
          </li>
          <li>
            Disable markers with <DocsCode>showDestinationMarkers=false</DocsCode> for better performance
          </li>
          <li>
            Use <DocsCode>autoStart=false</DocsCode> and trigger manually for user-initiated animations
          </li>
        </ul>
      </DocsSection>
    </DocsLayout>
  )
}

export default RadialLinesPage
