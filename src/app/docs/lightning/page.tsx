import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { LightningExample } from "../_components/examples/lightning-example"
import { LightningColorExample } from "../_components/examples/lightning-color-example"
import { LightningStrikeExample } from "../_components/examples/lightning-strike-example"
import { LightningStormExample } from "../_components/examples/lightning-storm-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Lightning",
}

const LightningPage = () => {
  const basicSource = getExampleSource("lightning-example.tsx")
  const colorSource = getExampleSource("lightning-color-example.tsx")
  const strikeSource = getExampleSource("lightning-strike-example.tsx")
  const stormSource = getExampleSource("lightning-storm-example.tsx")

  return (
    <DocsLayout
      title="Lightning"
      description="Animated lightning bolt strikes with branching and flash effects."
      prev={{ title: "Fire", href: "/docs/fire" }}
      next={{ title: "Meteor", href: "/docs/meteor" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the lightning component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/lightning.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <LightningExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the lightning appearance with <DocsCode>boltColor</DocsCode> and <DocsCode>flashColor</DocsCode>.
          Create purple electrical storms, blue plasma bolts, or any color combination.
        </p>
      </DocsSection>

      <ComponentPreview code={colorSource}>
        <LightningColorExample />
      </ComponentPreview>

      <DocsSection title="Manual Strike Control">
        <p>
          Disable automatic strikes with <DocsCode>autoStrike={"{false}"}</DocsCode> and use the{" "}
          <DocsCode>useLightningControl</DocsCode> hook to trigger strikes programmatically. Perfect for user-triggered
          events or synchronized effects.
        </p>
      </DocsSection>

      <ComponentPreview code={strikeSource}>
        <LightningStrikeExample />
      </ComponentPreview>

      <DocsSection title="Lightning Storm">
        <p>
          Create dramatic storm scenes by placing multiple lightning components with different{" "}
          <DocsCode>strikeInterval</DocsCode> values. Vary the <DocsCode>size</DocsCode> to create depth and randomness.
        </p>
      </DocsSection>

      <ComponentPreview code={stormSource}>
        <LightningStormExample />
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
                <TableCell>Unique identifier for the lightning effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Lightning location as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Lightning bolt size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>boltColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Lightning bolt color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>flashColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#e0e8ff</TableCell>
                <TableCell>Flash effect color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>flashIntensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.6</TableCell>
                <TableCell>Flash intensity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStrike</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Enable automatic lightning strikes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>strikeInterval</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4000</TableCell>
                <TableCell>Time in ms between strikes (min: 500)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>boltWidth</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4</TableCell>
                <TableCell>Width of the lightning bolt</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>branchProbability</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Probability of bolt branching (0-1)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Weather Visualization</h4>
            <p className="text-xs text-muted-foreground mt-1">Display active thunderstorms on weather maps</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Gaming Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Add dramatic weather effects to game world maps</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default LightningPage
