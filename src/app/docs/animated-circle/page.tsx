import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BasicAnimatedCircleExample } from "../_components/examples/basic-animated-circle-example"
import { DashedAnimatedCircleExample } from "../_components/examples/dashed-animated-circle-example"
import { FillOnlyAnimatedCircleExample } from "../_components/examples/fill-only-animated-circle-example"
import { LoopingAnimatedCircleExample } from "../_components/examples/looping-animated-circle-example"
import { ConcentricAnimatedCirclesExample } from "../_components/examples/concentric-animated-circles-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Animated Circle",
}

const AnimatedCirclePage = () => {
  const basicSource = getExampleSource("basic-animated-circle-example.tsx")
  const dashedSource = getExampleSource("dashed-animated-circle-example.tsx")
  const fillOnlySource = getExampleSource("fill-only-animated-circle-example.tsx")
  const loopingSource = getExampleSource("looping-animated-circle-example.tsx")
  const concentricSource = getExampleSource("concentric-animated-circles-example.tsx")

  return (
    <DocsLayout
      title="Animated Circle"
      description="Animated circles with drawing outline and fill effects."
      prev={{ title: "Circle", href: "/docs/circle" }}
      next={{ title: "Animated Lines", href: "/docs/lines-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the animated circle component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-animated-circle.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <BasicAnimatedCircleExample />
      </ComponentPreview>

      <DocsSection title="Dashed">
        <p>
          Use <DocsCode>strokeDashArray</DocsCode> to create a dashed outline effect.
        </p>
      </DocsSection>

      <ComponentPreview code={dashedSource}>
        <DashedAnimatedCircleExample />
      </ComponentPreview>

      <DocsSection title="Fill">
        <p>
          Set <DocsCode>animationMode="fill"</DocsCode> to animate the fill opacity instead of the outline.
        </p>
      </DocsSection>

      <ComponentPreview code={fillOnlySource}>
        <FillOnlyAnimatedCircleExample />
      </ComponentPreview>

      <DocsSection title="Looping Animation">
        <p>
          Enable <DocsCode>loop</DocsCode> to continuously repeat the animation. Use <DocsCode>loopDelay</DocsCode> to
          control the pause between iterations.
        </p>
      </DocsSection>

      <ComponentPreview code={loopingSource}>
        <LoopingAnimatedCircleExample />
      </ComponentPreview>

      <DocsSection title="Sequential Concentric Circles">
        <p>
          Use <DocsCode>onComplete</DocsCode> callbacks to chain animations. This example animates circles from inner to
          outer, creating an expanding ripple effect.
        </p>
      </DocsSection>

      <ComponentPreview code={concentricSource}>
        <ConcentricAnimatedCirclesExample />
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
                <TableCell>Unique identifier for the animated circle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>center</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Center point [longitude, latitude] of the circle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>radius</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Radius of the circle in meters</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Stroke/outline color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2</TableCell>
                <TableCell>Stroke width in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Stroke opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeDashArray</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number[]</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Dash pattern [dash, gap] for dashed outline</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Fill color of the circle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Target fill opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Outline drawing duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillDuration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1000</TableCell>
                <TableCell>Fill animation duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>animationMode</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">"draw" | "fill"</TableCell>
                <TableCell className="text-muted-foreground">"draw"</TableCell>
                <TableCell>Animation mode: outline only or outline then fill</TableCell>
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
                <TableCell>Delay before restarting loop in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>segments</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">64</TableCell>
                <TableCell>Number of segments for circle smoothness</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onDrawComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when outline drawing completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onFillComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when fill animation completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when entire animation completes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Expanding Search</h4>
            <p className="text-xs text-muted-foreground mt-1">Visualize search radius expanding from a point</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Impact Visualization</h4>
            <p className="text-xs text-muted-foreground mt-1">Animate blast radius or impact zones</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Coverage Animation</h4>
            <p className="text-xs text-muted-foreground mt-1">Show service coverage expanding over time</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Alert Zones</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Highlight areas with animated attention-grabbing circles
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default AnimatedCirclePage
