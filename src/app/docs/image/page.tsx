import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { ImageExample } from "../_components/examples/image-example";
import { ImageOpacityExample } from "../_components/examples/image-opacity-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image",
};

export default function ImagePage() {
  const imageSource = getExampleSource("image-example.tsx");
  const opacitySource = getExampleSource("image-opacity-example.tsx");

  return (
    <DocsLayout
      title="Image Overlay"
      description="Overlay images on specific map coordinates."
      prev={{ title: "Compare", href: "/docs/compare" }}
      next={{ title: "Video", href: "/docs/raster-video" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the image component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-image.json`} language="bash" />
      </DocsSection>

      <DocsSection title="Basic Example">
        <p>
          Add an image overlay to your map by specifying the image URL and the
          four corner coordinates.
        </p>
      </DocsSection>

      <ComponentPreview code={imageSource} className="h-125">
        <ImageExample />
      </ComponentPreview>

      <DocsSection title="Custom Opacity">
        <p>
          Control the transparency of the image overlay using the{" "}
          <DocsCode>opacity</DocsCode> prop.
        </p>
      </DocsSection>

      <ComponentPreview code={opacitySource} className="h-125">
        <ImageOpacityExample />
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
                <td className="py-2 px-3 font-mono text-xs">id</td>
                <td className="py-2 px-3 font-mono text-xs">string</td>
                <td className="py-2 px-3 font-mono text-xs">-</td>
                <td className="py-2 px-3">Unique identifier for the image layer</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">url</td>
                <td className="py-2 px-3 font-mono text-xs">string</td>
                <td className="py-2 px-3 font-mono text-xs">-</td>
                <td className="py-2 px-3">URL of the image to overlay</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">coordinates</td>
                <td className="py-2 px-3 font-mono text-xs">
                  [[lng, lat], [lng, lat], [lng, lat], [lng, lat]]
                </td>
                <td className="py-2 px-3 font-mono text-xs">-</td>
                <td className="py-2 px-3">
                  Four corner coordinates (top-left, top-right, bottom-right, bottom-left)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">opacity</td>
                <td className="py-2 px-3 font-mono text-xs">number</td>
                <td className="py-2 px-3 font-mono text-xs">1</td>
                <td className="py-2 px-3">Image opacity (0-1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocsSection>
    </DocsLayout>
  );
}
