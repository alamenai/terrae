import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { AnimatedIconExample } from "../_components/examples/animated-icon-example"
import { CustomAnimatedIconExample } from "../_components/examples/custom-animated-icon-example"
import { LargePulseExample } from "../_components/examples/large-pulse-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Animated Pulse",
}

export default function AnimatedPulsePage() {
  const animatedIconSource = getExampleSource("animated-icon-example.tsx")
  const customAnimatedIconSource = getExampleSource("custom-animated-icon-example.tsx")
  const largePulseSource = getExampleSource("large-pulse-example.tsx")

  return (
    <DocsLayout
      title="Animated Pulse"
      description="Create eye-catching pulsing dot animations for map markers."
      prev={{ title: "Choropleth", href: "/docs/choropleth" }}
      next={{ title: "Animated Polygon", href: "/docs/animated-polygon" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the animated pulse component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-marker-animated.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={animatedIconSource}>
        <AnimatedIconExample />
      </ComponentPreview>

      <DocsSection title="Multiple Animated Pulses">
        <p>
          Create multiple animated pulses with different colors, sizes, and animation speeds to differentiate between
          different types of markers or data points.
        </p>
      </DocsSection>

      <ComponentPreview code={customAnimatedIconSource}>
        <CustomAnimatedIconExample />
      </ComponentPreview>

      <DocsSection title="Large Pulse">
        <p>
          Create a larger, more prominent pulse animation by increasing the size and adjusting the duration for a
          slower, more dramatic effect.
        </p>
      </DocsSection>

      <ComponentPreview code={largePulseSource}>
        <LargePulseExample />
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
                <TableCell>Unique identifier for the pulse</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Pulse size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Position [longitude, latitude] for the pulse</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"rgba(0, 100, 255, 1)"</TableCell>
                <TableCell>Inner circle color (RGBA format)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>pulseColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"rgba(0, 100, 255, 0.8)"</TableCell>
                <TableCell>Pulsing outer circle color (RGBA format)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1000</TableCell>
                <TableCell>Animation duration in milliseconds</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Performance Considerations">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Animated pulses use continuous repainting - use sparingly for best performance</li>
          <li>Larger pulse sizes require more rendering work</li>
          <li>Multiple animated pulses on screen will impact frame rate</li>
          <li>Consider using static markers for large datasets and animated pulses for highlights</li>
          <li>Animation automatically stops when the component unmounts</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  )
}
