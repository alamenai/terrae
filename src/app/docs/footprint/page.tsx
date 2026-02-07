import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { FootprintExample } from "../_components/examples/footprint-example"
import { FootprintCustomExample } from "../_components/examples/footprint-custom-example"
import { FootprintSizeExample } from "../_components/examples/footprint-size-example"
import { FootprintSlowExample } from "../_components/examples/footprint-slow-example"
import { FootprintControlExample } from "../_components/examples/footprint-control-example"
import { getExampleSource } from "@/lib/get-example-source"
import type { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Animated Footprint",
}

const FootprintPage = () => {
  const basicSource = getExampleSource("footprint-example.tsx")
  const customSource = getExampleSource("footprint-custom-example.tsx")
  const sizeSource = getExampleSource("footprint-size-example.tsx")
  const slowSource = getExampleSource("footprint-slow-example.tsx")
  const controlSource = getExampleSource("footprint-control-example.tsx")

  return (
    <DocsLayout
      title="Animated Footprint"
      description="Animated footprint steps that walk along a path on the map."
      prev={{ title: "Animated Pulse", href: "/docs/animated-pulse" }}
      next={{ title: "Blur Area", href: "/docs/blur-area" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the footprint component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/animated-footprint.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <FootprintExample />
      </ComponentPreview>

      <DocsSection title="Spacing">
        <p>
          Use <DocsCode>stepSpacing</DocsCode> to control the distance between footprints in meters. Smaller values
          create denser footprints, while larger values spread them further apart.
        </p>
      </DocsSection>

      <ComponentPreview code={customSource}>
        <FootprintCustomExample />
      </ComponentPreview>

      <DocsSection title="Size">
        <p>
          Use the <DocsCode>size</DocsCode> prop to control how large the footprint icons appear. Larger sizes work well
          for close-up street-level views, while smaller sizes suit wider area overviews.
        </p>
      </DocsSection>

      <ComponentPreview code={sizeSource}>
        <FootprintSizeExample />
      </ComponentPreview>

      <DocsSection title="Stagger Delay">
        <p>
          Use <DocsCode>staggerDelay</DocsCode> to control the pace of the walking animation. Higher values create a
          slower, more leisurely pace. This example uses 800ms between steps.
        </p>
      </DocsSection>

      <ComponentPreview code={slowSource}>
        <FootprintSlowExample />
      </ComponentPreview>

      <DocsSection title="Control">
        <p>
          Use the <DocsCode>useFootprintControl</DocsCode> hook with <DocsCode>autoStart=&#123;false&#125;</DocsCode> to
          start and reset the animation programmatically.
        </p>
      </DocsSection>

      <ComponentPreview code={controlSource}>
        <FootprintControlExample />
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
                  <DocsCode>path</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">MapPath</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of [longitude, latitude] coordinates defining the walking path</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>id</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"footprint"</TableCell>
                <TableCell>Unique identifier for the footprint instance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>color</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#000000</TableCell>
                <TableCell>Footprint icon color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">20</TableCell>
                <TableCell>Footprint icon size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>stepSpacing</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">48</TableCell>
                <TableCell>Distance between footprint steps in meters</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>staggerDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">200</TableCell>
                <TableCell>Delay in milliseconds between each step appearing</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">400</TableCell>
                <TableCell>Fade-in animation duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation automatically when the component mounts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Restart animation after all steps are shown</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>className</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Custom CSS class applied to each footprint element</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Tips">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            For long paths with many steps, consider increasing <DocsCode>stepSpacing</DocsCode> to reduce the number of
            markers and improve performance.
          </li>
          <li>
            Use larger <DocsCode>size</DocsCode> values (24-32) for street-level zoom (16+) and smaller values (14-18)
            for wider area views (zoom 12-14).
          </li>
          <li>
            The <DocsCode>loop</DocsCode> prop is useful for demos and presentations, but consider disabling it for
            production to avoid continuous animation cycles.
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Walking Tours</h4>
            <p className="text-xs text-muted-foreground mt-1">Visualize walking routes through cities and landmarks</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Hiking Trails</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Animate trail paths for outdoor and nature applications
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default FootprintPage
