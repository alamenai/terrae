import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { StandalonePopupExample } from "../_components/examples/standalone-popup-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popup",
};

export const revalidate = 60;

export default function PopupsPage() {
  const popupSource = getExampleSource("standalone-popup-example.tsx");

  return (
    <DocsLayout
      title="Popup"
      description="Display popups anywhere on the map without markers."
      prev={{ title: "Marker", href: "/docs/markers" }}
      next={{ title: "MiniMap", href: "/docs/minimap" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        <p className="mt-4">Then install the popup component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-popup`} language="bash" />
      </DocsSection>

      <ComponentPreview code={popupSource}>
        <StandalonePopupExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
