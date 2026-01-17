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
        <CodeBlock code={`import { useVideoControl } from "@/registry/map";

function VideoControls() {
  const { play, pause, toggle, isPlaying } = useVideoControl("video-id");

  return (
    <button onClick={toggle}>
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
}`} />
      </DocsSection>

      <DocsSection title="Coordinate Format">
        <p>
          The coordinates array must contain exactly four corner points in this order:
        </p>
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">0</TableCell>
                <TableCell>Top Left</TableCell>
                <TableCell className="text-muted-foreground">Northwest corner [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1</TableCell>
                <TableCell>Top Right</TableCell>
                <TableCell className="text-muted-foreground">Northeast corner [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">2</TableCell>
                <TableCell>Bottom Right</TableCell>
                <TableCell className="text-muted-foreground">Southeast corner [longitude, latitude]</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">3</TableCell>
                <TableCell>Bottom Left</TableCell>
                <TableCell className="text-muted-foreground">Southwest corner [longitude, latitude]</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Video Format Support">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Format</TableHead>
                <TableHead>Browser Support</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><DocsCode>MP4 (H.264)</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">All browsers</TableCell>
                <TableCell className="text-muted-foreground">Widely supported, recommended as fallback</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><DocsCode>WebM (VP8/VP9)</DocsCode></TableCell>
                <TableCell className="text-muted-foreground">Chrome, Firefox, Edge</TableCell>
                <TableCell className="text-muted-foreground">Better compression, preferred for web</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Provide multiple formats for browser compatibility. Videos should be optimized for web playback with appropriate compression and resolution.
        </p>
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
