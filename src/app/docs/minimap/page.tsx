import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { MiniMapExample } from "../_components/examples/minimap-example";
import { MiniMapPositionExample } from "../_components/examples/minimap-position-example";
import { MiniMapCustomExample } from "../_components/examples/minimap-custom-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiniMap",
};

export default function MiniMapPage() {
  const miniMapSource = getExampleSource("minimap-example.tsx");
  const positionSource = getExampleSource("minimap-position-example.tsx");
  const customSource = getExampleSource("minimap-custom-example.tsx");

  return (
    <DocsLayout
      title="MiniMap"
      description="Add a minimap overview to help users understand their location context."
      prev={{ title: "Popup", href: "/docs/popups" }}
      next={{ title: "Lines", href: "/docs/lines" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        <p className="mt-4">Then install the minimap component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-mini-map`} language="bash" />
      </DocsSection>

      <DocsSection title="Basic Example">
        <p>
          Add a minimap to your map to show the current viewport location in a
          wider geographical context.
        </p>
      </DocsSection>

      <ComponentPreview code={miniMapSource} className="h-125">
        <MiniMapExample />
      </ComponentPreview>

      <DocsSection title="Custom Position">
        <p>
          Position the minimap in any corner of the map using the{" "}
          <DocsCode>position</DocsCode> prop.
        </p>
      </DocsSection>

      <ComponentPreview code={positionSource} className="h-125">
        <MiniMapPositionExample />
      </ComponentPreview>

      <DocsSection title="Custom Styling">
        <p>
          Customize the minimap size, zoom offset, and viewport box appearance
          to match your design.
        </p>
      </DocsSection>

      <ComponentPreview code={customSource} className="h-125">
        <MiniMapCustomExample />
      </ComponentPreview>

      <DocsSection title="Props">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Prop</th>
                <th className="text-left py-2 px-3">Type</th>
                <th className="text-left py-2 px-3">Default</th>
                <th className="text-left py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3 font-mono text-xs">position</td>
                <td className="py-2 px-3 font-mono text-xs">
                  "top-left" | "top-right" | "bottom-left" | "bottom-right"
                </td>
                <td className="py-2 px-3 font-mono text-xs">"bottom-right"</td>
                <td className="py-2 px-3">Corner position of the minimap</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">width</td>
                <td className="py-2 px-3 font-mono text-xs">number</td>
                <td className="py-2 px-3 font-mono text-xs">200</td>
                <td className="py-2 px-3">Width in pixels</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">height</td>
                <td className="py-2 px-3 font-mono text-xs">number</td>
                <td className="py-2 px-3 font-mono text-xs">150</td>
                <td className="py-2 px-3">Height in pixels</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">zoomOffset</td>
                <td className="py-2 px-3 font-mono text-xs">number</td>
                <td className="py-2 px-3 font-mono text-xs">-4</td>
                <td className="py-2 px-3">
                  Zoom offset from main map (negative = zoomed out)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">style</td>
                <td className="py-2 px-3 font-mono text-xs">string</td>
                <td className="py-2 px-3 font-mono text-xs">-</td>
                <td className="py-2 px-3">
                  Custom Mapbox style URL (defaults to main map style)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">boxColor</td>
                <td className="py-2 px-3 font-mono text-xs">string</td>
                <td className="py-2 px-3 font-mono text-xs">"#3b82f6"</td>
                <td className="py-2 px-3">Color of the viewport box</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">boxBorderWidth</td>
                <td className="py-2 px-3 font-mono text-xs">number</td>
                <td className="py-2 px-3 font-mono text-xs">2</td>
                <td className="py-2 px-3">Border width of the viewport box</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocsSection>
    </DocsLayout>
  );
}
