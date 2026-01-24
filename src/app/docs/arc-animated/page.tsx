import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { ArcFlightExample } from "../_components/examples/arc-flight-example"
import { ArcDeliveryExample } from "../_components/examples/arc-delivery-example"
import { ArcHeightExample } from "../_components/examples/arc-height-example"
import { ArcDashedExample } from "../_components/examples/arc-dashed-example"
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

  return (
    <DocsLayout
      title="Animated Arc"
      description="Draw an animated curved line between two points on the map."
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
          Customize the arc appearance with <DocsCode>color</DocsCode>, <DocsCode>width</DocsCode>, and{" "}
          <DocsCode>markerColor</DocsCode>. The marker follows the arc tip during animation.
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
                  <DocsCode>showMarker</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show traveling marker at arc tip</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>markerColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Traveling marker color (defaults to line color)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showOriginMarker</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show marker at origin point</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>originMarkerColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Origin marker color (defaults to line color)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showDestinationMarker</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show marker at destination when animation completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>destinationMarkerColor</DocsCode>
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
            <h4 className="font-medium text-sm text-foreground">Flight Routes</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize flight paths between airports with curved trajectories.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Package Delivery</h4>
            <p className="text-xs text-muted-foreground mt-1">Show delivery routes from warehouses to customers.</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Data Transfer</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Illustrate data flowing between servers or data centers.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Network Connections</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Show point-to-point connections in network visualizations.
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default ArcAnimatedPage
