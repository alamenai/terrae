import { DocsLayout, DocsSection, DocsCode, NewBadge } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { ArcFlightExample } from "../_components/examples/arc-flight-example"
import { ArcDeliveryExample } from "../_components/examples/arc-delivery-example"
import { ArcHeightExample } from "../_components/examples/arc-height-example"
import { ArcDashedExample } from "../_components/examples/arc-dashed-example"
import { ArcHeadTypesExample } from "../_components/examples/arc-head-types-example"
import { ArcWithMarkersExample } from "../_components/examples/arc-with-markers-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Animated Arc",
}

const ArcAnimatedPage = () => {
  const flightSource = getExampleSource("arc-flight-example.tsx")
  const deliverySource = getExampleSource("arc-delivery-example.tsx")
  const heightSource = getExampleSource("arc-height-example.tsx")
  const dashedSource = getExampleSource("arc-dashed-example.tsx")
  const headTypesSource = getExampleSource("arc-head-types-example.tsx")
  const markersSource = getExampleSource("arc-with-markers-example.tsx")

  return (
    <DocsLayout
      title="Animated Arc"
      description="Visualize point-to-point connections with animated parabolic arcs."
      prev={{ title: "Animated Radial Lines", href: "/docs/lines-radial" }}
      next={{ title: "Animated Markers", href: "/docs/markers-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the animated arc component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-arc-animated.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={flightSource}>
        <ArcFlightExample />
      </ComponentPreview>

      <DocsSection title="Curve Height">
        <p>
          The <DocsCode>height</DocsCode> prop controls how much the arc curves away from a straight line. It{"'"}s a
          multiplier relative to the distance between origin and destination. Use 0 for a straight line, or values like
          0.3-0.5 for visible curves.
        </p>
      </DocsSection>

      <ComponentPreview code={heightSource}>
        <ArcHeightExample />
      </ComponentPreview>

      <DocsSection title="Custom Styling">
        <p>
          Customize the arc appearance with <DocsCode>color</DocsCode> and <DocsCode>width</DocsCode>. The head marker
          follows the arc tip during animation and uses the same color as the arc.
        </p>
      </DocsSection>

      <ComponentPreview code={deliverySource}>
        <ArcDeliveryExample />
      </ComponentPreview>

      <DocsSection title="Dashed Lines">
        <p>
          Use <DocsCode>dashArray</DocsCode> to create dashed line patterns. The array specifies [dash length, gap
          length] in pixels.
        </p>
      </DocsSection>

      <ComponentPreview code={dashedSource}>
        <ArcDashedExample />
      </ComponentPreview>

      <DocsSection title="Head Types">
        <p>
          Use <DocsCode>headType</DocsCode> to change the shape of the traveling marker. Options are{" "}
          <DocsCode>"circle"</DocsCode> (default), <DocsCode>"arrow"</DocsCode>, <DocsCode>"square"</DocsCode>, or{" "}
          <DocsCode>"none"</DocsCode>. Control the size with <DocsCode>headSize</DocsCode>.
        </p>
      </DocsSection>

      <ComponentPreview code={headTypesSource}>
        <ArcHeadTypesExample />
      </ComponentPreview>

      <DocsSection title="Origin & Destination Markers">
        <p>
          Enable <DocsCode>showOriginMarker</DocsCode> and <DocsCode>showDestinationMarker</DocsCode> to display dots at
          the start and end points. Customize their colors with <DocsCode>originMarkerColor</DocsCode> and{" "}
          <DocsCode>destinationMarkerColor</DocsCode>.
        </p>
      </DocsSection>

      <ComponentPreview code={markersSource}>
        <ArcWithMarkersExample />
      </ComponentPreview>

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
                <TableCell>Unique identifier for the arc</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>origin</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Starting point [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>destination</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Ending point [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Arc line color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>width</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4</TableCell>
                <TableCell>Line width in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>opacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Line opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>dashArray</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Dash pattern [dash, gap]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>height</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Curve height multiplier (0 = straight)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>segments</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">50</TableCell>
                <TableCell>Curve smoothness (more = smoother)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Animation duration in ms</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Loop the animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">500</TableCell>
                <TableCell>Delay between loops in ms</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>headType</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">"none" | "circle" | "square" | "arrow"</TableCell>
                <TableCell className="text-muted-foreground">"circle"</TableCell>
                <TableCell>Shape of the traveling marker</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>headSize</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">16</TableCell>
                <TableCell>Size of the head marker in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>showOriginMarker</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Show marker at origin point</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>originMarkerColor</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Origin marker color (defaults to line color)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>showDestinationMarker</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Show marker at destination when animation completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>destinationMarkerColor</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Destination marker color (defaults to line color)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when animation completes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Flight Tracking</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Display aircraft trajectories between airports on a globe.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Trade & Logistics</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize import/export flows and supply chain connections.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Migration Patterns</h4>
            <p className="text-xs text-muted-foreground mt-1">Show population or wildlife movement between regions.</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Satellite Links</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Represent communication signals between ground stations.
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default ArcAnimatedPage
