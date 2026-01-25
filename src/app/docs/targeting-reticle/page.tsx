import { DocsLayout, DocsSection, DocsCode, DocsPropTable } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { TargetingReticleExample } from "../_components/examples/targeting-reticle-example"
import { TargetingReticleStaticExample } from "../_components/examples/targeting-reticle-static-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Targeting Reticle",
}

export default function TargetingReticlePage() {
  const trackingSource = getExampleSource("targeting-reticle-example.tsx")
  const staticSource = getExampleSource("targeting-reticle-static-example.tsx")

  return (
    <DocsLayout
      title="Targeting Reticle"
      description="Military-style targeting brackets with tracking and lock-on capabilities."
      prev={{ title: "Blur Area", href: "/docs/blur-area" }}
      next={{ title: "MiniMap", href: "/docs/minimap" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the targeting reticle component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-targeting-reticle.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={staticSource}>
        <TargetingReticleStaticExample />
      </ComponentPreview>

      <DocsSection title="Tracking Animation">
        <p>
          The reticle tracks towards a target and locks on when it reaches it. Combine with{" "}
          <DocsCode>MapAnimatedPulse</DocsCode> to mark the target location. The <DocsCode>onLocked</DocsCode> callback
          fires when the target is acquired.
        </p>
      </DocsSection>

      <ComponentPreview code={trackingSource}>
        <TargetingReticleExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number]",
              description: "Starting position [longitude, latitude] for the reticle.",
            },
            {
              name: "target",
              type: "[number, number]",
              description: "Target position to track towards. When reached, the reticle locks on.",
            },
            {
              name: "size",
              type: "number",
              default: "120",
              description: "Overall size of the reticle in pixels.",
            },
            {
              name: "bracketLength",
              type: "number",
              default: "24",
              description: "Length of the corner bracket lines in pixels.",
            },
            {
              name: "bracketThickness",
              type: "number",
              default: "2",
              description: "Stroke width of the bracket lines.",
            },
            {
              name: "gap",
              type: "number",
              default: "8",
              description: "Gap between the reticle edge and the brackets.",
            },
            {
              name: "color",
              type: "string",
              default: "rgba(59, 130, 246, 0.9)",
              description: "Default bracket and crosshair color (blue).",
            },
            {
              name: "lockedColor",
              type: "string",
              default: "rgba(34, 197, 94, 0.9)",
              description: "Color when locked on target (green).",
            },
            {
              name: "locked",
              type: "boolean",
              default: "false",
              description: "Manually control the lock state.",
            },
            {
              name: "trackingSpeed",
              type: "number",
              default: "0.02",
              description: "Animation speed when tracking (0-1). Higher values are faster.",
            },
            {
              name: "showCrosshair",
              type: "boolean",
              default: "true",
              description: "Show the center crosshair lines.",
            },
            {
              name: "showCoordinates",
              type: "boolean",
              default: "false",
              description: "Display GPS coordinates below the reticle in DMS format.",
            },
            {
              name: "onLocked",
              type: "() => void",
              description: "Callback fired when the reticle locks onto the target.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="text-sm font-medium text-foreground">Military Drone Operations</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Track reconnaissance drones and mark strategic positions on the battlefield
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="text-sm font-medium text-foreground">Wildlife Conservation</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Monitor endangered species with GPS collars in protected reserves
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
