import { DocsLayout, DocsSection, DocsPropTable } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { CompassExample } from "../_components/examples/compass-example"
import { CompassSizesExample } from "../_components/examples/compass-sizes-example"
import { CompassMinimalExample } from "../_components/examples/compass-minimal-example"
import { CompassAutoRotateExample } from "../_components/examples/compass-auto-rotate-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compass",
}

export default function CompassPage() {
  const basicSource = getExampleSource("compass-example.tsx")
  const sizesSource = getExampleSource("compass-sizes-example.tsx")
  const minimalSource = getExampleSource("compass-minimal-example.tsx")
  const autoRotateSource = getExampleSource("compass-auto-rotate-example.tsx")

  return (
    <DocsLayout
      title="Compass"
      description="Interactive compass with drag-to-rotate functionality."
      prev={{ title: "Controls", href: "/docs/controls" }}
      next={{ title: "Marker", href: "/docs/markers" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the compass component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/compass.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <CompassExample />
      </ComponentPreview>

      <DocsSection title="Sizes">
        <p>
          The compass supports t-shirt sizes (sm, md, lg, xl) or custom numeric pixel values. Each size is optimized for
          different use cases.
        </p>
      </DocsSection>

      <ComponentPreview code={sizesSource}>
        <CompassSizesExample />
      </ComponentPreview>

      <DocsSection title="Minimal Mode">
        <p>For a cleaner look, disable the outer ring and cardinal labels.</p>
      </DocsSection>

      <ComponentPreview code={minimalSource}>
        <CompassMinimalExample />
      </ComponentPreview>

      <DocsSection title="Auto Rotate">
        <p>
          Enable automatic rotation with the autoRotate prop. Control the speed with autoRotateSpeed (degrees per
          frame).
        </p>
      </DocsSection>

      <ComponentPreview code={autoRotateSource}>
        <CompassAutoRotateExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <DocsPropTable
          props={[
            {
              name: "size",
              type: '"sm" | "md" | "lg" | "xl" | number',
              default: '"md"',
              description: "Compass size. T-shirt sizes map to 48, 64, 80, 96 pixels respectively.",
            },
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"top-right"',
              description: "Position of the compass on the map.",
            },
            {
              name: "showCardinals",
              type: "boolean",
              default: "true",
              description: "Show N, S, E, W cardinal direction labels.",
            },
            {
              name: "showRing",
              type: "boolean",
              default: "true",
              description: "Show outer ring with degree tick marks.",
            },
            {
              name: "showBearing",
              type: "boolean",
              default: "false",
              description: "Display current bearing in degrees below the compass.",
            },
            {
              name: "autoRotate",
              type: "boolean",
              default: "false",
              description: "Enable automatic rotation of the compass.",
            },
            {
              name: "autoRotateSpeed",
              type: "number",
              default: "1",
              description: "Speed of auto rotation in degrees per frame.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  )
}
