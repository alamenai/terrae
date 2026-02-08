import { DocsCode, DocsLayout, DocsLink, DocsNote, DocsSection } from "../_components/docs"
import { CodeBlock } from "../_components/code-block"
import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Map, MapMarker, MarkerContent } from "@/registry/map"

const envCode = `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here`

const mapLibreInstallCode = `npx shadcn@latest add https://www.terrae.dev/maplibre.json`

const mapLibraryCode = `// map-library.ts — change these 3 lines:
import mapboxgl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
const detectedLibrary: MapLibraryName = "maplibre"`

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
}`

export const metadata: Metadata = {
  title: "Installation",
}

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

      <DocsSection title="Using Mapbox GL" id="using-mapbox-gl">
        <p>
          To use Mapbox GL JS, you need an access token. Get one from{" "}
          <DocsLink href="https://account.mapbox.com/access-tokens/" external>
            Mapbox Account
          </DocsLink>
          . Create a new token with default public scopes.
        </p>
        <p className="mt-4">
          Add it to your <DocsCode>.env.local</DocsCode> file:
        </p>
        <CodeBlock code={envCode} language="bash" />
      </DocsSection>

      <DocsSection title="Using MapLibre GL" id="using-maplibre-gl">
        <p>
          To use{" "}
          <DocsLink href="https://maplibre.org/" external>
            MapLibre GL JS
          </DocsLink>{" "}
          instead of Mapbox, install the MapLibre variant of the base map component:
        </p>
        <CodeBlock code={mapLibreInstallCode} language="bash" />

        <p className="mt-4">
          This installs the same core map files but with <DocsCode>map-library.ts</DocsCode> pre-configured for MapLibre
          GL, including the correct imports and default styles.
        </p>

        <p className="mt-4">
          If you already installed the Mapbox variant and want to switch manually, first install the MapLibre package:
        </p>
        <CodeBlock code={`npm install maplibre-gl\nnpm install -D @types/mapbox-gl`} language="bash" />

        <p className="mt-4">
          Then update <DocsCode>map-library.ts</DocsCode> with these 3 lines:
        </p>
        <CodeBlock code={mapLibraryCode} language="typescript" />

        <DocsNote>
          <strong className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Note:
          </strong>{" "}
          No access token is needed when using MapLibre GL. Some features like the Rain Effect and Standard styles are
          Mapbox-only and will not work with MapLibre.
        </DocsNote>
      </DocsSection>

      <DocsSection title="Add Components">
        <p>Start with the base map component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />

        <p className="mt-4">Then add the specific components you need. For example, to add markers:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/marker.json`} language="bash" />

        <p className="mt-4">
          Visit the <DocsLink href="/docs/components">components page</DocsLink> to see all available components and
          their installation commands.
        </p>

        <DocsNote>
          <strong className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tip:
          </strong>{" "}
          Dependencies are automatically resolved! Just install the components you need.
        </DocsNote>

        <DocsNote>
          <strong className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Heads up:
          </strong>{" "}
          A simpler command is coming soon! Once{" "}
          <DocsLink href="https://github.com/shadcn-ui/ui/pull/9358" external>
            this pull request
          </DocsLink>{" "}
          is approved, you&apos;ll be able to install components with:{" "}
          <DocsCode>npx shadcn@latest add terrae/map</DocsCode>
        </DocsNote>
      </DocsSection>

      <DocsSection title="Usage">
        <p>Import and use the map component in your application:</p>
        <CodeBlock code={usageCode} />
        <Card className="h-[500px] p-0 overflow-hidden rounded-lg mt-4">
          <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-74.006, 40.7128]} zoom={11}>
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
  )
}
