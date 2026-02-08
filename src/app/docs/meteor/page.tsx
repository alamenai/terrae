import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { MeteorExample } from "../_components/examples/meteor-example"
import { MeteorShowerExample } from "../_components/examples/meteor-shower-example"
import { MeteorIntensityExample } from "../_components/examples/meteor-intensity-example"
import { MeteorColorsExample } from "../_components/examples/meteor-colors-example"
import { MeteorControlExample } from "../_components/examples/meteor-control-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Meteor",
}

const MeteorPage = () => {
  const basicSource = getExampleSource("meteor-example.tsx")
  const showerSource = getExampleSource("meteor-shower-example.tsx")
  const intensitySource = getExampleSource("meteor-intensity-example.tsx")
  const colorsSource = getExampleSource("meteor-colors-example.tsx")
  const controlSource = getExampleSource("meteor-control-example.tsx")

  return (
    <DocsLayout
      title="Meteor"
      description="Animated meteor falling from the sky with a fiery trail and impact explosion effect."
      prev={{ title: "Lightning", href: "/docs/lightning" }}
      next={{ title: "Rain", href: "/docs/rain" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the meteor component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/meteor.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <MeteorExample />
      </ComponentPreview>

      <DocsSection title="Meteor Shower">
        <p>
          Enable <DocsCode>shower</DocsCode> mode to create multiple meteors falling in sequence. Use{" "}
          <DocsCode>showerCount</DocsCode> to control how many meteors appear in each wave.
        </p>
      </DocsSection>

      <ComponentPreview code={showerSource}>
        <MeteorShowerExample />
      </ComponentPreview>

      <DocsSection title="Intensity">
        <p>
          Control the overall power of the meteor with <DocsCode>intensity</DocsCode>. Higher values create larger
          meteors with longer tails, more trail particles, and bigger impact explosions. Use values below 1 for subtle
          effects or above 1 for dramatic strikes.
        </p>
      </DocsSection>

      <ComponentPreview code={intensitySource}>
        <MeteorIntensityExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the meteor appearance with <DocsCode>meteorColor</DocsCode> (core color),{" "}
          <DocsCode>trailColor</DocsCode> (tail particles), and <DocsCode>impactColor</DocsCode> (explosion flash).
          Create ice comets, green meteors, or any color variation.
        </p>
      </DocsSection>

      <ComponentPreview code={colorsSource}>
        <MeteorColorsExample />
      </ComponentPreview>

      <DocsSection title="Programmatic Control">
        <p>
          Use the <DocsCode>useMeteorControl</DocsCode> hook to trigger, stop, and reset the meteor animation
          programmatically. The hook also exposes the current <DocsCode>phase</DocsCode> (falling, impact, fading,
          idle).
        </p>
      </DocsSection>

      <ComponentPreview code={controlSource}>
        <MeteorControlExample />
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
                <TableCell>Unique identifier for the meteor effect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>target</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Impact point coordinates [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">300</TableCell>
                <TableCell>Canvas size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>angle</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">45</TableCell>
                <TableCell>Travel direction in degrees (45 = falling from upper-left)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>speed</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Fall duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>intensity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Overall power multiplier affecting size, tail, and impact</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>meteorColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffaa00</TableCell>
                <TableCell>Core meteor color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>trailColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ff6600</TableCell>
                <TableCell>Trail particle color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>impactColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffdd00</TableCell>
                <TableCell>Impact flash color (hex)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>tailLength</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.4</TableCell>
                <TableCell>Tail length as fraction of size (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>meteorSize</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">8</TableCell>
                <TableCell>Meteor core radius in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>impactSize</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0.3</TableCell>
                <TableCell>Impact flash radius as fraction of size</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Repeat the meteor animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2000</TableCell>
                <TableCell>Delay in ms between loops</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>shower</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Enable meteor shower mode</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showerCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4</TableCell>
                <TableCell>Number of meteors in shower mode</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Impact Events</h4>
            <p className="text-xs text-muted-foreground mt-1">Visualize meteor strikes or impact craters</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Gaming Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Add dramatic meteor effects to game worlds</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default MeteorPage
