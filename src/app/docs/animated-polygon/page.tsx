import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { PolygonOutlineExample } from "../_components/examples/polygon-outline-example"
import { PolygonFilledExample } from "../_components/examples/polygon-filled-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Animated Polygon",
}

const AnimatedPolygonPage = () => {
  const outlineSource = getExampleSource("polygon-outline-example.tsx")
  const filledSource = getExampleSource("polygon-filled-example.tsx")

  return (
    <DocsLayout
      title="Animated Polygon"
      description="Animated polygons that draw their outline and fill with smooth transitions."
      prev={{ title: "Animated Pulse", href: "/docs/animated-pulse" }}
      next={{ title: "Compare", href: "/docs/compare" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the animated polygon component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-animated-polygon.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={outlineSource}>
        <PolygonOutlineExample />
      </ComponentPreview>

      <DocsSection title="With Fill">
        <p>
          Use <DocsCode>animationMode="draw-then-fill"</DocsCode> to first draw the outline, then animate the fill
          opacity. Set <DocsCode>fillColor</DocsCode> and <DocsCode>fillOpacity</DocsCode> to customize the fill
          appearance.
        </p>
      </DocsSection>

      <ComponentPreview code={filledSource}>
        <PolygonFilledExample />
      </ComponentPreview>

      <DocsSection title="Animation Modes">
        <p>The component supports three animation modes:</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>
            <DocsCode>draw</DocsCode> - Only animate the polygon outline (no fill)
          </li>
          <li>
            <DocsCode>fill</DocsCode> - Show complete outline immediately and animate fill opacity
          </li>
          <li>
            <DocsCode>draw-then-fill</DocsCode> - Draw outline first, then animate fill (default)
          </li>
        </ul>
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
                <TableCell>Unique identifier for the polygon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number][]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of coordinates defining polygon vertices</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Color of the polygon outline</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2</TableCell>
                <TableCell>Width of the polygon outline in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Opacity of the polygon outline (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Color of the polygon fill</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Target opacity of the polygon fill (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Duration of outline drawing animation in ms</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillDuration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1000</TableCell>
                <TableCell>Duration of fill animation in ms</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>animationMode</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">"draw" | "fill" | "draw-then-fill"</TableCell>
                <TableCell className="text-muted-foreground">"draw-then-fill"</TableCell>
                <TableCell>Animation sequence mode</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation automatically on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Loop the animation continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1000</TableCell>
                <TableCell>Delay before restarting loop in ms</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onDrawComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Callback when outline drawing completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onFillComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Callback when fill animation completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Callback when entire animation completes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Emergency Zones</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize wildfire, hurricane, or evacuation boundaries
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Risk Assessment</h4>
            <p className="text-xs text-muted-foreground mt-1">Display flood zones, seismic risk, or hazard areas</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Service Coverage</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Show delivery zones, network coverage, or service areas
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Property Boundaries</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Highlight parcels, districts, or administrative regions
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Conservation Areas</h4>
            <p className="text-xs text-muted-foreground mt-1">Display protected zones, parks, or wildlife reserves</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Urban Planning</h4>
            <p className="text-xs text-muted-foreground mt-1">Visualize zoning districts or development boundaries</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Performance Tips">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Keep polygon vertices under 100 points for smooth animation</li>
          <li>
            Use <DocsCode>animationMode="fill"</DocsCode> for simpler animations with less CPU usage
          </li>
          <li>
            Increase <DocsCode>loopDelay</DocsCode> to reduce continuous animation overhead
          </li>
          <li>
            Use <DocsCode>autoStart=false</DocsCode> and trigger manually for user-initiated animations
          </li>
          <li>Simplify complex polygon shapes using tools like Mapshaper before importing</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  )
}

export default AnimatedPolygonPage
