import {
  DocsCode,
  DocsLayout,
  DocsLink,
  DocsNote,
  DocsSection,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Map, MapMarker, MarkerContent } from "@/registry/map";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "site-url-here";

const envCode = `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here`;

const usageCode = `import { Map, MapMarker, MarkerContent } from "@/registry/map";
import { Card } from "@/components/ui/card";

export function MyMap() {
  return (
    <Card className="h-[500px] p-0 overflow-hidden">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-74.006, 40.7128]}
        zoom={11}
      >
        <MapMarker coordinates={[-74.006, 40.7128]}>
          <MarkerContent>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                New York
              </span>
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>
    </Card>
  );
}`;

export const metadata: Metadata = {
  title: "Installation",
};

export default function InstallationPage() {
  return (
    <DocsLayout
      title="Installation"
      description="How to install and set up Terrae in your project."
      prev={{ title: "Introduction", href: "/docs" }}
      next={{ title: "Comparison", href: "/docs/comparison" }}
    >
      <DocsSection title="Prerequisites">
        <p>
          A project with{" "}
          <DocsLink href="https://tailwindcss.com" external>
            Tailwind CSS
          </DocsLink>{" "}
          and{" "}
          <DocsLink href="https://ui.shadcn.com" external>
            shadcn/ui
          </DocsLink>{" "}
          already configured.
        </p>
      </DocsSection>

      <DocsSection title="Get Mapbox Access Token">
        <p>
          First, you need a Mapbox access token. Get one from{" "}
          <DocsLink href="https://account.mapbox.com/access-tokens/" external>
            Mapbox Account
          </DocsLink>
          . Create a new token with default public scopes.
        </p>
        <p className="mt-4">
          Once you have your token, add it to your <DocsCode>.env.local</DocsCode> file:
        </p>
        <CodeBlock code={envCode} language="bash" />
      </DocsSection>

      <DocsSection title="Add Components">
        <p>
          Start with the base map component:
        </p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map`} language="bash" />
        
        <p className="mt-4">
          Then add the specific components you need. For example, to add markers:
        </p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map-marker`} language="bash" />

        <p className="mt-4">
          Visit the <DocsLink href="/docs/components">components page</DocsLink> to see all available components and their installation commands.
        </p>

        <DocsNote>
          <strong className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Tip:</strong> Install all components at once with <DocsCode>npx shadcn@latest add https://terrae.vercel.app/registry -a</DocsCode>
        </DocsNote>
      </DocsSection>

      <DocsSection title="Usage">
        <p>Import and use the map component in your application:</p>
        <CodeBlock code={usageCode} />
        <Card className="h-[500px] p-0 overflow-hidden rounded-lg mt-4">
          <Map
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
            center={[-74.006, 40.7128]}
            zoom={11}
          >
            <MapMarker coordinates={[-74.006, 40.7128]}>
              <MarkerContent>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-sm">
                    New York
                  </span>
                </div>
              </MarkerContent>
            </MapMarker>
          </Map>
        </Card>
      </DocsSection>
    </DocsLayout>
  );
}
