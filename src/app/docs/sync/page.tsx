import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { BasicSyncExample } from "../_components/examples/basic-sync-example"
import { VerticalSyncExample } from "../_components/examples/vertical-sync-example"
import { GridSyncExample } from "../_components/examples/grid-sync-example"
import { SatelliteComparisonExample } from "../_components/examples/satellite-comparison-example"
import { NavigationSyncExample } from "../_components/examples/navigation-sync-example"
import { TerrainComparisonExample } from "../_components/examples/terrain-comparison-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Sync",
}

export default function MapSyncPage() {
  const basicSyncSource = getExampleSource("basic-sync-example.tsx")
  const verticalSyncSource = getExampleSource("vertical-sync-example.tsx")
  const gridSyncSource = getExampleSource("grid-sync-example.tsx")
  const satelliteComparisonSource = getExampleSource("satellite-comparison-example.tsx")
  const navigationSyncSource = getExampleSource("navigation-sync-example.tsx")
  const terrainComparisonSource = getExampleSource("terrain-comparison-example.tsx")

  return (
    <DocsLayout
      title="Sync"
      description="Synchronized multi-map component where panning, zooming, or rotating one map updates all others in real-time."
      prev={{ title: "Radar", href: "/docs/radar" }}
      next={{ title: "Targeting Reticle", href: "/docs/targeting-reticle" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the sync component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/sync.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSyncSource}>
        <BasicSyncExample />
      </ComponentPreview>

      <DocsSection title="Vertical Layout">
        <p>
          Use <DocsCode>layout=&quot;vertical&quot;</DocsCode> to stack maps vertically. This works well for narrow
          containers or when comparing maps that benefit from a top-bottom view.
        </p>
      </DocsSection>

      <ComponentPreview code={verticalSyncSource}>
        <VerticalSyncExample />
      </ComponentPreview>

      <DocsSection title="Four-Map Grid">
        <p>
          Pass four maps with <DocsCode>layout=&quot;grid&quot;</DocsCode> to create a 2x2 grid. This allows comparing
          multiple styles simultaneously - street, satellite, light, and dark themes all synced together.
        </p>
      </DocsSection>

      <ComponentPreview code={gridSyncSource}>
        <GridSyncExample />
      </ComponentPreview>

      <DocsSection title="Satellite Comparison">
        <p>
          Compare satellite imagery with labeled satellite views to understand how street overlays enhance navigation.
        </p>
      </DocsSection>

      <ComponentPreview code={satelliteComparisonSource}>
        <SatelliteComparisonExample />
      </ComponentPreview>

      <DocsSection title="Navigation Styles">
        <p>Compare day and night navigation styles to see how maps adapt for different driving conditions.</p>
      </DocsSection>

      <ComponentPreview code={navigationSyncSource}>
        <NavigationSyncExample />
      </ComponentPreview>

      <DocsSection title="Terrain Comparison">
        <p>
          Use <DocsCode>pitch</DocsCode> to tilt the maps and compare how different styles render mountainous terrain.
          The grid layout with four maps makes it easy to compare multiple perspectives at once.
        </p>
      </DocsSection>

      <ComponentPreview code={terrainComparisonSource}>
        <TerrainComparisonExample />
      </ComponentPreview>

      <DocsSection title="Properties">
        <div className="rounded-md border">
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
                <TableCell>Mapbox access token</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>maps</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">MapConfig[]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of 2 or 4 map configurations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>layout</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  &quot;horizontal&quot; | &quot;vertical&quot; | &quot;grid&quot;
                </TableCell>
                <TableCell className="text-muted-foreground">&quot;horizontal&quot;</TableCell>
                <TableCell>Layout arrangement for the maps</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showLabels</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Show labels on each map panel</TableCell>
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
                <TableCell>Initial zoom level</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>pitch</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Map tilt angle (0-85 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>bearing</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">0</TableCell>
                <TableCell>Map rotation (-360 to 360 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>projection</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">&quot;mercator&quot;</TableCell>
                <TableCell>Map projection type</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loader</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">ReactNode</TableCell>
                <TableCell className="text-muted-foreground">Globe spinner</TableCell>
                <TableCell>Custom loading indicator</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Map Configuration">
        <p className="mb-4">
          Each map in the <DocsCode>maps</DocsCode> array accepts these properties:
        </p>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>style</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell>Mapbox style URL (overrides theme)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>styles</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">{"{ light?: string, dark?: string }"}</TableCell>
                <TableCell>Theme-aware style URLs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>label</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell>Custom label for the map panel</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Notes">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Each map is a separate Mapbox instance, which means billing applies per map</li>
          <li>Synchronization is bidirectional - interact with any map to update all others</li>
          <li>The grid layout requires exactly 4 maps; 2 maps work with horizontal or vertical layouts</li>
          <li>Movement sync uses Mapbox&apos;s move event for smooth, real-time updates</li>
          <li>Custom labels can be set per map, or use the default position-based labels</li>
        </ul>
      </DocsSection>

      <DocsSection title="Comparison vs Sync">
        <p className="text-sm text-muted-foreground mt-2">
          <strong>MapCompare</strong> shows two maps side-by-side without synchronization - each map can be panned
          independently. <strong>MapSync</strong> keeps all maps synchronized - moving one moves all. Use MapCompare
          when you want independent exploration, use MapSync when you want to compare the same location across different
          styles.
        </p>
      </DocsSection>
    </DocsLayout>
  )
}
