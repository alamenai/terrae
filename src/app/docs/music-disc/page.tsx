import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { MusicDiscExample } from "../_components/examples/music-disc-example"
import { MusicDiscAlbumExample } from "../_components/examples/music-disc-album-example"
import { MusicDiscCustomExample } from "../_components/examples/music-disc-custom-example"
import { MusicDiscStaticExample } from "../_components/examples/music-disc-static-example"
import { MusicDiscFlatExample } from "../_components/examples/music-disc-flat-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Music Disc",
}

const MusicDiscPage = () => {
  const basicSource = getExampleSource("music-disc-example.tsx")
  const albumSource = getExampleSource("music-disc-album-example.tsx")
  const customSource = getExampleSource("music-disc-custom-example.tsx")
  const staticSource = getExampleSource("music-disc-static-example.tsx")
  const flatSource = getExampleSource("music-disc-flat-example.tsx")

  return (
    <DocsLayout
      title="Music Disc"
      description="Rotating music disc with floating notes animation for map locations."
      prev={{ title: "Image", href: "/docs/image" }}
      next={{ title: "Video", href: "/docs/raster-video" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the music disc component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/music-disc.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <MusicDiscExample />
      </ComponentPreview>

      <DocsSection title="With Album Cover">
        <p>
          Add a custom album cover image using the <DocsCode>image</DocsCode> prop. The image will be displayed in the
          center of the disc.
        </p>
      </DocsSection>

      <ComponentPreview code={albumSource}>
        <MusicDiscAlbumExample />
      </ComponentPreview>

      <DocsSection title="Custom Colors">
        <p>
          Customize the disc appearance with <DocsCode>discColor</DocsCode>, <DocsCode>centerColor</DocsCode>, and{" "}
          <DocsCode>noteColor</DocsCode> props. Adjust the spin speed with <DocsCode>spinDuration</DocsCode> (in
          milliseconds).
        </p>
      </DocsSection>

      <ComponentPreview code={customSource}>
        <MusicDiscCustomExample />
      </ComponentPreview>

      <DocsSection title="Static Mode">
        <p>
          Disable the spinning animation with <DocsCode>spinning=false</DocsCode> and hide the floating notes with{" "}
          <DocsCode>showNotes=false</DocsCode> for a static vinyl record appearance.
        </p>
      </DocsSection>

      <ComponentPreview code={staticSource}>
        <MusicDiscStaticExample />
      </ComponentPreview>

      <DocsSection title="Flat on Map">
        <p>
          Use <DocsCode>pitchAlignment=&quot;map&quot;</DocsCode> to make the disc lay flat on the map surface when the
          map is tilted. The default <DocsCode>&quot;viewport&quot;</DocsCode> keeps it always facing the screen.
        </p>
      </DocsSection>

      <ComponentPreview code={flatSource}>
        <MusicDiscFlatExample />
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
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Map coordinates [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>size</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">64</TableCell>
                <TableCell>Disc size in pixels</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>image</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Album cover image URL</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spinning</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Enable disc rotation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>spinDuration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">4000</TableCell>
                <TableCell>Full rotation duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>showNotes</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Show floating music notes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>noteColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#a855f7</TableCell>
                <TableCell>Color of floating music notes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>discColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#0a0a0a</TableCell>
                <TableCell>Main disc background color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>centerColor</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">#171717</TableCell>
                <TableCell>Center label area color</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>pitchAlignment</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  &quot;map&quot; | &quot;viewport&quot; | &quot;auto&quot;
                </TableCell>
                <TableCell className="text-muted-foreground">&quot;viewport&quot;</TableCell>
                <TableCell>
                  How disc aligns when map is pitched. &quot;viewport&quot; keeps it upright, &quot;map&quot; lays it
                  flat
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>className</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Additional CSS classes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Use Cases">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Music Venues</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Show concert venues, music stores, or recording studios on the map
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <h4 className="font-medium text-sm text-foreground">Audio Tours</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Indicate audio playback points on interactive tour maps
            </p>
          </div>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default MusicDiscPage
