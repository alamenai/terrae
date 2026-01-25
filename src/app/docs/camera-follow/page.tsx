import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import {
  LineCameraFollowExample,
  CameraFollowWithMarkerExample,
} from "../_components/examples/line-camera-follow-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Camera Follow",
}

const markerExampleCode = `import { Map, MapLine, MapCameraFollow, useCameraFollowControl } from "@/components/ui/map"

const route = [
  [-122.4194, 37.7749],
  [-122.4089, 37.7855],
  [-122.3964, 37.7922],
  [-122.3831, 37.8012],
  [-122.3702, 37.8156],
  [-122.3544, 37.8324],
  [-122.3401, 37.8489],
  [-122.3267, 37.8612],
  [-122.3089, 37.8734],
  [-122.2923, 37.8856],
  [-122.2756, 37.8923],
  [-122.2589, 37.9012],
  [-122.2422, 37.9089],
  [-122.2256, 37.9156],
  [-122.2089, 37.9234],
  [-122.1922, 37.9312],
  [-122.1756, 37.9389],
  [-122.1589, 37.9467],
  [-122.1422, 37.9545],
  [-122.1256, 37.9623],
] as [number, number][]

export const CameraFollowWithMarker = () => {
  const { isPlaying, toggle, stop } = useCameraFollowControl()

  return (
    <Map center={[-122.32, 37.87]} zoom={10}>
      <MapLine coordinates={route} color="#3b82f6" width={4} />
      <MapCameraFollow
        path={route}
        duration={20000}
        pitch={60}
        zoom={14}
        autoStart={isPlaying}
        onComplete={stop}
        marker
      />
    </Map>
  )
}`

export default function CameraFollowPage() {
  const cameraFollowSource = getExampleSource("line-camera-follow-example.tsx")

  return (
    <DocsLayout
      title="Camera Follow"
      description="Animate the camera along a path for immersive fly-through experiences."
      prev={{ title: "Animated Arc", href: "/docs/arc-animated" }}
      next={{ title: "Animated Markers", href: "/docs/markers-animated" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/maps/map.json`} language="bash" />
        <p className="mt-4">Then install the camera follow component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://terrae.vercel.app/maps/map-camera-follow.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={cameraFollowSource}>
        <LineCameraFollowExample />
      </ComponentPreview>

      <DocsSection title="With Navigation Marker">
        <p>
          Add a navigation marker that follows the camera position. Use <DocsCode>marker</DocsCode> for the default
          arrow, or pass a custom React element.
        </p>
      </DocsSection>

      <ComponentPreview code={markerExampleCode}>
        <CameraFollowWithMarkerExample />
      </ComponentPreview>

      <DocsSection title="Control Hook">
        <p>
          Use the <DocsCode>useCameraFollowControl</DocsCode> hook to control the animation externally. This provides{" "}
          <DocsCode>isPlaying</DocsCode>, <DocsCode>start</DocsCode>, <DocsCode>stop</DocsCode>, and{" "}
          <DocsCode>toggle</DocsCode> functions.
        </p>
        <CodeBlock
          code={`const { isPlaying, start, stop, toggle } = useCameraFollowControl()

<MapCameraFollow
  path={route}
  autoStart={isPlaying}
  onComplete={stop}
/>`}
          language="tsx"
          showCopyButton={false}
        />
      </DocsSection>

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
                  <DocsCode>path</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">[number, number][]</TableCell>
                <TableCell className="text-muted-foreground">required</TableCell>
                <TableCell>Array of coordinates for the camera to follow</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>duration</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">20000</TableCell>
                <TableCell>Animation duration in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>zoom</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">14</TableCell>
                <TableCell>Camera zoom level during flight</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>pitch</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">60</TableCell>
                <TableCell>Camera tilt angle (0-85 degrees)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>autoStart</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">true</TableCell>
                <TableCell>Start animation automatically on mount</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">false</TableCell>
                <TableCell>Loop the animation continuously</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>loopDelay</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">1000</TableCell>
                <TableCell>Delay before restarting loop in milliseconds</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>onComplete</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Callback when animation completes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>marker</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean | ReactNode</TableCell>
                <TableCell className="text-muted-foreground">-</TableCell>
                <TableCell>Navigation marker (true for default arrow, or custom element)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>markerSize</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">number</TableCell>
                <TableCell className="text-muted-foreground">48</TableCell>
                <TableCell>Size of the default navigation marker in pixels</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="Notes">
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
          <li>The camera bearing is calculated automatically based on the path direction</li>
          <li>Combine with MapLine to show the route the camera is following</li>
          <li>Works best with the standard map style for 3D building context</li>
          <li>Path requires at least 2 coordinates</li>
        </ul>
      </DocsSection>
    </DocsLayout>
  )
}
