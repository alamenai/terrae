import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { BasicMapExample } from "../_components/examples/basic-map-example";
import { GlobeMapExample } from "../_components/examples/globe-map-example";
import { InteractiveMapExample } from "../_components/examples/interactive-map-example";
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
  title: "Map",
};

export default function BasicMapPage() {
  const basicMapSource = getExampleSource("basic-map-example.tsx");
  const globeMapSource = getExampleSource("globe-map-example.tsx");
  const interactiveMapSource = getExampleSource("interactive-map-example.tsx");

  return (
    <DocsLayout
      title="Map"
      description="The foundation component that handles Mapbox GL setup, theme switching, and provides context for all map features."
      prev={{ title: "Reference", href: "/docs/api-reference" }}
      next={{ title: "Controls", href: "/docs/controls" }}
    >
      <DocsSection title="Installation">
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicMapSource}>
        <BasicMapExample />
      </ComponentPreview>

      <DocsSection title="Globe Projection">
        <p>
          Use the <DocsCode>projection</DocsCode> prop to display a 3D globe view. Perfect for world maps and global visualizations.
        </p>
      </DocsSection>

      <ComponentPreview code={globeMapSource}>
        <GlobeMapExample />
      </ComponentPreview>

      <DocsSection title="Interactive Example">
        <p>
          Adjust map properties to see how they affect the display in real-time.
        </p>
      </DocsSection>

      <ComponentPreview code={interactiveMapSource}>
        <InteractiveMapExample />
      </ComponentPreview>

      <DocsSection title="Theme Support">
        <p>
          The Map component automatically switches between light and dark styles based on your theme. Customize with the{" "}
          <DocsCode>styles</DocsCode> prop or override with <DocsCode>style</DocsCode>.
        </p>
      </DocsSection>

      <DocsSection title="Properties">
        <p>
          The Map component supports all Mapbox GL JS options. Key properties:
        </p>
        <div className="mt-4 rounded-md border">
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
                <TableCell><DocsCode>accessToken</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Mapbox access token from your Mapbox account</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>center</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">[0, 0]</TableCell>
                <TableCell>Initial map center as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>zoom</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2</TableCell>
                <TableCell>Initial zoom level (0-22)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>pitch</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Tilt angle of the map (0-85 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>bearing</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Rotation of the map (-360 to 360 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>minZoom</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Minimum zoom level constraint</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>maxZoom</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">22</TableCell>
                <TableCell>Maximum zoom level constraint</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>maxBounds</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">[[number, number], [number, number]]</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Restrict map panning to a geographic area</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>projection</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"mercator"</TableCell>
                <TableCell>Map projection type (globe, mercator, naturalEarth, equalEarth, winkelTripel)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>style</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Single map style URL (overrides theme-based styles)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>styles</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">{"{ light?: string, dark?: string }"}</TableCell>
                <TableCell className="text-muted-foreground">auto</TableCell>
                <TableCell>Custom styles for light and dark themes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>
    </DocsLayout>
  );
}
