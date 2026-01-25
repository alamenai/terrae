import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { CodeBlock } from "../_components/code-block"
import { Metadata } from "next"
import Link from "next/link"
import { Map, Play, Video, Navigation, Route } from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Hooks",
  description: "React hooks for controlling map components",
}

type HookItem = {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  component: string
  href: string
}

const hooks: HookItem[] = [
  {
    name: "useMap",
    description: "Access the Mapbox GL instance and loading state",
    icon: Map,
    component: "Map",
    href: "#usemap",
  },
  {
    name: "useVideoControl",
    description: "Control video layer playback with play, pause, and toggle",
    icon: Video,
    component: "MapVideoLayer",
    href: "#usevideocontrol",
  },
  {
    name: "useLineAnimatedControl",
    description: "Control animated line playback state",
    icon: Play,
    component: "MapLineAnimated",
    href: "#uselineanimatedcontrol",
  },
  {
    name: "useMarkerAnimatedControl",
    description: "Control animated marker playback state",
    icon: Navigation,
    component: "MapMarkerAnimated",
    href: "#usemarkeranimatedcontrol",
  },
  {
    name: "useCameraFollowControl",
    description: "Control camera follow animation playback",
    icon: Route,
    component: "MapCameraFollow",
    href: "#usecamerafollowcontrol",
  },
]

const HookCard = ({ hook }: { hook: HookItem }) => {
  return (
    <Link
      href={hook.href}
      className={cn(
        "group relative flex flex-col gap-3 rounded-3xl border border-border/50 bg-card p-6",
        "hover:border-border hover:shadow-md transition-all duration-200",
        "hover:bg-accent/5"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
          <hook.icon className="size-5 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold font-mono text-foreground group-hover:text-primary transition-colors">
            {hook.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{hook.description}</p>
          <p className="text-xs text-muted-foreground/70">
            Used with <DocsCode className="text-[10px]">{hook.component}</DocsCode>
          </p>
        </div>
      </div>
    </Link>
  )
}

const useMapCode = `import { useMap } from "@/registry/map";

const MyComponent = () => {
  const { map, isLoaded } = useMap();

  const flyToLocation = () => {
    if (!map) return;

    map.flyTo({
      center: [-74.006, 40.7128],
      zoom: 14,
    });
  };

  return (
    <button onClick={flyToLocation} disabled={!isLoaded}>
      Fly to NYC
    </button>
  );
};`

const useVideoControlCode = `import { useVideoControl } from "@/registry/map";

const VideoControls = () => {
  const { play, pause, toggle, isPlaying } = useVideoControl("my-video-layer");

  return (
    <div className="flex gap-2">
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={toggle}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};`

const useLineAnimatedControlCode = `import { useLineAnimatedControl, MapLineAnimated } from "@/registry/map";

const AnimatedRoute = () => {
  const { isPlaying, start, stop, toggle } = useLineAnimatedControl();

  return (
    <>
      <MapLineAnimated
        id="route"
        path={routePath}
        autoStart={isPlaying}
      />
      <button onClick={toggle}>
        {isPlaying ? "Stop" : "Start"} Animation
      </button>
    </>
  );
};`

const useMarkerAnimatedControlCode = `import { useMarkerAnimatedControl, MapMarkerAnimated } from "@/registry/map";

const AnimatedMarker = () => {
  const { isPlaying, start, stop, toggle } = useMarkerAnimatedControl();

  return (
    <>
      <MapMarkerAnimated
        id="marker"
        coordinates={pathCoordinates}
        autoStart={isPlaying}
      />
      <button onClick={toggle}>
        {isPlaying ? "Stop" : "Start"} Marker
      </button>
    </>
  );
};`

const useCameraFollowControlCode = `import { useCameraFollowControl, MapCameraFollow, MapLine } from "@/registry/map";

const CameraFollow = () => {
  const { isPlaying, start, stop, toggle } = useCameraFollowControl();

  return (
    <>
      <MapLine coordinates={route} color="#3b82f6" width={4} />
      <MapCameraFollow
        path={route}
        autoStart={isPlaying}
        onComplete={stop}
        marker
      />
      <button onClick={toggle}>
        {isPlaying ? "Pause" : "Fly Along Route"}
      </button>
    </>
  );
};`

export default function HooksPage() {
  return (
    <DocsLayout
      title="Hooks"
      description="React hooks for controlling map components and accessing the Mapbox GL instance."
      prev={{ title: "Components", href: "/docs/components" }}
      next={{ title: "Reference", href: "/docs/api-reference" }}
    >
      <DocsSection title="Available Hooks">
        <p className="text-muted-foreground mb-6">
          These hooks provide programmatic control over map components and access to the underlying Mapbox GL instance.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {hooks.map((hook) => (
            <HookCard key={hook.name} hook={hook} />
          ))}
        </div>
      </DocsSection>

      <DocsSection title="useMap" id="usemap">
        <p>
          Access the Mapbox GL map instance and loading state. Must be used within a <DocsCode>Map</DocsCode> component.
        </p>
        <CodeBlock code={useMapCode} />
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>map</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">mapboxgl.Map | null</TableCell>
                <TableCell className="text-muted-foreground">The Mapbox GL map instance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>isLoaded</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">Whether the map has finished loading</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="useVideoControl" id="usevideocontrol">
        <p>
          Control video layer playback. Pass the video layer ID to control a specific <DocsCode>MapVideoLayer</DocsCode>{" "}
          component.
        </p>
        <CodeBlock code={useVideoControlCode} />
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>layerId</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">string</TableCell>
                <TableCell className="text-muted-foreground">The ID of the video layer to control</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>play</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Start video playback</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>pause</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Pause video playback</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>toggle</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Toggle between play and pause</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>isPlaying</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">Current playback state</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="useLineAnimatedControl" id="uselineanimatedcontrol">
        <p>
          Control animated line playback state. Use with <DocsCode>MapLineAnimated</DocsCode> component.
        </p>
        <CodeBlock code={useLineAnimatedControlCode} />
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>start</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Start the animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>stop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Stop the animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>toggle</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Toggle animation state</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>isPlaying</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">Current animation state</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="useMarkerAnimatedControl" id="usemarkeranimatedcontrol">
        <p>
          Control animated marker playback state. Use with <DocsCode>MapMarkerAnimated</DocsCode> component.
        </p>
        <CodeBlock code={useMarkerAnimatedControlCode} />
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>start</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Start the animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>stop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Stop the animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>toggle</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Toggle animation state</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>isPlaying</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">Current animation state</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>

      <DocsSection title="useCameraFollowControl" id="usecamerafollowcontrol">
        <p>
          Control camera follow animation playback. Use with <DocsCode>MapCameraFollow</DocsCode> component.
        </p>
        <CodeBlock code={useCameraFollowControlCode} />
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DocsCode>start</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Start the camera animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>stop</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Stop the camera animation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>toggle</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">() =&gt; void</TableCell>
                <TableCell className="text-muted-foreground">Toggle animation state</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DocsCode>isPlaying</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">boolean</TableCell>
                <TableCell className="text-muted-foreground">Current animation state</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DocsSection>
    </DocsLayout>
  )
}
