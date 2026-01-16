import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { BasicCompareExample } from "../_components/examples/basic-compare-example";
import { StyleCompareExample } from "../_components/examples/style-compare-example";
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
  title: "Compare",
};

export default function MapComparePage() {
  const basicCompareSource = getExampleSource("basic-compare-example.tsx");
  const styleCompareSource = getExampleSource("style-compare-example.tsx");

  return (
    <DocsLayout
      title="Compare"
      description="Compare two map views side-by-side with a resizable divider."
      prev={{ title: "Animated Pulse", href: "/docs/animated-pulse" }}
      next={{ title: "Image", href: "/docs/image" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        <p className="mt-4">Then install the compare component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-compare`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicCompareSource}>
        <BasicCompareExample />
      </ComponentPreview>

      <DocsSection title="Custom Map Styles">
        <p>
          Use the <DocsCode>beforeStyle</DocsCode> and <DocsCode>afterStyle</DocsCode> props to
          compare any two Mapbox styles. This is useful for comparing different visualization approaches,
          showing before/after changes, or demonstrating map updates.
        </p>
      </DocsSection>

      <ComponentPreview code={styleCompareSource}>
        <StyleCompareExample />
      </ComponentPreview>

      <DocsSection title="Properties">
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
                <TableCell>Mapbox access token</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>beforeStyle</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">light theme</TableCell>
                <TableCell>Style URL for the left/before map</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>afterStyle</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">dark theme</TableCell>
                <TableCell>Style URL for the right/after map</TableCell>
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
                <TableCell>Initial zoom level</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>pitch</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Map tilt angle (0-85 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>bearing</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Map rotation (-360 to 360 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>projection</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"mercator"</TableCell>
                <TableCell>Map projection type</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>defaultSize</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">50</TableCell>
                <TableCell>Initial split position (0-100 percentage)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Notes">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Renders two independent map instances side-by-side, which doubles map load billing</li>
          <li>Drag the center handle to adjust the split between before and after maps</li>
          <li>Each map can be interacted with independently - zoom and pan are not synchronized</li>
          <li>Uses shadcn/ui Resizable component for smooth, accessible panel resizing</li>
          <li>Set <DocsCode>defaultSize</DocsCode> to control the initial split position (0-100)</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  );
}
