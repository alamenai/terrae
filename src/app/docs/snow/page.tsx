import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { SnowExample } from "../_components/examples/snow-example"
import { SnowIntensityExample } from "../_components/examples/snow-intensity-example"
import { SnowWindExample } from "../_components/examples/snow-wind-example"
import { SnowColorExample } from "../_components/examples/snow-color-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Snow",
}

const SnowPage = () => {
  const basicSource = getExampleSource("snow-example.tsx")
  const intensitySource = getExampleSource("snow-intensity-example.tsx")
  const windSource = getExampleSource("snow-wind-example.tsx")
  const colorSource = getExampleSource("snow-color-example.tsx")

  return (
    <DocsLayout
      title="Snow"
      description="Falling snowflakes effect with gentle drift and wind."
      prev={{ title: "Sandstorm", href: "/docs/sandstorm" }}
      next={{ title: "Steam", href: "/docs/steam" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the snow component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/snow.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <SnowExample />
      </ComponentPreview>

      <DocsSection title="Intensity">
        <p>
          Control the snowfall intensity with the <DocsCode>intensity</DocsCode> prop. Higher values create denser
          snowfall with larger flakes. Create anything from light flurries to heavy blizzards.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <SnowIntensityExample />
      </ComponentPreview>

      <DocsSection title="Wind">
        <p>
          Add wind effects with <DocsCode>windSpeed</DocsCode> and <DocsCode>windDirection</DocsCode>. Wind causes
          snowflakes to drift horizontally as they fall, creating more realistic weather effects.
        </p>
      </DocsSection>

      <ComponentPreview code={windSource}>
        <SnowWindExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the snowflake color with the <DocsCode>color</DocsCode> prop. Use pure white for classic snow or add
          a slight blue tint for a colder atmosphere.
        </p>
      </DocsSection>

      <ComponentPreview code={colorSource}>
        <SnowColorExample />
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
                <TableCell>Unique identifier for the snow effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Overall snow intensity (affects density and flake size)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">150</TableCell>
                <TableCell>Number of snowflakes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Snowflake color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>windSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.5</TableCell>
                <TableCell>Horizontal wind speed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>windDirection</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Wind direction in degrees (0 = east)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>fallSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Vertical fall speed multiplier</TableCell>
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
            <p className="text-xs text-muted-foreground mt-1">Display current or forecasted snowfall on weather maps</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Ski Resort Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Add atmospheric snow effects to ski trail maps</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default SnowPage
