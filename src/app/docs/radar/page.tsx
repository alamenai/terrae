import { DocsLayout, DocsSection, DocsCode, DocsPropTable } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { RadarExample } from "../_components/examples/radar-example"
import { RadarColorExample } from "../_components/examples/radar-color-example"
import { RadarDurationExample } from "../_components/examples/radar-duration-example"
import { RadarRingsExample } from "../_components/examples/radar-rings-example"
import { RadarNoCrosshairsExample } from "../_components/examples/radar-no-crosshairs-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Radar",
}

export default function RadarPage() {
  const radarSource = getExampleSource("radar-example.tsx")
  const colorSource = getExampleSource("radar-color-example.tsx")
  const durationSource = getExampleSource("radar-duration-example.tsx")
  const ringsSource = getExampleSource("radar-rings-example.tsx")
  const noCrosshairsSource = getExampleSource("radar-no-crosshairs-example.tsx")

  return (
    <DocsLayout
      title="Radar"
      description="Animated radar sweep signal overlay on map coordinates."
      prev={{ title: "Targeting Reticle", href: "/docs/targeting-reticle" }}
      next={{ title: "MiniMap", href: "/docs/minimap" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the radar component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-radar.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={radarSource}>
        <RadarExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Use <DocsCode>color</DocsCode>, <DocsCode>gridColor</DocsCode>, and <DocsCode>backgroundColor</DocsCode> to
          theme each radar independently.
        </p>
      </DocsSection>

      <ComponentPreview code={colorSource}>
        <RadarColorExample />
      </ComponentPreview>

      <DocsSection title="Sweep Speed">
        <p>
          Control the rotation speed with <DocsCode>duration</DocsCode>. Lower values create a faster sweep, higher
          values create a slower, more deliberate rotation.
        </p>
      </DocsSection>

      <ComponentPreview code={durationSource}>
        <RadarDurationExample />
      </ComponentPreview>

      <DocsSection title="Range Rings">
        <p>
          Set <DocsCode>rings</DocsCode> to control the number of concentric range rings displayed on the radar.
        </p>
      </DocsSection>

      <ComponentPreview code={ringsSource}>
        <RadarRingsExample />
      </ComponentPreview>

      <DocsSection title="No Crosshairs">
        <p>
          Set <DocsCode>showCrosshairs</DocsCode> to <DocsCode>false</DocsCode> to hide the horizontal and vertical
          crosshair lines for a cleaner look.
        </p>
      </DocsSection>

      <ComponentPreview code={noCrosshairsSource}>
        <RadarNoCrosshairsExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <DocsPropTable
          props={[
            {
              name: "id",
              type: "string",
              description: "Unique identifier for the radar instance.",
            },
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Position [longitude, latitude] for the radar center.",
            },
            {
              name: "size",
              type: "number",
              default: "200",
              description: "Radar diameter in pixels.",
            },
            {
              name: "color",
              type: "string",
              default: "rgba(0, 255, 70, 1)",
              description: "Primary color for the sweep line, center dot, and outer ring.",
            },
            {
              name: "gridColor",
              type: "string",
              default: "rgba(0, 255, 70, 0.3)",
              description: "Color of the concentric rings and crosshair lines.",
            },
            {
              name: "backgroundColor",
              type: "string",
              default: "rgba(0, 20, 0, 0.8)",
              description: "Background fill color of the radar circle.",
            },
            {
              name: "duration",
              type: "number",
              default: "2000",
              description: "Time in milliseconds for one full sweep rotation.",
            },
            {
              name: "rings",
              type: "number",
              default: "4",
              description: "Number of concentric range rings.",
            },
            {
              name: "showCrosshairs",
              type: "boolean",
              default: "true",
              description: "Show the horizontal and vertical crosshair lines.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Performance Considerations">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>The radar uses continuous canvas repainting — use sparingly for best performance</li>
          <li>Larger sizes require more rendering work per frame</li>
          <li>Multiple radars on screen will impact frame rate</li>
          <li>Animation automatically stops when the component unmounts</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  )
}
