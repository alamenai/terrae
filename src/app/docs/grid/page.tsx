import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { GridExample } from "../_components/examples/grid-example"
import { GridCustomExample } from "../_components/examples/grid-custom-example"
import { GridDenseExample } from "../_components/examples/grid-dense-example"
import { GridMinimalExample } from "../_components/examples/grid-minimal-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Grid",
}

const GridPage = () => {
  const basicSource = getExampleSource("grid-example.tsx")
  const customSource = getExampleSource("grid-custom-example.tsx")
  const denseSource = getExampleSource("grid-dense-example.tsx")
  const minimalSource = getExampleSource("grid-minimal-example.tsx")

  return (
    <DocsLayout
      title="Grid"
      description="Coordinate grid overlay with latitude/longitude lines and labels."
      prev={{ title: "Compare", href: "/docs/compare" }}
      next={{ title: "Heatmaps", href: "/docs/heatmaps" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the grid component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/grid.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <GridExample />
      </ComponentPreview>

      <DocsSection title="Custom Styling">
        <p>
          Customize the grid appearance with <DocsCode>lineColor</DocsCode>, <DocsCode>lineOpacity</DocsCode>,{" "}
          <DocsCode>lineWidth</DocsCode>, and label styling props. The green styling below creates a radar-like
          appearance.
        </p>
      </DocsSection>

      <ComponentPreview code={customSource}>
        <GridCustomExample />
      </ComponentPreview>

      <DocsSection title="Dense Grid">
        <p>
          For higher zoom levels, reduce the <DocsCode>latitudeInterval</DocsCode> and{" "}
          <DocsCode>longitudeInterval</DocsCode> to show more detailed coordinate lines. This example uses 1-degree
          intervals.
        </p>
      </DocsSection>

      <ComponentPreview code={denseSource}>
        <GridDenseExample />
      </ComponentPreview>

      <DocsSection title="Minimal Grid">
        <p>
          Set <DocsCode>showLabels</DocsCode> to <DocsCode>false</DocsCode> for a clean grid overlay without coordinate
          labels. Useful as a subtle reference grid.
        </p>
      </DocsSection>

      <ComponentPreview code={minimalSource}>
        <GridMinimalExample />
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
                <TableCell className="text-muted-foreground">&quot;map-grid&quot;</TableCell>
                <TableCell>Unique identifier for the grid layers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>latitudeInterval</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">10</TableCell>
                <TableCell>Degrees between latitude lines</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>longitudeInterval</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">10</TableCell>
                <TableCell>Degrees between longitude lines</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>lineColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Color of the grid lines</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>lineOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Opacity of the grid lines (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>lineWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Width of the grid lines in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showLabels</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Whether to show coordinate labels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>labelColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Color of the coordinate labels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>labelSize</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">10</TableCell>
                <TableCell>Font size of the labels in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>labelBackground</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">rgba(0, 0, 0, 0.5)</TableCell>
                <TableCell>Background color of the labels</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Navigation</h4>
            <p className="text-xs text-muted-foreground mt-1">Reference grid for maritime and aviation navigation</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Scientific Mapping</h4>
            <p className="text-xs text-muted-foreground mt-1">Coordinate reference for geographic data analysis</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default GridPage
