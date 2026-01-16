import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { MapControlsExample } from "../_components/examples/map-controls-example";
import { ZoomControlExample } from "../_components/examples/zoom-example";
import { OrientationControlExample } from "../_components/examples/orientation-example";
import { FullscreenControlExample } from "../_components/examples/fullscreen-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controls",
};

export default function ControlsPage() {
  const controlsSource = getExampleSource("map-controls-example.tsx");
  const zoomSource = getExampleSource("zoom-example.tsx");
  const orientationSource = getExampleSource("orientation-example.tsx");
  const fullscreenSource = getExampleSource("fullscreen-example.tsx");

  return (
    <DocsLayout
      title="Controls"
      description="Add interactive controls to your map for zoom, compass, location, and fullscreen."
      prev={{ title: "Map", href: "/docs/basic-map" }}
      next={{ title: "Marker", href: "/docs/markers" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        <p className="mt-4">Then install the controls component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-controls`} language="bash" />
      </DocsSection>

      <ComponentPreview code={controlsSource}>
        <MapControlsExample />
      </ComponentPreview>

      <DocsSection title="Zoom">
        <p>
          The <DocsCode>MapZoom</DocsCode> component provides zoom in and zoom out buttons.
        </p>
      </DocsSection>

      <ComponentPreview code={zoomSource}>
        <ZoomControlExample />
      </ComponentPreview>

      <DocsSection title="Orientation">
        <p>
          The <DocsCode>MapOrientation</DocsCode> component shows a compass that displays the current map bearing
          and resets the map orientation when clicked. Try rotating the map (hold Ctrl/Cmd + drag) to see the compass rotate.
        </p>
      </DocsSection>

      <ComponentPreview code={orientationSource}>
        <OrientationControlExample />
      </ComponentPreview>

      <DocsSection title="Fullscreen">
        <p>
          The <DocsCode>MapFullscreen</DocsCode> component toggles fullscreen mode for the map container.
        </p>
      </DocsSection>

      <ComponentPreview code={fullscreenSource}>
        <FullscreenControlExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
