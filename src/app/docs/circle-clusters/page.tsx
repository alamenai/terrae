import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import ClusterExample from "../_components/examples/cluster-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Circle Clusters",
};

export default function ClustersPage() {
  const clusterSource = getExampleSource("cluster-example.tsx");

  return (
    <DocsLayout
      title="Circle Clusters"
      description="Visualize large datasets with automatic point clustering."
      prev={{ title: "Animated Markers", href: "/docs/markers-animated" }}
      next={{ title: "Animated Pulse", href: "/docs/animated-pulse" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        <p className="mt-4">Then install the cluster component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-circle-cluster`} language="bash" />
      </DocsSection>

      <ComponentPreview code={clusterSource}>
        <ClusterExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
