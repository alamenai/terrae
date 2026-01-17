import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { HeatmapExample } from "../_components/examples/heatmap-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heatmaps",
};

export default function HeatmapsPage() {
  const heatmapSource = getExampleSource("heatmap-example.tsx");

  return (
    <DocsLayout
      title="Heatmaps"
      description="Visualize density data with heatmap layers."
      prev={{ title: "Rain Effect", href: "/docs/rain" }}
    >
      <DocsSection>
        <p>
          Heatmaps visualize density data using color gradients to show concentrations of data points, making patterns and hotspots immediately visible. This example shows earthquake data transitioning from heatmap to individual circles at higher zoom levels.
        </p>
      </DocsSection>

      <DocsSection title="Installation">
        <p>The heatmap functionality is included in the base map component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={heatmapSource}>
        <HeatmapExample />
      </ComponentPreview>

      <DocsSection title="Implementation">
        <p>
          Create a heatmap by adding a layer with <DocsCode>type: "heatmap"</DocsCode> and
          configuring the paint properties to control colors, intensity, and radius.
        </p>
      </DocsSection>

      <DocsSection title="Key Paint Properties">
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mt-2">
          <li>
            <strong className="text-foreground">heatmap-weight</strong> - Measure of how much an
            individual point contributes to the heatmap. Higher values create stronger hotspots.
          </li>
          <li>
            <strong className="text-foreground">heatmap-intensity</strong> - Overall intensity
            multiplier. Can be zoom-dependent to make heatmap more visible at different scales.
          </li>
          <li>
            <strong className="text-foreground">heatmap-color</strong> - Color gradient from low
            to high density. Uses interpolation between density values.
          </li>
          <li>
            <strong className="text-foreground">heatmap-radius</strong> - Radius of influence for
            each point in pixels. Larger radius creates smoother, more general patterns.
          </li>
          <li>
            <strong className="text-foreground">heatmap-opacity</strong> - Overall layer opacity.
            Can transition from heatmap to individual points at high zoom.
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="Color Gradients">
        <p>
          The heatmap color gradient is defined using interpolation expressions. Colors transition
          based on <DocsCode>heatmap-density</DocsCode> values from 0 to 1:
        </p>
        <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
{`"heatmap-color": [
  "interpolate",
  ["linear"],
  ["heatmap-density"],
  0, "rgba(33,102,172,0)",      // Transparent at 0 density
  0.2, "rgb(103,169,207)",       // Light blue
  0.4, "rgb(209,229,240)",       // Lighter blue
  0.6, "rgb(253,219,199)",       // Light orange
  0.8, "rgb(239,138,98)",        // Orange
  1, "rgb(178,24,43)"            // Red at max density
]`}
        </pre>
      </DocsSection>

      <DocsSection title="Best Practices">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Use heatmaps for large datasets where individual points would create clutter</li>
          <li>Adjust heatmap-intensity based on zoom level to maintain visibility</li>
          <li>Transition to circle/symbol layers at high zoom for detail</li>
          <li>Choose color gradients that are colorblind-friendly and intuitive</li>
          <li>Consider using sequential or diverging color schemes for density data</li>
          <li>Set appropriate maxzoom to prevent heatmap from showing at street level</li>
        </ul>
      </DocsSection>

      <DocsSection title="Common Use Cases">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Population density visualization</li>
          <li>Crime or incident hotspot analysis</li>
          <li>Customer location clustering</li>
          <li>Disease outbreak tracking</li>
          <li>Traffic accident concentration</li>
          <li>Weather data (temperature, precipitation)</li>
          <li>Sales territory analysis</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  );
}
