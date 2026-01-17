import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { AnimatedMarkerExample } from "../_components/examples/animated-marker-example";
import { AnimatedMarkerLoopExample } from "../_components/examples/animated-marker-loop-example";
import { MultiAnimatedMarkerExample } from "../_components/examples/multi-animated-marker-example";
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
  title: "Animated Markers",
};

export default function AnimatedMarkersPage() {
  const animatedMarkerSource = getExampleSource("animated-marker-example.tsx");
  const loopSource = getExampleSource("animated-marker-loop-example.tsx");
  const multiSource = getExampleSource("multi-animated-marker-example.tsx");

  return (
    <DocsLayout
      title="Animated Markers"
      description="Animate markers smoothly along paths for real-time tracking and visualization."
      prev={{ title: "Animated Lines", href: "/docs/lines-animated" }}
      next={{ title: "Circle Clusters", href: "/docs/circle-clusters" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the animated marker component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-marker-animated.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={loopSource}>
        <AnimatedMarkerLoopExample />
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
                <TableCell><DocsCode>id</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Unique identifier for the marker</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>coordinates</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">Array&lt;[number, number]&gt;</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of [longitude, latitude] coordinates defining the path</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>color</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Marker color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>size</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">10</TableCell>
                <TableCell>Marker radius in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>duration</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">5000</TableCell>
                <TableCell>Animation duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>autoStart</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation automatically on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>loop</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Loop the animation continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>showPath</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Show the path/route line</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>pathColor</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"#3b82f6"</TableCell>
                <TableCell>Path line color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>pathWidth</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4</TableCell>
                <TableCell>Path line width in pixels</TableCell>
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

      <DocsSection title="Restart Animation">
        <p>
          Control animation playback by restarting the animation on demand.
        </p>
      </DocsSection>

      <ComponentPreview code={animatedMarkerSource}>
        <AnimatedMarkerExample />
      </ComponentPreview>

      <DocsSection title="Multiple Markers">
        <p>
          Animate multiple markers simultaneously by rendering several <DocsCode>MapMarkerAnimated</DocsCode> components.
        </p>
      </DocsSection>

      <ComponentPreview code={multiSource}>
        <MultiAnimatedMarkerExample />
      </ComponentPreview>

      <DocsSection title="Use Cases">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Real-time delivery tracking and ETAs</li>
          <li>Ride-sharing vehicle location updates</li>
          <li>Fleet management and logistics</li>
          <li>Historical route playback (showing past trips)</li>
          <li>Running/cycling activity visualization</li>
          <li>Flight path animations</li>
          <li>Guided tours and storytelling</li>
        </ul>
      </DocsSection>

      <DocsSection title="Performance Tips">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Limit the number of simultaneously animated markers</li>
          <li>Use cancelAnimationFrame to stop animations when not needed</li>
          <li>Simplify routes by removing unnecessary intermediate points</li>
          <li>Consider using web workers for complex path calculations</li>
          <li>Throttle updates if animating many markers simultaneously</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  );
}
