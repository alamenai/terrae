import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import ChoroplethExample from "../_components/examples/choropleth-example"
import ChoroplethChinaExample from "../_components/examples/choropleth-china-example"
import ChoroplethEuropeExample from "../_components/examples/choropleth-europe-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Choropleth",
}

const ChoroplethPage = () => {
  const basicSource = getExampleSource("choropleth-example.tsx")
  const chinaSource = getExampleSource("choropleth-china-example.tsx")
  const europeSource = getExampleSource("choropleth-europe-example.tsx")

  return (
    <DocsLayout
      title="Choropleth"
      description="Visualize data by coloring geographic regions based on values."
      prev={{ title: "Circle Clusters", href: "/docs/circle-clusters" }}
      next={{ title: "Animated Pulse", href: "/docs/animated-pulse" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the choropleth component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-choropleth.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <ChoroplethExample />
      </ComponentPreview>

      <DocsSection title="Color Scales">
        <p>
          The <DocsCode>colorScale</DocsCode> prop defines how values map to colors. You can use{" "}
          <DocsCode>linear</DocsCode> interpolation for smooth gradients or <DocsCode>step</DocsCode> for discrete color
          bands.
        </p>
        <CodeBlock
          code={`const colorScale = {
  stops: [
    { value: 0, color: "#f7fbff" },
    { value: 100, color: "#6baed6" },
    { value: 500, color: "#08519c" },
  ],
  interpolation: "linear",
}`}
          language="tsx"
        />
      </DocsSection>

      <DocsSection title="Interactive Features" id="interactive">
        <p>
          Enable hover highlighting with <DocsCode>hoverEnabled</DocsCode> and handle clicks with{" "}
          <DocsCode>onClick</DocsCode>. Click on a province to see details in a popup.
        </p>
      </DocsSection>

      <ComponentPreview code={chinaSource}>
        <ChoroplethChinaExample />
      </ComponentPreview>

      <DocsSection title="Custom Styling" id="europe">
        <p>
          World countries colored by population using Tailwind CSS blue gradient colors. The popup also uses Tailwind
          gradient styling.
        </p>
      </DocsSection>

      <ComponentPreview code={europeSource}>
        <ChoroplethEuropeExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden sm:table-cell">Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>data</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string | FeatureCollection</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">required</TableCell>
                <TableCell>GeoJSON URL or FeatureCollection with Polygon/MultiPolygon features</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>valueProperty</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">required</TableCell>
                <TableCell>Property name in feature.properties to use for coloring</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>colorScale</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">ChoroplethColorScale</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">required</TableCell>
                <TableCell>Color scale configuration with stops and interpolation type</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fillOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">0.8</TableCell>
                <TableCell>Fill opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">"#ffffff"</TableCell>
                <TableCell>Border color between regions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">2</TableCell>
                <TableCell>Border width in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strokeOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">1</TableCell>
                <TableCell>Border opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>hoverEnabled</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">false</TableCell>
                <TableCell>Enable hover highlighting effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>hoverFillOpacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">1</TableCell>
                <TableCell>Fill opacity when hovered</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>hoverStrokeColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">"#000000"</TableCell>
                <TableCell>Border color when hovered</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>hoverStrokeWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">4</TableCell>
                <TableCell>Border width when hovered</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onClick</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">function</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">-</TableCell>
                <TableCell>Callback when a region is clicked</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onHover</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">function</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">-</TableCell>
                <TableCell>Callback when hovering over regions</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Color Scale Type">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden sm:table-cell">Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>stops</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">{`{ value: number, color: string }[]`}</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">required</TableCell>
                <TableCell>Array of value-to-color mappings</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>interpolation</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">"linear" | "step"</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">"linear"</TableCell>
                <TableCell>How to interpolate colors between stops</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>nullColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">"#cccccc"</TableCell>
                <TableCell>Color for regions with null/missing values</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Election Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Visualize voting results by region</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Population Density</h4>
            <p className="text-xs text-muted-foreground mt-1">Show demographic data across areas</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default ChoroplethPage
