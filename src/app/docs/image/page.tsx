import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { ImageExample } from "../_components/examples/image-example"
import { ImageOpacityExample } from "../_components/examples/image-opacity-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Image",
}

export default function ImagePage() {
  const imageSource = getExampleSource("image-example.tsx")
  const opacitySource = getExampleSource("image-opacity-example.tsx")

  return (
    <DocsLayout
      title="Image"
      description="Overlay images on specific map coordinates."
      prev={{ title: "Polygon", href: "/docs/polygon" }}
      next={{ title: "Music Disc", href: "/docs/music-disc" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the image component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/image.json`} language="bash" />
      </DocsSection>

      <DocsSection title="Basic Example">
        <p>Add an image overlay to your map by specifying the image URL and the four corner coordinates.</p>
      </DocsSection>

      <ComponentPreview code={imageSource} className="h-125">
        <ImageExample />
      </ComponentPreview>

      <DocsSection title="Custom Opacity">
        <p>
          Control the transparency of the image overlay using the <DocsCode>opacity</DocsCode> prop.
        </p>
      </DocsSection>

      <ComponentPreview code={opacitySource} className="h-125">
        <ImageOpacityExample />
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
                  <DocsCode>id</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Unique identifier for the image layer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>url</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>URL of the image to overlay</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>coordinates</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">MapImageCorners</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Four corner coordinates (top-left, top-right, bottom-right, bottom-left)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>opacity</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Image opacity (0-1)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
