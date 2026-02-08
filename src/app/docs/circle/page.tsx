import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BasicCircleExample } from "../_components/examples/basic-circle-example"
import { DashedCircleExample } from "../_components/examples/dashed-circle-example"
import { MultiCircleExample } from "../_components/examples/multi-circle-example"
import { ConcentricCirclesExample } from "../_components/examples/concentric-circles-example"
import { DraggableCircleExample } from "../_components/examples/draggable-circle-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Circle",
}

const CirclePage = () => {
  const basicCircleSource = getExampleSource("basic-circle-example.tsx")
  const dashedCircleSource = getExampleSource("dashed-circle-example.tsx")
  const multiCircleSource = getExampleSource("multi-circle-example.tsx")
  const concentricCirclesSource = getExampleSource("concentric-circles-example.tsx")
  const draggableCircleSource = getExampleSource("draggable-circle-example.tsx")

  return (
    <DocsLayout
      title="Circle"
      description="Visualize areas and ranges with radius-based circles."
      prev={{ title: "Choropleth", href: "/docs/choropleth" }}
      next={{ title: "Circle Clusters", href: "/docs/circle-clusters" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the circle component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/circle.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicCircleSource}>
        <BasicCircleExample />
      </ComponentPreview>

      <DocsSection title="Dashed Stroke">
        <p>
          Use the <DocsCode>dashArray</DocsCode> prop to create dashed outlines. The array defines [dash length, gap
          length] in pixels.
        </p>
      </DocsSection>

      <ComponentPreview code={dashedCircleSource}>
        <DashedCircleExample />
      </ComponentPreview>

      <DocsSection title="Multiple Circles">
        <p>
          Add multiple <DocsCode>MapCircle</DocsCode> components to display several circles with different styles.
        </p>
      </DocsSection>

      <ComponentPreview code={multiCircleSource}>
        <MultiCircleExample />
      </ComponentPreview>

      <DocsSection title="Concentric Circles">
        <p>
          Layer circles with the same center but different radii to create concentric rings, useful for visualizing
          zones or impact ranges.
        </p>
      </DocsSection>

      <ComponentPreview code={concentricCirclesSource}>
        <ConcentricCirclesExample />
      </ComponentPreview>

      <DocsSection title="Draggable">
        <p>
          Enable <DocsCode>draggable</DocsCode> to allow repositioning the circle by dragging. Use{" "}
          <DocsCode>onDrag</DocsCode> or <DocsCode>onDragEnd</DocsCode> to capture the new center coordinates.
        </p>
      </DocsSection>

      <ComponentPreview code={draggableCircleSource}>
        <DraggableCircleExample />
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
                  <DocsCode>fillColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">&quot;#3b82f6&quot;</TableCell>
                <TableCell>Fill color of the circle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Fill opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">&quot;#3b82f6&quot;</TableCell>
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
                  <DocsCode>dashArray</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Dash pattern [dash, gap] for dashed strokes</TableCell>
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
                  <DocsCode>draggable</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Enable dragging to reposition the circle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>cursor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">&quot;grab&quot;</TableCell>
                <TableCell>Cursor style when hovering over draggable circle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onDragStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">(center) =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when drag begins</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onDrag</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">(center) =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback during drag with new center coordinates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onDragEnd</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">(center) =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when drag ends with final center coordinates</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Radius Search</h4>
            <p className="text-xs text-muted-foreground mt-1">Show search results within a distance from a point</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Coverage Areas</h4>
            <p className="text-xs text-muted-foreground mt-1">Display service or signal coverage radius</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default CirclePage
