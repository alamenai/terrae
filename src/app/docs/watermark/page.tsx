import { DocsLayout, DocsSection, DocsCode, DocsPropTable } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { WatermarkExample } from "../_components/examples/watermark-example"
import { WatermarkPositionExample } from "../_components/examples/watermark-position-example"
import { WatermarkCustomExample } from "../_components/examples/watermark-custom-example"
import { getExampleSource } from "@/lib/get-example-source"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Watermark",
}

const WatermarkPage = () => {
  const watermarkSource = getExampleSource("watermark-example.tsx")
  const positionSource = getExampleSource("watermark-position-example.tsx")
  const customSource = getExampleSource("watermark-custom-example.tsx")

  return (
    <DocsLayout
      title="Watermark"
      description="Text watermark overlay for maps with configurable position and styling."
      prev={{ title: "Targeting Reticle", href: "/docs/targeting-reticle" }}
      next={{ title: "Animated Arc", href: "/docs/arc-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the watermark component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/watermark.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={watermarkSource}>
        <WatermarkExample />
      </ComponentPreview>

      <DocsSection title="Position">
        <p>
          Use the <DocsCode>position</DocsCode> prop to place the watermark at any edge or corner. Defaults to{" "}
          <DocsCode>center</DocsCode>.
        </p>
      </DocsSection>

      <ComponentPreview code={positionSource}>
        <WatermarkPositionExample />
      </ComponentPreview>

      <DocsSection title="Custom Styling">
        <p>
          Override the default appearance with the <DocsCode>className</DocsCode> prop to control font size, weight,
          color, and opacity.
        </p>
      </DocsSection>

      <ComponentPreview code={customSource}>
        <WatermarkCustomExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "The watermark content to display.",
            },
            {
              name: "position",
              type: '"center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: "center",
              description: "Where to place the watermark on the map.",
            },
            {
              name: "className",
              type: "string",
              default: "text-[8rem] font-extrabold ... text-black/10 dark:text-white/10",
              description: "Custom CSS classes for font size, weight, color, and opacity.",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  )
}

export default WatermarkPage
