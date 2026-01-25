import { DocsLayout, DocsSection, DocsCode, DocsPropTable, NewBadge } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { MiniMapExample } from "../_components/examples/minimap-example"
import { MiniMapPositionExample } from "../_components/examples/minimap-position-example"
import { MiniMapRoundedExample } from "../_components/examples/minimap-rounded-example"
import { MiniMapDraggableExample } from "../_components/examples/minimap-draggable-example"
import { MiniMapCustomExample } from "../_components/examples/minimap-custom-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"

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
      prev={{ title: "Targeting Reticle", href: "/docs/targeting-reticle" }}
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
        <DocsPropTable
          props={[
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"bottom-right"',
              description: "Corner position of the minimap.",
            },
            {
              name: "width",
              type: "number",
              default: "200",
              description: "Width in pixels.",
            },
            {
              name: "height",
              type: "number",
              default: "150",
              description: "Height in pixels.",
            },
            {
              name: "zoomOffset",
              type: "number",
              default: "-4",
              description: "Zoom offset from main map (negative = zoomed out).",
            },
            {
              name: "style",
              type: "string",
              description: "Custom Mapbox style URL. Overrides theme-based styles.",
            },
            {
              name: "styles",
              type: "MapThemeStyles",
              description: "Theme-aware styles object with light/dark variants. Automatically switches based on theme.",
              isNew: true,
            },
            {
              name: "boxColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color of the viewport box.",
            },
            {
              name: "boxBorderWidth",
              type: "number",
              default: "2",
              description: "Border width of the viewport box.",
            },
            {
              name: "rounded",
              type: 'number | "full" | "none"',
              default: "8",
              description: 'Border radius in pixels, "full" for circular, or "none".',
              isNew: true,
            },
            {
              name: "draggable",
              type: "boolean",
              default: "false",
              description: "Allow users to drag the minimap anywhere within the map.",
              isNew: true,
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  )
}
