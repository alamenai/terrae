import { DocsLayout, DocsSection, DocsCode, DocsNote, DocsLink, NewBadge } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BasicMapExample } from "../_components/examples/basic-map-example"
import { GlobeMapExample } from "../_components/examples/globe-map-example"
import { InteractiveMapExample } from "../_components/examples/interactive-map-example"
import { NavigationMapExample } from "../_components/examples/navigation-map-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Map",
}

export default function BasicMapPage() {
  const basicMapSource = getExampleSource("basic-map-example.tsx")
  const globeMapSource = getExampleSource("globe-map-example.tsx")
  const interactiveMapSource = getExampleSource("interactive-map-example.tsx")
  const navigationMapSource = getExampleSource("navigation-map-example.tsx")

  return (
    <DocsLayout
      title="Map"
      description="The foundation component that handles Mapbox GL setup, theme switching, and provides context for all map features."
      prev={{ title: "Reference", href: "/docs/api-reference" }}
      next={{ title: "Controls", href: "/docs/controls" }}
    >
      <DocsSection title="Installation">
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicMapSource}>
        <BasicMapExample />
      </ComponentPreview>

      <DocsSection title="Globe Projection">
        <p>
          Use the <DocsCode>projection</DocsCode> prop to display a 3D globe view. Perfect for world maps and global
          visualizations.
        </p>
      </DocsSection>

      <ComponentPreview code={globeMapSource}>
        <GlobeMapExample />
      </ComponentPreview>

      <DocsSection title="Interactive Example">
        <p>Adjust map properties to see how they affect the display in real-time.</p>
      </DocsSection>

      <ComponentPreview code={interactiveMapSource}>
        <InteractiveMapExample />
      </ComponentPreview>

      <DocsSection title="Theme Support">
        <p>
          The Map component integrates with <DocsCode>next-themes</DocsCode> to automatically switch map styles when
          your application theme changes. By default, it uses <DocsCode>light-v11</DocsCode> for light theme and{" "}
          <DocsCode>dark-v11</DocsCode> for dark theme.
        </p>
        <p className="mt-2">
          To customize, pass the <DocsCode>styles</DocsCode> prop with your preferred light/dark style pair.
          Alternatively, use the <DocsCode>style</DocsCode> prop to set a fixed style that remains constant regardless
          of theme.
        </p>
      </DocsSection>

      <DocsSection title="Style Presets" badge={<NewBadge />}>
        <p>
          Built-in style presets are available that automatically adapt to your theme. Import and use them directly with
          the <DocsCode>styles</DocsCode> prop.
        </p>
        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preset</TableHead>
                <TableHead>Light Style</TableHead>
                <TableHead>Dark Style</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>defaultMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">light-v11</TableCell>
                <TableCell className="text-muted-foreground">dark-v11</TableCell>
                <TableCell>Clean, minimal styles for general use</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>navigationMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">navigation-day-v1</TableCell>
                <TableCell className="text-muted-foreground">navigation-night-v1</TableCell>
                <TableCell>Optimized for navigation with enhanced roads and landmarks</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Navigation Style">
        <p>
          The <DocsCode>navigationMapStyles</DocsCode> preset uses Mapbox's navigation-optimized styles. These feature
          higher contrast roads, clearer labels, and are designed for turn-by-turn navigation interfaces. The day
          variant works best in bright conditions, while the night variant reduces eye strain in low-light environments.
        </p>
      </DocsSection>

      <ComponentPreview code={navigationMapSource}>
        <NavigationMapExample />
      </ComponentPreview>

      <DocsNote>
        <strong>More styles coming soon!</strong> Additional built-in style presets including satellite, streets, and
        outdoors are planned. See the{" "}
        <DocsLink href="https://docs.mapbox.com/api/maps/styles/" external>
          Mapbox Styles API
        </DocsLink>{" "}
        for the full list of available styles.
      </DocsNote>

      <DocsSection title="Properties">
        <p>The Map component supports all Mapbox GL JS options. Key properties:</p>
        <div className="mt-4 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>accessToken</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Mapbox access token from your Mapbox account</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>center</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">[0, 0]</TableCell>
                <TableCell>Initial map center as [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>zoom</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">2</TableCell>
                <TableCell>Initial zoom level (0-22)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>pitch</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Tilt angle of the map (0-85 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>bearing</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Rotation of the map (-360 to 360 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>minZoom</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Minimum zoom level constraint</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>maxZoom</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">22</TableCell>
                <TableCell>Maximum zoom level constraint</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>maxBounds</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[[number, number], [number, number]]</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Restrict map panning to a geographic area</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>projection</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">"mercator"</TableCell>
                <TableCell>Map projection type (globe, mercator, naturalEarth, equalEarth, winkelTripel)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>style</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>Single map style URL (overrides theme-based styles)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>styles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">MapThemeStyles</TableCell>
                <TableCell className="text-muted-foreground">defaultMapStyles</TableCell>
                <TableCell>
                  Theme-aware styles object with light and dark variants. Use built-in presets like{" "}
                  <DocsCode>navigationMapStyles</DocsCode>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loader</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">ReactNode</TableCell>
                <TableCell className="text-muted-foreground">default loader</TableCell>
                <TableCell>Custom loading component shown while the map initializes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
