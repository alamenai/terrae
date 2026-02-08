import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { SteamExample } from "../_components/examples/steam-example"
import { SteamIntensityExample } from "../_components/examples/steam-intensity-example"
import { SteamColorExample } from "../_components/examples/steam-color-example"
import { SteamControlExample } from "../_components/examples/steam-control-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Steam",
}

const SteamPage = () => {
  const basicSource = getExampleSource("steam-example.tsx")
  const intensitySource = getExampleSource("steam-intensity-example.tsx")
  const colorSource = getExampleSource("steam-color-example.tsx")
  const controlSource = getExampleSource("steam-control-example.tsx")

  return (
    <DocsLayout
      title="Steam"
      description="Rising steam effect with wispy particle animation for map locations."
      prev={{ title: "Snow", href: "/docs/snow" }}
      next={{ title: "Tsunami", href: "/docs/tsunami" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the steam component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/steam.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <SteamExample />
      </ComponentPreview>

      <DocsSection title="Intensity">
        <p>
          Control the steam density with the <DocsCode>intensity</DocsCode> prop. Higher values create denser, more
          visible steam. Combine with <DocsCode>size</DocsCode> to create steam plumes of different scales.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <SteamIntensityExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the steam color with the <DocsCode>color</DocsCode> prop. Create white water vapor, yellowish
          sulfuric steam, or greenish toxic fumes.
        </p>
      </DocsSection>

      <ComponentPreview code={colorSource}>
        <SteamColorExample />
      </ComponentPreview>

      <DocsSection title="Programmatic Control">
        <p>
          Use the <DocsCode>useSteamControl</DocsCode> hook to start, stop, or adjust steam intensity programmatically.
        </p>
      </DocsSection>

      <ComponentPreview code={controlSource}>
        <SteamControlExample />
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
                <TableCell>Unique identifier for programmatic control via useSteamControl</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Steam location as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">100</TableCell>
                <TableCell>Steam plume size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Steam density and opacity</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">40</TableCell>
                <TableCell>Number of steam particles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Steam color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>drift</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.4</TableCell>
                <TableCell>Horizontal drift amount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>riseSpeed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Vertical rise speed</TableCell>
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
            <h4 className="font-medium text-sm text-foreground">Geothermal Activity</h4>
            <p className="text-xs text-muted-foreground mt-1">Display hot springs, geysers, and volcanic vents</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Industrial Sites</h4>
            <p className="text-xs text-muted-foreground mt-1">Show factories, power plants, or cooling towers</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default SteamPage
