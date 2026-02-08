import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { ExplosionExample } from "../_components/examples/explosion-example"
import { ExplosionNuclearExample } from "../_components/examples/explosion-nuclear-example"
import { ExplosionColorsExample } from "../_components/examples/explosion-colors-example"
import { ExplosionBarrageExample } from "../_components/examples/explosion-barrage-example"
import { ExplosionTriggerExample } from "../_components/examples/explosion-trigger-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Explosion",
}

const ExplosionPage = () => {
  const basicSource = getExampleSource("explosion-example.tsx")
  const nuclearSource = getExampleSource("explosion-nuclear-example.tsx")
  const colorsSource = getExampleSource("explosion-colors-example.tsx")
  const barrageSource = getExampleSource("explosion-barrage-example.tsx")
  const triggerSource = getExampleSource("explosion-trigger-example.tsx")

  return (
    <DocsLayout
      title="Explosion"
      description="Animated explosion burst effect with radial particles and flash."
      prev={{ title: "Cyclone", href: "/docs/cyclone" }}
      next={{ title: "Fire", href: "/docs/fire" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the explosion component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/explosion.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <ExplosionExample />
      </ComponentPreview>

      <DocsSection title="Nuclear Type">
        <p>
          Set <DocsCode>type=&quot;nuclear&quot;</DocsCode> for a dramatic mushroom cloud explosion. Features a rising
          fireball, expanding mushroom cap, shockwave ring, and longer-lasting particles. Automatically increases size
          and duration for maximum impact.
        </p>
      </DocsSection>

      <ComponentPreview code={nuclearSource}>
        <ExplosionNuclearExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the explosion colors with <DocsCode>coreColor</DocsCode> (center flash) and{" "}
          <DocsCode>outerColor</DocsCode> (particle trails). Create fiery, electric, or magical explosion effects.
        </p>
      </DocsSection>

      <ComponentPreview code={colorsSource}>
        <ExplosionColorsExample />
      </ComponentPreview>

      <DocsSection title="Multiple Explosions">
        <p>
          Compose multiple <DocsCode>MapExplosion</DocsCode> instances in the same area with staggered timing to
          simulate a barrage. Each explosion runs independently with its own size, duration, and loop delay.
        </p>
      </DocsSection>

      <ComponentPreview code={barrageSource}>
        <ExplosionBarrageExample />
      </ComponentPreview>

      <DocsSection title="Programmatic Control">
        <p>
          Use <DocsCode>useExplosionControl</DocsCode> hook to trigger explosions programmatically. Set{" "}
          <DocsCode>autoStart=false</DocsCode> to prevent the explosion from firing on mount, then call{" "}
          <DocsCode>control.trigger()</DocsCode> when needed.
        </p>
      </DocsSection>

      <ComponentPreview code={triggerSource}>
        <ExplosionTriggerExample />
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
                <TableCell>Unique identifier for the explosion</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Explosion location as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>type</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">&quot;burst&quot; | &quot;nuclear&quot;</TableCell>
                <TableCell className="text-muted-foreground">&quot;burst&quot;</TableCell>
                <TableCell>Explosion style - burst (radial) or nuclear (mushroom cloud)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">150</TableCell>
                <TableCell>Explosion size in pixels (nuclear min: 200)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>particleCount</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">60</TableCell>
                <TableCell>Number of explosion particles (nuclear min: 80)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">3000</TableCell>
                <TableCell>Total visible time from appear to fade (nuclear min: 4000)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coreColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ffffff</TableCell>
                <TableCell>Center flash color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>outerColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#ff6600</TableCell>
                <TableCell>Particle trail color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Trigger explosion on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Repeat explosion continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">3000</TableCell>
                <TableCell>Delay between loops in milliseconds</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Gaming Maps</h4>
            <p className="text-xs text-muted-foreground mt-1">Impact effects for strategy and battle games</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Event Triggers</h4>
            <p className="text-xs text-muted-foreground mt-1">Visual feedback for user interactions or achievements</p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default ExplosionPage
