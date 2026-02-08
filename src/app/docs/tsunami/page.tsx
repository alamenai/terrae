import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { TsunamiExample } from "../_components/examples/tsunami-example"
import { TsunamiColorsExample } from "../_components/examples/tsunami-colors-example"
import { TsunamiSpeedExample } from "../_components/examples/tsunami-speed-example"
import { TsunamiDirectionExample } from "../_components/examples/tsunami-direction-example"
import { TsunamiControlExample } from "../_components/examples/tsunami-control-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Tsunami",
}

const TsunamiPage = () => {
  const basicSource = getExampleSource("tsunami-example.tsx")
  const colorsSource = getExampleSource("tsunami-colors-example.tsx")
  const speedSource = getExampleSource("tsunami-speed-example.tsx")
  const directionSource = getExampleSource("tsunami-direction-example.tsx")
  const controlSource = getExampleSource("tsunami-control-example.tsx")

  return (
    <DocsLayout
      title="Tsunami"
      description="Animated tsunami wave effect with incoming wave from the sea, crashing foam, and debris particles."
      prev={{ title: "Steam", href: "/docs/steam" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the tsunami component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/tsunami.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <TsunamiExample />
      </ComponentPreview>

      <DocsSection title="Origin & Target">
        <p>
          The tsunami uses two coordinate props: <DocsCode>origin</DocsCode> (where the wave starts, in the sea) and{" "}
          <DocsCode>target</DocsCode> (where the wave crashes, on land). The direction is calculated automatically from
          origin to target, ensuring the wave always travels from sea to shore.
        </p>
      </DocsSection>

      <ComponentPreview code={directionSource}>
        <TsunamiDirectionExample />
      </ComponentPreview>

      <DocsSection title="Speed & Height">
        <p>
          Adjust the wave behavior with <DocsCode>speed</DocsCode> (time in ms for the wave to reach the target) and{" "}
          <DocsCode>waveHeight</DocsCode> (height as a fraction of size). Faster waves create more dramatic impacts.
        </p>
      </DocsSection>

      <ComponentPreview code={speedSource}>
        <TsunamiSpeedExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the wave appearance with <DocsCode>waterColor</DocsCode> (main wave color) and{" "}
          <DocsCode>foamColor</DocsCode> (foam and spray color). Create dark storm waves, tropical blue waves, or any
          color variation.
        </p>
      </DocsSection>

      <ComponentPreview code={colorsSource}>
        <TsunamiColorsExample />
      </ComponentPreview>

      <DocsSection title="Programmatic Control">
        <p>
          Use the <DocsCode>useTsunamiControl</DocsCode> hook to trigger, stop, and reset the wave animation
          programmatically. The hook also exposes the current <DocsCode>phase</DocsCode> (approaching, crashing,
          receding, idle).
        </p>
      </DocsSection>

      <ComponentPreview code={controlSource}>
        <TsunamiControlExample />
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
                <TableCell className="text-muted-foreground">auto-generated</TableCell>
                <TableCell>Unique identifier for programmatic control via useTsunamiControl</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>origin</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Wave starting point in the sea [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>target</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Wave crash point on land [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">300</TableCell>
                <TableCell>Canvas size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>waveHeight</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.4</TableCell>
                <TableCell>Wave height as fraction of size (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>waveWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.8</TableCell>
                <TableCell>Wave width as fraction of size (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>speed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">3000</TableCell>
                <TableCell>Time in ms for wave to reach target</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>waterColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#0077be</TableCell>
                <TableCell>Main wave color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>foamColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Foam and spray color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">40</TableCell>
                <TableCell>Number of foam/debris particles on crash</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Repeat the wave animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Delay in ms between loops</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Tsunami Simulation</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Visualize tsunami waves for emergency planning and drills
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Coastal Hazards</h4>
            <p className="text-xs text-muted-foreground mt-1">Show storm surge and coastal flooding risks</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default TsunamiPage
