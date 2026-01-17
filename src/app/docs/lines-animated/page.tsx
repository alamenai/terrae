import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { BasicAnimatedRouteExample } from "../_components/examples/basic-animated-route-example";
import { CustomAnimatedRouteExample } from "../_components/examples/custom-animated-route-example";
import { MultiAnimatedRouteExample } from "../_components/examples/multi-animated-route-example";
import { ParallelRocketsExample } from "../_components/examples/parallel-rockets-example";
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
  title: "Animated Lines",
};

export default function AnimatedLinesPage() {
  const basicSource = getExampleSource("basic-animated-route-example.tsx");
  const customSource = getExampleSource("custom-animated-route-example.tsx");
  const multiSource = getExampleSource("multi-animated-route-example.tsx");
  const rocketsSource = getExampleSource("parallel-rockets-example.tsx");

  return (
    <DocsLayout
      title="Animated Lines"
      description="Animate line paths being drawn on the map with smooth transitions."
      prev={{ title: "Lines", href: "/docs/lines" }}
      next={{ title: "Animated Markers", href: "/docs/markers-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the animated line component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-line-animated.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <BasicAnimatedRouteExample />
      </ComponentPreview>

      <DocsSection title="Customization">
        <p>
          Control the animation speed, colors, and behavior with various props. You can
          adjust the duration, enable looping, and customize the appearance of both the
          route and the moving marker.
        </p>
      </DocsSection>

      <ComponentPreview code={customSource}>
        <CustomAnimatedRouteExample />
      </ComponentPreview>

      <DocsSection title="Multiple Lines">
        <p>
          Animate multiple lines simultaneously by adding multiple{" "}
          <DocsCode>MapAnimatedLine</DocsCode> components. Each line can have different
          colors, durations, and start times.
        </p>
      </DocsSection>

      <ComponentPreview code={multiSource}>
        <MultiAnimatedRouteExample />
      </ComponentPreview>

      <DocsSection title="Custom Marker Icons">
        <p>
          Use custom icons from Lucide or any React component as markers by passing them to the{" "}
          <DocsCode>markerIcon</DocsCode> prop. This example shows four parallel routes with
          rocket icons moving in the same direction.
        </p>
      </DocsSection>

      <ComponentPreview code={rocketsSource}>
        <ParallelRocketsExample />
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
                <TableCell><DocsCode>id</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Unique identifier for the route</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>coordinates</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">Array&lt;[number, number]&gt;</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of [longitude, latitude] pairs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>color</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Route line color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>width</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4</TableCell>
                <TableCell>Route line width in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>opacity</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Route line opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>duration</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">3000</TableCell>
                <TableCell>Animation duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>showMarker</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show animated marker moving along route</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>markerColor</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Marker circle color (used when markerIcon is not provided)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>markerIcon</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">ReactNode</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Custom marker icon (e.g., Lucide icon component)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>autoStart</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Auto-start animation on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>loop</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Loop animation continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>onComplete</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Callback when animation completes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Delivery and logistics tracking with progressive route display</li>
          <li>Turn-by-turn directions with animated path reveal</li>
          <li>Tour and storytelling applications showing journey progression</li>
          <li>Fleet management showing vehicle path history</li>
          <li>Sports tracking showing running/cycling routes</li>
          <li>Historical route playback for trips and travels</li>
          <li>Onboarding tutorials with animated map interactions</li>
        </ul>
      </DocsSection>

      <DocsSection title="Future Ideas">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>3D vertical animations (e.g., rocket launches from ground to sky using line-z-offset)</li>
          <li>Custom marker icons during animation</li>
          <li>Easing functions for non-linear animation curves</li>
          <li>Synchronization controls for multiple animated lines</li>
        </ul>
      </DocsSection>

      <DocsSection title="Performance Tips">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Simplify routes with many points by removing unnecessary coordinates</li>
          <li>Limit the number of simultaneously animating routes (3-5 recommended)</li>
          <li>Use longer durations for smoother animations with less CPU usage</li>
          <li>Disable marker with <DocsCode>showMarker=false</DocsCode> for better performance</li>
          <li>Consider using <DocsCode>autoStart=false</DocsCode> and trigger manually</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  );
}
