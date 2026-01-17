import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { CodeBlock } from "../_components/code-block";
import { VideoLayerExample } from "../_components/examples/video-layer-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Video",
};

export default function VideoPage() {
  const videoLayerSource = getExampleSource("video-layer-example.tsx");

  return (
    <DocsLayout
      title="Video"
      description="Add georeferenced video overlays to your maps with playback controls."
      prev={{ title: "Image", href: "/docs/image" }}
      next={{ title: "Rain Effect", href: "/docs/rain" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the video layer component:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-raster-video.json`} language="bash" />
        <p className="mt-2">
          Use the <DocsCode>useVideoControl</DocsCode> hook to control video playback
          with play, pause, and toggle functions.
        </p>
      </DocsSection>

      <ComponentPreview code={videoLayerSource}>
        <VideoLayerExample />
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
                <TableCell><DocsCode>id</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Unique identifier for the video layer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>urls</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">string[]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of video URLs (provide multiple formats)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>coordinates</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">[[number, number], ...]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Four corner coordinates [topLeft, topRight, bottomRight, bottomLeft]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>opacity</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1</TableCell>
                <TableCell>Video opacity (0-1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>autoplay</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Auto-play video on load</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>loop</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Loop video playback</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>muted</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Mute video audio</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Playback Control Hook">
        <p>
          Use the <DocsCode>useVideoControl</DocsCode> hook to control video playback:
        </p>
        <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
{`import { useVideoControl } from "@/registry/map";

function VideoControls() {
  const { play, pause, toggle, isPlaying } = useVideoControl("video-id");

  return (
    <button onClick={toggle}>
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
}`}
        </pre>
      </DocsSection>

      <DocsSection title="Coordinate Format">
        <p>
          The coordinates array must contain exactly four corner points in this order:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li><strong>Top Left</strong> - Northwest corner [longitude, latitude]</li>
          <li><strong>Top Right</strong> - Northeast corner [longitude, latitude]</li>
          <li><strong>Bottom Right</strong> - Southeast corner [longitude, latitude]</li>
          <li><strong>Bottom Left</strong> - Southwest corner [longitude, latitude]</li>
        </ol>
        <p className="mt-2 text-sm text-muted-foreground">
          These coordinates define where the video should appear on the map and how it should be
          oriented and stretched.
        </p>
      </DocsSection>

      <DocsSection title="Video Format Support">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Provide multiple video formats (MP4, WebM) for browser compatibility</li>
          <li>MP4 (H.264) is widely supported across all browsers</li>
          <li>WebM provides better compression and is preferred for web</li>
          <li>Videos should be optimized for web playback (compressed, appropriate resolution)</li>
          <li>Consider file size - large videos may impact performance</li>
        </ul>
      </DocsSection>

      <DocsSection title="Important Notes">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>Videos must be hosted on a web server accessible to the browser</li>
          <li>CORS headers must be properly configured on the video server</li>
          <li>Video playback is affected by user's internet connection speed</li>
          <li>Autoplay may be blocked by browsers depending on user settings</li>
          <li>Keep videos muted by default to avoid autoplay issues</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  );
}
