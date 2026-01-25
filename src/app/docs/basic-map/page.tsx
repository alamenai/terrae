import { DocsLayout, DocsSection, DocsCode, DocsNote, DocsLink, NewBadge } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BasicMapExample } from "../_components/examples/basic-map-example"
import { GlobeMapExample } from "../_components/examples/globe-map-example"
import { RotatingGlobeExample } from "../_components/examples/rotating-globe-example"
import { ProjectionSwitcherExample } from "../_components/examples/projection-switcher-example"
import { StandardMapExample } from "../_components/examples/standard-map-example"
import { StyleSwitcherExample } from "../_components/examples/style-switcher-example"
import { InteractiveMapExample } from "../_components/examples/interactive-map-example"
import { CustomLoaderExample } from "../_components/examples/custom-loader-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Map",
}

export default function BasicMapPage() {
  const basicMapSource = getExampleSource("basic-map-example.tsx")
  const globeMapSource = getExampleSource("globe-map-example.tsx")
  const rotatingGlobeSource = getExampleSource("rotating-globe-example.tsx")
  const projectionSwitcherSource = getExampleSource("projection-switcher-example.tsx")
  const standardMapSource = getExampleSource("standard-map-example.tsx")
  const styleSwitcherSource = getExampleSource("style-switcher-example.tsx")
  const interactiveMapSource = getExampleSource("interactive-map-example.tsx")
  const customLoaderSource = getExampleSource("custom-loader-example.tsx")

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

      <DocsSection title="Projections">
        <p>
          Use the <DocsCode>projection</DocsCode> prop to change how the map is displayed. Mapbox GL supports 8
          projections including <DocsCode>globe</DocsCode> for 3D views, <DocsCode>mercator</DocsCode> (default),{" "}
          <DocsCode>naturalEarth</DocsCode>, <DocsCode>equalEarth</DocsCode>, and more. See the{" "}
          <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/guides/projections/" external>
            Mapbox Projections Guide
          </DocsLink>{" "}
          for details on each projection type.
        </p>
      </DocsSection>

      <ComponentPreview code={globeMapSource}>
        <GlobeMapExample />
      </ComponentPreview>

      <DocsSection title="Auto-Rotating Globe" id="auto-rotate" badge={<NewBadge />}>
        <p>
          Enable automatic rotation on globe projection with the <DocsCode>autoRotate</DocsCode> prop. Control the
          rotation speed with <DocsCode>rotateSpeed</DocsCode> (degrees per second, default: 3). This only works when{" "}
          <DocsCode>projection="globe"</DocsCode> is set.
        </p>
      </DocsSection>

      <ComponentPreview code={rotatingGlobeSource}>
        <RotatingGlobeExample />
      </ComponentPreview>

      <DocsSection title="Projection Switcher">
        <p>
          Try different projections to see how they affect the map display. Each projection has unique characteristics
          suited for different use cases.
        </p>
      </DocsSection>

      <ComponentPreview code={projectionSwitcherSource}>
        <ProjectionSwitcherExample />
      </ComponentPreview>

      <DocsSection title="Interactive Example">
        <p>Adjust map properties to see how they affect the display in real-time.</p>
      </DocsSection>

      <ComponentPreview code={interactiveMapSource}>
        <InteractiveMapExample />
      </ComponentPreview>

      <DocsSection title="Theme Support" id="theme-support">
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

      <DocsSection title="Style Presets" id="style-presets" badge={<NewBadge />}>
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
                  <DocsCode>standardMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">standard</TableCell>
                <TableCell className="text-muted-foreground">standard</TableCell>
                <TableCell>Modern 3D style with buildings and landmarks</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>streetsMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">streets-v12</TableCell>
                <TableCell className="text-muted-foreground">dark-v11</TableCell>
                <TableCell>Detailed street maps with roads, transit, and POIs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>outdoorsMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">outdoors-v12</TableCell>
                <TableCell className="text-muted-foreground">dark-v11</TableCell>
                <TableCell>Topographic lines, trails, and natural features</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>satelliteMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">satellite-streets-v12</TableCell>
                <TableCell className="text-muted-foreground">satellite-streets-v12</TableCell>
                <TableCell>Satellite imagery with street overlays</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>navigationMapStyles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">navigation-day-v1</TableCell>
                <TableCell className="text-muted-foreground">navigation-night-v1</TableCell>
                <TableCell>Optimized for navigation with enhanced roads</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Standard Style" id="standard-style">
        <p>
          The <DocsCode>standardMapStyles</DocsCode> preset uses Mapbox Standard, a modern style featuring 3D buildings,
          dynamic lighting, and rich landmarks. Automatically switches to night mode in dark theme.
        </p>
      </DocsSection>

      <ComponentPreview code={standardMapSource}>
        <StandardMapExample />
      </ComponentPreview>

      <DocsSection title="Style Switcher">
        <p>
          Try different style presets to see how they affect the map display. Toggle your theme to see how each preset
          adapts.
        </p>
      </DocsSection>

      <ComponentPreview code={styleSwitcherSource}>
        <StyleSwitcherExample />
      </ComponentPreview>

      <DocsNote>
        <strong>Custom styles supported!</strong> You can use any Mapbox style by passing a custom{" "}
        <DocsCode>styles</DocsCode> object or a single <DocsCode>style</DocsCode> URL. See the{" "}
        <DocsLink href="https://docs.mapbox.com/api/maps/styles/" external>
          Mapbox Styles API
        </DocsLink>{" "}
        for all available styles.
      </DocsNote>

      <DocsSection title="Custom Loader" id="custom-loader" badge={<NewBadge />}>
        <p>
          Use the <DocsCode>loader</DocsCode> prop to display a custom loading component while the map initializes. This
          is useful for branding or providing a better loading experience. The <DocsCode>showLoader</DocsCode> prop
          gives you full control over loader visibility, allowing you to keep the loader displayed until user
          interaction.
        </p>
      </DocsSection>

      <ComponentPreview code={customLoaderSource}>
        <CustomLoaderExample />
      </ComponentPreview>

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
                <TableCell>
                  Map projection type: mercator, globe, albers, equalEarth, equirectangular, lambertConformalConic,
                  naturalEarth, winkelTripel
                </TableCell>
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
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>showLoader</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">undefined</TableCell>
                <TableCell>
                  Controls loader visibility. When true, forces loader to show. When false, hides loader. When
                  undefined, uses internal loading state.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>autoRotate</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>
                  Enables automatic rotation. Only works with <DocsCode>projection="globe"</DocsCode>.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <DocsCode>rotateSpeed</DocsCode>
                    <NewBadge />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">3</TableCell>
                <TableCell>Rotation speed in degrees per second when autoRotate is enabled.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
