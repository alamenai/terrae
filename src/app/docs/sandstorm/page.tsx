import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { SandstormExample } from "../_components/examples/sandstorm-example"
import { SandstormIntensityExample } from "../_components/examples/sandstorm-intensity-example"
import { SandstormWindExample } from "../_components/examples/sandstorm-wind-example"
import { SandstormColorExample } from "../_components/examples/sandstorm-color-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Sandstorm",
}

const SandstormPage = () => {
  const basicSource = getExampleSource("sandstorm-example.tsx")
  const intensitySource = getExampleSource("sandstorm-intensity-example.tsx")
  const windSource = getExampleSource("sandstorm-wind-example.tsx")
  const colorSource = getExampleSource("sandstorm-color-example.tsx")

  return (
    <DocsLayout
      title="Sandstorm"
      description="Atmospheric sandstorm effect with horizontal particle movement and reduced visibility."
      prev={{ title: "Rain", href: "/docs/rain" }}
      next={{ title: "Snow", href: "/docs/snow" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the sandstorm component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/sandstorm.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <SandstormExample />
      </ComponentPreview>

      <DocsSection title="Intensity">
        <p>
          Control the sandstorm intensity with the <DocsCode>intensity</DocsCode> prop. Higher values create denser
          particle clouds and reduced visibility. This affects both particle count and the haze overlay.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <SandstormIntensityExample />
      </ComponentPreview>

      <DocsSection title="Wind Direction">
        <p>
          Change the wind direction with <DocsCode>windDirection</DocsCode> (in degrees). Combine with{" "}
          <DocsCode>windSpeed</DocsCode> to control how fast particles move across the screen.
        </p>
      </DocsSection>

      <ComponentPreview code={windSource}>
        <SandstormWindExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the sand color with the <DocsCode>color</DocsCode> prop. Use darker browns for dust storms or
          lighter tans for desert sand. Adjust <DocsCode>visibility</DocsCode> to control the haze intensity.
        </p>
      </DocsSection>

      <ComponentPreview code={colorSource}>
        <SandstormColorExample />
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
                <TableCell>Unique identifier for the sandstorm effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Overall storm intensity (affects density and visibility)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Number of sand particles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#d4a574</TableCell>
                <TableCell>Sand/dust particle color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>windSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4</TableCell>
                <TableCell>Wind speed multiplier</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>windDirection</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Wind direction in degrees (0 = east, 90 = south)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>visibility</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Haze/visibility reduction (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>turbulence</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.5</TableCell>
                <TableCell>Particle wobble/turbulence amount</TableCell>
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
            <h4 className="font-medium text-sm text-foreground">Weather Visualization</h4>
            <p className="text-xs text-muted-foreground mt-1">Display dust storms and sandstorms on weather maps</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Desert Environments</h4>
            <p className="text-xs text-muted-foreground mt-1">Add atmospheric effects to desert region maps</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default SandstormPage
