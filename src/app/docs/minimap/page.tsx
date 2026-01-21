import { DocsLayout, DocsSection, DocsCode, NewBadge } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { MiniMapExample } from "../_components/examples/minimap-example"
import { MiniMapPositionExample } from "../_components/examples/minimap-position-example"
import { MiniMapRoundedExample } from "../_components/examples/minimap-rounded-example"
import { MiniMapDraggableExample } from "../_components/examples/minimap-draggable-example"
import { MiniMapCustomExample } from "../_components/examples/minimap-custom-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "MiniMap",
}

export default function MiniMapPage() {
  const miniMapSource = getExampleSource("minimap-example.tsx")
  const positionSource = getExampleSource("minimap-position-example.tsx")
  const roundedSource = getExampleSource("minimap-rounded-example.tsx")
  const draggableSource = getExampleSource("minimap-draggable-example.tsx")
  const customSource = getExampleSource("minimap-custom-example.tsx")

  return (
    <DocsLayout
      title="MiniMap"
      description="Add a minimap overview to help users understand their location context."
      prev={{ title: "Blur Area", href: "/docs/blur-area" }}
      next={{ title: "Lines", href: "/docs/lines" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the minimap component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/mini-map.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={miniMapSource} className="h-125">
        <MiniMapExample />
      </ComponentPreview>

      <DocsSection title="Custom Position">
        <p>
          Position the minimap in any corner of the map using the <DocsCode>position</DocsCode> prop.
        </p>
      </DocsSection>

      <ComponentPreview code={positionSource} className="h-125">
        <MiniMapPositionExample />
      </ComponentPreview>

      <DocsSection title="Rounded" id="rounded" badge={<NewBadge />}>
        <p>
          Use the <DocsCode>rounded</DocsCode> prop to customize the border radius. Set to "full" for a circular
          minimap.
        </p>
      </DocsSection>

      <ComponentPreview code={roundedSource} className="h-125">
        <MiniMapRoundedExample />
      </ComponentPreview>

      <DocsSection title="Draggable" id="draggable" badge={<NewBadge />}>
        <p>
          Enable the <DocsCode>draggable</DocsCode> prop to let users move the minimap anywhere within the map.
        </p>
      </DocsSection>

      <ComponentPreview code={draggableSource} className="h-125">
        <MiniMapDraggableExample />
      </ComponentPreview>

      <DocsSection title="Custom Styling">
        <p>Customize the minimap size, zoom offset, and viewport box appearance to match your design.</p>
      </DocsSection>

      <ComponentPreview code={customSource} className="h-125">
        <MiniMapCustomExample />
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
                  <DocsCode>position</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  "top-left" | "top-right" | "bottom-left" | "bottom-right"
                </TableCell>
                <TableCell className="text-muted-foreground">"bottom-right"</TableCell>
                <TableCell>Corner position of the minimap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>width</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Width in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>height</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">150</TableCell>
                <TableCell>Height in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>zoomOffset</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">-4</TableCell>
                <TableCell>Zoom offset from main map (negative = zoomed out)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>style</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Custom Mapbox style URL (defaults to main map style)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>boxColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Color of the viewport box</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>boxBorderWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2</TableCell>
                <TableCell>Border width of the viewport box</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>rounded</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number | "full" | "none"</TableCell>
                <TableCell className="text-muted-foreground">8</TableCell>
                <TableCell>Border radius in pixels, "full" for circular, or "none"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>draggable</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Allow users to drag the minimap anywhere within the map</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
