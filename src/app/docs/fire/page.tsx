import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { FireExample } from "../_components/examples/fire-example"
import { FireIntensityExample } from "../_components/examples/fire-intensity-example"
import { FireCustomColorsExample } from "../_components/examples/fire-custom-colors-example"
import { FireSpreadExample } from "../_components/examples/fire-spread-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Fire",
}

const FirePage = () => {
  const basicSource = getExampleSource("fire-example.tsx")
  const intensitySource = getExampleSource("fire-intensity-example.tsx")
  const colorsSource = getExampleSource("fire-custom-colors-example.tsx")
  const spreadSource = getExampleSource("fire-spread-example.tsx")

  return (
    <DocsLayout
      title="Fire"
      description="Realistic animated fire effect with particle simulation."
      prev={{ title: "Explosion", href: "/docs/explosion" }}
      next={{ title: "Lightning", href: "/docs/lightning" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the fire component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/fire.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <FireExample />
      </ComponentPreview>

      <DocsSection title="Intensity">
        <p>
          Control the fire intensity with the <DocsCode>intensity</DocsCode> prop. Higher values create larger, more
          vigorous flames with wider particle spread. Combine with <DocsCode>size</DocsCode> to create fires of
          different scales.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <FireIntensityExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the flame colors with <DocsCode>baseColor</DocsCode> (bottom of flame) and{" "}
          <DocsCode>tipColor</DocsCode> (top of flame). Create magical blue flames, green toxic fires, or any color
          combination.
        </p>
      </DocsSection>

      <ComponentPreview code={colorsSource}>
        <FireCustomColorsExample />
      </ComponentPreview>

      <DocsSection title="Spreading Fire">
        <p>
          Enable <DocsCode>spread</DocsCode> to simulate fire spreading across an area, like a forest fire. Control the
          spread behavior with <DocsCode>spreadSpeed</DocsCode> (time between new fire sources),{" "}
          <DocsCode>spreadRadius</DocsCode> (how far fire spreads), and <DocsCode>maxSpreadPoints</DocsCode> (maximum
          number of fire points).
        </p>
      </DocsSection>

      <ComponentPreview code={spreadSource}>
        <FireSpreadExample />
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
                <TableCell>Unique identifier for the fire effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Fire location as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">120</TableCell>
                <TableCell>Fire size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Fire intensity (affects spread and velocity)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">50</TableCell>
                <TableCell>Number of fire particles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>baseColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffcc00</TableCell>
                <TableCell>Base flame color (bottom)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>tipColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ff3300</TableCell>
                <TableCell>Tip flame color (top)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spread</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Enable fire spreading behavior</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spreadSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Time in ms between new fire points</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spreadRadius</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.4</TableCell>
                <TableCell>Spread radius as fraction of size (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>maxSpreadPoints</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">8</TableCell>
                <TableCell>Maximum number of fire sources</TableCell>
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
            <h4 className="font-medium text-sm text-foreground">Wildfire Visualization</h4>
            <p className="text-xs text-muted-foreground mt-1">Display active wildfire locations on emergency maps</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Gaming Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Add fire effects to game world maps and battle scenes</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default FirePage
