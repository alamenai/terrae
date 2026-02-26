import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { VolcanoExample } from "../_components/examples/volcano-example"
import { VolcanoIntensityExample } from "../_components/examples/volcano-intensity-example"
import { VolcanoCustomColorsExample } from "../_components/examples/volcano-custom-colors-example"
import { VolcanoLavaSpreadExample } from "../_components/examples/volcano-lava-spread-example"
import { VolcanoControlExample } from "../_components/examples/volcano-control-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Volcano",
}

const VolcanoPage = () => {
  const basicSource = getExampleSource("volcano-example.tsx")
  const intensitySource = getExampleSource("volcano-intensity-example.tsx")
  const colorsSource = getExampleSource("volcano-custom-colors-example.tsx")
  const spreadSource = getExampleSource("volcano-lava-spread-example.tsx")
  const controlSource = getExampleSource("volcano-control-example.tsx")

  return (
    <DocsLayout
      title="Volcano"
      description="Animated volcanic eruption with lava, ash plume, and particle effects."
      prev={{ title: "Tsunami", href: "/docs/tsunami" }}
      next={{ title: "Cyclone", href: "/docs/cyclone" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the volcano component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/volcano.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <VolcanoExample />
      </ComponentPreview>

      <DocsSection title="Intensity">
        <p>
          Control the eruption intensity with the <DocsCode>intensity</DocsCode> prop. Higher values create larger lava
          bursts with more particles. Combine with <DocsCode>size</DocsCode> to create volcanoes of different scales.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <VolcanoIntensityExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the lava and ash colors with <DocsCode>lavaColor</DocsCode> and <DocsCode>ashColor</DocsCode>.
          Create blue volcanic eruptions, green toxic blasts, or any color combination.
        </p>
      </DocsSection>

      <ComponentPreview code={colorsSource}>
        <VolcanoCustomColorsExample />
      </ComponentPreview>

      <DocsSection title="Eruption Phases">
        <p>
          Control the eruption state with the <DocsCode>phase</DocsCode> prop. The volcano supports three phases:{" "}
          <DocsCode>dormant</DocsCode> (inactive cone with dim glow), <DocsCode>rumbling</DocsCode> (shaking cone with
          pulsing glow and reduced particles), and <DocsCode>erupting</DocsCode> (full eruption). Use the{" "}
          <DocsCode>useVolcanoControl</DocsCode> hook to switch phases dynamically.
        </p>
      </DocsSection>

      <ComponentPreview code={controlSource}>
        <VolcanoControlExample />
      </ComponentPreview>

      <DocsSection title="Lava Spread">
        <p>
          Enable <DocsCode>spread</DocsCode> to simulate lava spreading outward from the volcano base. Control the
          spread behavior with <DocsCode>spreadSpeed</DocsCode> (time between new lava sources),{" "}
          <DocsCode>spreadRadius</DocsCode> (how far lava spreads), and <DocsCode>maxSpreadPoints</DocsCode> (maximum
          number of lava pools). Spread only activates during the <DocsCode>erupting</DocsCode> phase.
        </p>
      </DocsSection>

      <ComponentPreview code={spreadSource}>
        <VolcanoLavaSpreadExample />
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
                <TableCell>Unique identifier for the volcano effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Volcano location as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Volcano size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.4</TableCell>
                <TableCell>Eruption intensity (0.1 to 1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">100</TableCell>
                <TableCell>Number of eruption particles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>lavaColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#FF4500</TableCell>
                <TableCell>Lava and ember particle color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>ashColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#555555</TableCell>
                <TableCell>Ash cloud particle color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>phase</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  &quot;dormant&quot; | &quot;rumbling&quot; | &quot;erupting&quot;
                </TableCell>
                <TableCell className="text-muted-foreground">erupting</TableCell>
                <TableCell>Eruption phase controlling visual behavior</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spread</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Enable lava spreading from volcano base</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spreadSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Time in ms between new lava spread sources</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spreadRadius</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Spread radius as fraction of size (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>maxSpreadPoints</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">6</TableCell>
                <TableCell>Maximum number of lava spread sources</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start eruption on mount</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Geological Visualization</h4>
            <p className="text-xs text-muted-foreground mt-1">Display active volcanoes on geological survey maps</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Disaster Monitoring</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize eruption risk levels on emergency response dashboards
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default VolcanoPage
