import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BasicPolygonExample } from "../_components/examples/basic-polygon-example"
import { OutlinePolygonExample } from "../_components/examples/outline-polygon-example"
import { DashedPolygonExample } from "../_components/examples/dashed-polygon-example"
import { MultiPolygonExample } from "../_components/examples/multi-polygon-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Polygon",
}

const PolygonPage = () => {
  const basicPolygonSource = getExampleSource("basic-polygon-example.tsx")
  const outlinePolygonSource = getExampleSource("outline-polygon-example.tsx")
  const dashedPolygonSource = getExampleSource("dashed-polygon-example.tsx")
  const multiPolygonSource = getExampleSource("multi-polygon-example.tsx")

  return (
    <DocsLayout
      title="Polygon"
      description="Draw filled polygons on the map."
      prev={{ title: "Circle Clusters", href: "/docs/circle-clusters" }}
      next={{ title: "Image", href: "/docs/image" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the polygon component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/polygon.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicPolygonSource}>
        <BasicPolygonExample />
      </ComponentPreview>

      <DocsSection title="Outline Only">
        <p>
          Set <DocsCode>fillOpacity={0}</DocsCode> to create an outline-only polygon without fill.
        </p>
      </DocsSection>

      <ComponentPreview code={outlinePolygonSource}>
        <OutlinePolygonExample />
      </ComponentPreview>

      <DocsSection title="Dashed Stroke">
        <p>
          Use the <DocsCode>dashArray</DocsCode> prop to create dashed outlines. The array defines [dash length, gap
          length] in pixels.
        </p>
      </DocsSection>

      <ComponentPreview code={dashedPolygonSource}>
        <DashedPolygonExample />
      </ComponentPreview>

      <DocsSection title="Multiple Polygons">
        <p>
          Add multiple <DocsCode>MapPolygon</DocsCode> components to display several polygons with different styles.
        </p>
      </DocsSection>

      <ComponentPreview code={multiPolygonSource}>
        <MultiPolygonExample />
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
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number][]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of [longitude, latitude] points defining the polygon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">&quot;#3b82f6&quot;</TableCell>
                <TableCell>Fill color of the polygon</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.4</TableCell>
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
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Geofencing</h4>
            <p className="text-xs text-muted-foreground mt-1">Define boundaries for location-based triggers</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Coverage Areas</h4>
            <p className="text-xs text-muted-foreground mt-1">Display service coverage or delivery zones</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default PolygonPage
