import { DocsLayout, DocsSection, DocsCode, DocsPropTable } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BlurAreaExample } from "../_components/examples/blur-area-example"
import { BlurAreaRoundedExample } from "../_components/examples/blur-area-rounded-example"
import { BlurAreaBlockedExample } from "../_components/examples/blur-area-blocked-example"
import { BlurAreaUnlockExample } from "../_components/examples/blur-area-unlock-example"
import { BlurAreaMultiExample } from "../_components/examples/blur-area-multi-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blur Area",
}

export default function BlurAreaPage() {
  const blurAreaSource = getExampleSource("blur-area-example.tsx")
  const blurAreaRoundedSource = getExampleSource("blur-area-rounded-example.tsx")
  const blurAreaBlockedSource = getExampleSource("blur-area-blocked-example.tsx")
  const blurAreaUnlockSource = getExampleSource("blur-area-unlock-example.tsx")
  const blurAreaMultiSource = getExampleSource("blur-area-multi-example.tsx")

  return (
    <DocsLayout
      title="Blur Area"
      description="Obscure specific map regions for privacy, restrictions, or focus."
      prev={{ title: "Popup", href: "/docs/popups" }}
      next={{ title: "MiniMap", href: "/docs/minimap" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the blur area component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-blur-area.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={blurAreaSource}>
        <BlurAreaExample />
      </ComponentPreview>

      <DocsSection title="Rounded">
        <p>Use the rounded prop to add border radius. Set to "full" for a circular or pill shape.</p>
      </DocsSection>

      <ComponentPreview code={blurAreaRoundedSource}>
        <BlurAreaRoundedExample />
      </ComponentPreview>

      <DocsSection title="Block Interaction">
        <p>Prevent map interactions (pan, zoom, click) on the blur area. Try dragging inside the blurred region.</p>
      </DocsSection>

      <ComponentPreview code={blurAreaBlockedSource}>
        <BlurAreaBlockedExample />
      </ComponentPreview>

      <DocsSection title="Toggle Visibility">
        <p>Control the blur area visibility with state. Useful for unlock flows or premium content reveals.</p>
      </DocsSection>

      <ComponentPreview code={blurAreaUnlockSource}>
        <BlurAreaUnlockExample />
      </ComponentPreview>

      <DocsSection title="Multiple Areas">
        <p>
          Use the <DocsCode>areas</DocsCode> prop to blur multiple regions with a single component. Each area can have
          its own blur, background color, and border radius settings.
        </p>
      </DocsSection>

      <ComponentPreview code={blurAreaMultiSource}>
        <BlurAreaMultiExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] pairs defining a single blur area (minimum 3 points).",
            },
            {
              name: "areas",
              type: "BlurAreaConfig[]",
              description:
                "Array of blur area configurations for multiple regions. Each config has: coordinates, blur, backgroundColor, rounded.",
            },
            {
              name: "blur",
              type: "number",
              default: "8",
              description: "Default blur intensity in pixels (applies to single area or as fallback for areas).",
            },
            {
              name: "backgroundColor",
              type: "string",
              description: "Default tint color (use rgba for semi-transparent effects).",
            },
            {
              name: "rounded",
              type: 'number | "full"',
              default: "0",
              description: 'Default border radius in pixels, or "full" for fully rounded corners.',
            },
            {
              name: "blockInteraction",
              type: "boolean",
              default: "false",
              description: "Prevent map interactions (pan, zoom, click) on blur areas.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="text-sm font-medium text-foreground">Premium Content</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Blur detailed data until user subscribes or unlocks access
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="text-sm font-medium text-foreground">Unexplored Areas</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Hide undiscovered regions in games until the player explores them
            </p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Notes">
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Requires minimum 3 coordinate points to define the area</li>
          <li>The blur area is rendered as a rectangular bounding box around the provided coordinates</li>
          <li>
            Works best with <DocsCode>pitch={"{0}"}</DocsCode> - CSS backdrop-filter has limitations with 3D map
            projections
          </li>
          <li>Combine with markers to add context like a lock icon or label</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  )
}
