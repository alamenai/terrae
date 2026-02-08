import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { CycloneExample } from "../_components/examples/cyclone-example"
import { CycloneIntensityExample } from "../_components/examples/cyclone-intensity-example"
import { CycloneControlExample } from "../_components/examples/cyclone-control-example"
import { CycloneMovingExample } from "../_components/examples/cyclone-moving-example"
import { CycloneGrowingExample } from "../_components/examples/cyclone-growing-example"
import { CycloneSpeedExample } from "../_components/examples/cyclone-speed-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Cyclone",
}

const CyclonePage = () => {
  const basicSource = getExampleSource("cyclone-example.tsx")
  const intensitySource = getExampleSource("cyclone-intensity-example.tsx")
  const controlSource = getExampleSource("cyclone-control-example.tsx")
  const movingSource = getExampleSource("cyclone-moving-example.tsx")
  const growingSource = getExampleSource("cyclone-growing-example.tsx")
  const speedSource = getExampleSource("cyclone-speed-example.tsx")

  return (
    <DocsLayout
      title="Cyclone"
      description="Animated cyclone funnel with swirling particles and debris."
      prev={{ title: "Video", href: "/docs/raster-video" }}
      next={{ title: "Explosion", href: "/docs/explosion" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the cyclone component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/cyclone.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <CycloneExample />
      </ComponentPreview>

      <DocsSection title="Intensity Levels">
        <p>
          Control the cyclone strength with the <DocsCode>intensity</DocsCode> prop. Lower values create weaker cyclones
          with slower rotation, while higher values produce violent storms with faster swirling and wider spread.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <CycloneIntensityExample />
      </ComponentPreview>

      <DocsSection title="Programmatic Control">
        <p>
          Use the <DocsCode>useCycloneControl</DocsCode> hook to start, stop, or dynamically change the cyclone
          intensity. The cyclone smoothly transitions between intensity levels.
        </p>
      </DocsSection>

      <ComponentPreview code={controlSource}>
        <CycloneControlExample />
      </ComponentPreview>

      <DocsSection title="Movement">
        <p>
          Make the cyclone travel along a path using the <DocsCode>path</DocsCode> prop. Control the travel time with{" "}
          <DocsCode>duration</DocsCode> and enable continuous movement with <DocsCode>loop</DocsCode>.
        </p>
      </DocsSection>

      <ComponentPreview code={movingSource}>
        <CycloneMovingExample />
      </ComponentPreview>

      <DocsSection title="Growing Storm">
        <p>
          Use the <DocsCode>setScale</DocsCode> method to dynamically change the cyclone size. This example shows a
          hurricane forming over the ocean and growing larger as it approaches the Florida coast, simulating real storm
          intensification.
        </p>
      </DocsSection>

      <ComponentPreview code={growingSource}>
        <CycloneGrowingExample />
      </ComponentPreview>

      <DocsSection title="Rotation Speed">
        <p>
          Use the <DocsCode>setRotationSpeed</DocsCode> method to dynamically change how fast the cyclone spins.
        </p>
      </DocsSection>

      <ComponentPreview code={speedSource}>
        <CycloneSpeedExample />
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
                <TableCell>Unique identifier for the cyclone</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Cyclone location as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>path</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number][]</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Array of coordinates for cyclone movement</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">10000</TableCell>
                <TableCell>Time in milliseconds to traverse the path</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Repeat path movement continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Cyclone size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Cyclone strength (0-2)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>scale</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Cyclone scale multiplier (0.2-2)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">120</TableCell>
                <TableCell>Number of particles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>funnelColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#8b9dc3</TableCell>
                <TableCell>Funnel cloud color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>debrisColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#5c4033</TableCell>
                <TableCell>Debris and dust color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>rotationSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Rotation speed multiplier</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation on mount</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Weather Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Visualize cyclone warnings and storm tracking</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Emergency Services</h4>
            <p className="text-xs text-muted-foreground mt-1">Display active severe weather on emergency maps</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default CyclonePage
