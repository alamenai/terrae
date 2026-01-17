import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { BasicRainExample } from "../_components/examples/basic-rain-example";
import { CustomRainExample } from "../_components/examples/custom-rain-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Rain Effect",
};

export default function RainPage() {
  const basicRainSource = getExampleSource("basic-rain-example.tsx");
  const customRainSource = getExampleSource("custom-rain-example.tsx");

  return (
    <DocsLayout
      title="Rain Effect"
      description="Add realistic rain and weather effects to your maps."
      prev={{ title: "Video", href: "/docs/raster-video" }}
      next={{ title: "Heatmaps", href: "/docs/heatmaps" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the rain effect component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-rain.json`} language="bash" />
        <p className="mt-2">
          This example uses <DocsCode>createZoomInterpolation()</DocsCode> to gradually reveal
          the rain effect as users zoom in, preventing it from being visible at lower zoom levels.
        </p>
        <div className="mt-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-md text-sm">
          <strong>Note:</strong> Rain effect requires Mapbox GL JS v3.9 or higher.
        </div>
      </DocsSection>

      <ComponentPreview code={basicRainSource}>
        <BasicRainExample />
      </ComponentPreview>

      <DocsSection title="Custom Rain Properties">
        <p>
          Customize the rain appearance with various properties including density, color,
          intensity, droplet size, and wind direction.
        </p>
      </DocsSection>

      <ComponentPreview code={customRainSource}>
        <CustomRainExample />
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
                <TableCell><DocsCode>density</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number | expression</TableCell>
                <TableCell className="text-muted-foreground">0.5</TableCell>
                <TableCell>Rain intensity/amount (0-1 or Mapbox expression)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>intensity</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1.0</TableCell>
                <TableCell>Overall effect strength (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>color</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#a8adbc"</TableCell>
                <TableCell>Rain droplet color (hex format)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>opacity</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.7</TableCell>
                <TableCell>Rain transparency (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>vignette</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number | expression</TableCell>
                <TableCell className="text-muted-foreground">1.0</TableCell>
                <TableCell>Edge darkening effect strength (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>vignetteColor</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#464646"</TableCell>
                <TableCell>Color for edge darkening</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>direction</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">[0, 80]</TableCell>
                <TableCell>Wind direction vector [x, y]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>dropletSize</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">[2.6, 18.2]</TableCell>
                <TableCell>Droplet size range [min, max]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>distortionStrength</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.7</TableCell>
                <TableCell>Visual distortion intensity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>centerThinning</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Screen coverage (0 = full screen)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Zoom-Based Reveal">
        <p>
          Use the <DocsCode>createZoomInterpolation()</DocsCode> helper function to create
          zoom-based expressions for properties like density and vignette. This gradually
          reveals the effect as users zoom in.
        </p>
        <CodeBlock code={`import { MapRain, createZoomInterpolation } from "@/registry/map";

<MapRain
  density={createZoomInterpolation(0.5, 11, 13)}
  vignette={createZoomInterpolation(1.0, 11, 13)}
/>`} language="tsx" showCopyButton={false} />
        <p className="mt-2 text-sm text-muted-foreground">
          This creates an interpolation that starts at zoom level 11 (value: 0) and reaches
          the target value at zoom 13.
        </p>
      </DocsSection>

      <DocsSection title="Notes">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Requires Mapbox GL JS v3.9 or higher</li>
          <li>Works best with tilted maps (pitch between 45-75 degrees)</li>
          <li>For optimal performance, use zoom-based expressions to hide effect at low zoom levels</li>
          <li>Rain effect is automatically removed when the component unmounts</li>
          <li>Only one rain effect can be active per map instance</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  );
}
