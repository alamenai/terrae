import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { BasicLineExample } from "../_components/examples/basic-line-example";
import { RouteExample } from "../_components/examples/route-example";
import { OSRMRouteExample } from "../_components/examples/osrm-route-example";
import { LineColorExample } from "../_components/examples/line-color-example";
import { LineWidthExample } from "../_components/examples/line-width-example";
import { LineOpacityExample } from "../_components/examples/line-opacity-example";
import { LineDashExample } from "../_components/examples/line-dash-example";
import { LineGapExample } from "../_components/examples/line-gap-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lines",
};

export default function LinesPage() {
  const basicLineSource = getExampleSource("basic-line-example.tsx");
  const routeSource = getExampleSource("route-example.tsx");
  const osrmSource = getExampleSource("osrm-route-example.tsx");
  const colorSource = getExampleSource("line-color-example.tsx");
  const widthSource = getExampleSource("line-width-example.tsx");
  const opacitySource = getExampleSource("line-opacity-example.tsx");
  const dashSource = getExampleSource("line-dash-example.tsx");
  const gapSource = getExampleSource("line-gap-example.tsx");

  return (
    <DocsLayout
      title="Lines"
      description="Draw lines and paths connecting coordinates on the map."
      prev={{ title: "MiniMap", href: "/docs/minimap" }}
      next={{ title: "Animated Lines", href: "/docs/lines-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        <p className="mt-4">Then install the line component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-line`} language="bash" />
      </DocsSection>

      <DocsSection title="Basic Line">
        <p>Draw a simple line connecting a series of coordinates.</p>
      </DocsSection>

      <ComponentPreview code={basicLineSource}>
        <BasicLineExample />
      </ComponentPreview>

      <DocsSection title="Markers">
        <p>Combine lines with markers to show stops or waypoints along the path.</p>
      </DocsSection>

      <ComponentPreview code={routeSource}>
        <RouteExample />
      </ComponentPreview>

      <DocsSection title="Real-Time Routes with OSRM">
        <p>
          Display real-world routes calculated by OSRM (Open Source Routing Machine). 
          This example fetches the optimized route between waypoints and displays it on the map.
        </p>
      </DocsSection>

      <ComponentPreview code={osrmSource}>
        <OSRMRouteExample />
      </ComponentPreview>

      <DocsSection title="Line Colors">
        <p>
          Customize line colors using the <DocsCode>color</DocsCode> prop.
          Choose from any color value to match your design or data visualization needs.
        </p>
      </DocsSection>

      <ComponentPreview code={colorSource}>
        <LineColorExample />
      </ComponentPreview>

      <DocsSection title="Line Width">
        <p>
          Adjust the thickness of your lines using the <DocsCode>width</DocsCode>{" "}
          prop. Values are in pixels and can range from thin (1px) to thick (15px or more).
        </p>
      </DocsSection>

      <ComponentPreview code={widthSource}>
        <LineWidthExample />
      </ComponentPreview>

      <DocsSection title="Line Opacity">
        <p>
          Control line transparency with the <DocsCode>opacity</DocsCode> prop.
          Values range from 0 (transparent) to 1 (fully opaque).
        </p>
      </DocsSection>

      <ComponentPreview code={opacitySource}>
        <LineOpacityExample />
      </ComponentPreview>

      <DocsSection title="Dash Patterns">
        <p>
          Control the dash length in dashed lines using the{" "}
          <DocsCode>dashArray</DocsCode> prop. The first value determines the
          length of each dash segment.
        </p>
      </DocsSection>

      <ComponentPreview code={dashSource}>
        <LineDashExample />
      </ComponentPreview>

      <DocsSection title="Gap Spacing">
        <p>
          Adjust the spacing between dashes using the gap value in the{" "}
          <DocsCode>dashArray</DocsCode> prop. The second value controls the
          space between each dash.
        </p>
      </DocsSection>

      <ComponentPreview code={gapSource}>
        <LineGapExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
