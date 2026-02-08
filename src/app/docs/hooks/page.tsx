import { DocsLayout, DocsSection, DocsCode, NewBadge, UpdatedBadge } from "../_components/docs"
import { CodeBlock } from "../_components/code-block"
import { Metadata } from "next"
import Link from "next/link"
import {
  Map,
  Play,
  Video,
  Navigation,
  Route,
  Orbit,
  RotateCw,
  Sparkles,
  Flame,
  Zap,
  Star,
  Wind,
  Snowflake,
  Cloud,
  Waves,
  Footprints,
} from "lucide-react"
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
  tag?: "new" | "updated"
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
    name: "useRasterVideoControl",
    description: "Control video layer playback with play, pause, and toggle",
    icon: Video,
    component: "MapRasterVideo",
    href: "#userastervidecontrol",
    tag: "updated",
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
  {
    name: "useArcAnimatedControl",
    description: "Control animated arc playback state",
    icon: Orbit,
    component: "MapArcAnimated",
    href: "#usearcanimatedcontrol",
    tag: "new",
  },
  {
    name: "useFootprintControl",
    description: "Control animated footprint start and reset",
    icon: Footprints,
    component: "MapAnimatedFootprint",
    href: "#usefootprintcontrol",
    tag: "new",
  },
  {
    name: "useCycloneControl",
    description: "Control cyclone animation, intensity, scale, and rotation speed",
    icon: RotateCw,
    component: "MapCyclone",
    href: "#usecyclonecontrol",
    tag: "new",
  },
  {
    name: "useExplosionControl",
    description: "Trigger and reset explosion effects",
    icon: Sparkles,
    component: "MapExplosion",
    href: "#useexplosioncontrol",
    tag: "new",
  },
  {
    name: "useFireControl",
    description: "Control fire animation and intensity",
    icon: Flame,
    component: "MapFire",
    href: "#usefirecontrol",
    tag: "new",
  },
  {
    name: "useLightningControl",
    description: "Trigger lightning strike effects",
    icon: Zap,
    component: "MapLightning",
    href: "#uselightningcontrol",
    tag: "new",
  },
  {
    name: "useMeteorControl",
    description: "Control meteor animation and track impact phases",
    icon: Star,
    component: "MapMeteor",
    href: "#usemeteorcontrol",
    tag: "new",
  },
  {
    name: "useSandstormControl",
    description: "Control sandstorm animation and intensity",
    icon: Wind,
    component: "MapSandstorm",
    href: "#usesandstormcontrol",
    tag: "new",
  },
  {
    name: "useSnowControl",
    description: "Control snow animation and intensity",
    icon: Snowflake,
    component: "MapSnow",
    href: "#usesnowcontrol",
    tag: "new",
  },
  {
    name: "useSteamControl",
    description: "Control steam animation and intensity",
    icon: Cloud,
    component: "MapSteam",
    href: "#usesteamcontrol",
    tag: "new",
  },
  {
    name: "useTsunamiControl",
    description: "Control tsunami animation and track wave phases",
    icon: Waves,
    component: "MapTsunami",
    href: "#usetsunamicontrol",
    tag: "new",
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
      {hook.tag === "new" && (
        <span className="absolute top-3 right-3">
          <NewBadge />
        </span>
      )}
      {hook.tag === "updated" && (
        <span className="absolute top-3 right-3">
          <UpdatedBadge />
        </span>
      )}
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

const useRasterVideoControlCode = `import { useRasterVideoControl } from "@/registry/map";

const VideoControls = () => {
  const { play, pause, toggle, isPlaying } = useRasterVideoControl("my-video-layer");

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

const useArcAnimatedControlCode = `import { useArcAnimatedControl, MapArcAnimated } from "@/registry/map";

const AnimatedArc = () => {
  const { isPlaying, start, stop, toggle } = useArcAnimatedControl();

  return (
    <>
      <MapArcAnimated
        id="arc"
        origin={[-74.006, 40.7128]}
        destination={[2.3522, 48.8566]}
      />
      <button onClick={toggle}>
        {isPlaying ? "Stop" : "Start"} Arc
      </button>
    </>
  );
};`

const useFootprintControlCode = `import { useFootprintControl, MapAnimatedFootprint } from "@/registry/map";

const FootprintControls = () => {
  const control = useFootprintControl("my-footprint");

  return (
    <>
      <MapAnimatedFootprint
        id="my-footprint"
        path={walkingPath}
        autoStart={false}
      />
      <button onClick={control?.start} disabled={control?.isActive}>
        Start Walking
      </button>
      <button onClick={control?.reset} disabled={!control?.isActive}>
        Reset
      </button>
    </>
  );
};`

const useCycloneControlCode = `import { useCycloneControl, MapCyclone } from "@/registry/map";

const Cyclone = () => {
  const control = useCycloneControl("my-cyclone");

  return (
    <>
      <MapCyclone id="my-cyclone" coordinates={[139.6917, 35.6895]} />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Stop" : "Start"} Cyclone
      </button>
      <button onClick={() => control?.setIntensity(1.5)}>
        High Intensity
      </button>
      <button onClick={() => control?.setRotationSpeed(3)}>
        Fast Spin
      </button>
    </>
  );
};`

const useExplosionControlCode = `import { useExplosionControl, MapExplosion } from "@/registry/map";

const Explosion = () => {
  const control = useExplosionControl("my-explosion");

  return (
    <>
      <MapExplosion id="my-explosion" coordinates={[-74.006, 40.7128]} />
      <button onClick={control?.trigger}>Trigger Explosion</button>
      <button onClick={control?.reset}>Reset</button>
    </>
  );
};`

const useFireControlCode = `import { useFireControl, MapFire } from "@/registry/map";

const Fire = () => {
  const control = useFireControl("my-fire");

  return (
    <>
      <MapFire id="my-fire" coordinates={[-122.4194, 37.7749]} />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Extinguish" : "Ignite"}
      </button>
      <button onClick={() => control?.setIntensity(0.9)}>
        Max Intensity
      </button>
    </>
  );
};`

const useLightningControlCode = `import { useLightningControl, MapLightning } from "@/registry/map";

const Lightning = () => {
  const control = useLightningControl("my-lightning");

  return (
    <>
      <MapLightning id="my-lightning" coordinates={[-87.6298, 41.8781]} />
      <button onClick={control?.strike}>Strike!</button>
    </>
  );
};`

const useMeteorControlCode = `import { useMeteorControl, MapMeteor } from "@/registry/map";

const Meteor = () => {
  const control = useMeteorControl("my-meteor");

  return (
    <>
      <MapMeteor id="my-meteor" target={[37.6173, 55.7558]} />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Stop" : "Launch"} Meteor
      </button>
      <p>Phase: {control?.phase}</p>
      <p>Progress: {Math.round((control?.progress ?? 0) * 100)}%</p>
    </>
  );
};`

const useSandstormControlCode = `import { useSandstormControl, MapSandstorm } from "@/registry/map";

const Sandstorm = () => {
  const control = useSandstormControl("my-sandstorm");

  return (
    <>
      <MapSandstorm id="my-sandstorm" />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Stop" : "Start"} Sandstorm
      </button>
      <button onClick={() => control?.setIntensity(0.7)}>
        Increase Intensity
      </button>
    </>
  );
};`

const useSnowControlCode = `import { useSnowControl, MapSnow } from "@/registry/map";

const Snow = () => {
  const control = useSnowControl("my-snow");

  return (
    <>
      <MapSnow id="my-snow" />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Stop" : "Start"} Snow
      </button>
      <button onClick={() => control?.setIntensity(0.5)}>
        Light Snow
      </button>
    </>
  );
};`

const useSteamControlCode = `import { useSteamControl, MapSteam } from "@/registry/map";

const Steam = () => {
  const control = useSteamControl("my-steam");

  return (
    <>
      <MapSteam id="my-steam" coordinates={[-155.2833, 19.4069]} />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Stop" : "Start"} Steam
      </button>
      <button onClick={() => control?.setIntensity(0.6)}>
        Medium Steam
      </button>
    </>
  );
};`

const useTsunamiControlCode = `import { useTsunamiControl, MapTsunami } from "@/registry/map";

const Tsunami = () => {
  const control = useTsunamiControl("my-tsunami");

  return (
    <>
      <MapTsunami id="my-tsunami" origin={[142.3728, 38.3215]} target={[141.0, 37.0]} />
      <button onClick={control?.isActive ? control.stop : control?.start}>
        {control?.isActive ? "Stop" : "Start"} Tsunami
      </button>
      <p>Phase: {control?.phase}</p>
      <p>Progress: {Math.round((control?.progress ?? 0) * 100)}%</p>
    </>
  );
};`

const IdParameterTable = ({ description }: { description: string }) => {
  return (
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
              <DocsCode>id</DocsCode>
            </TableCell>
            <TableCell className="text-muted-foreground">string</TableCell>
            <TableCell className="text-muted-foreground">{description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

type ReturnValueRow = {
  name: string
  type: string
  description: string
}

const ReturnValuesTable = ({ rows }: { rows: ReturnValueRow[] }) => {
  return (
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
          {rows.map((row) => {
            return (
              <TableRow key={row.name}>
                <TableCell>
                  <DocsCode>{row.name}</DocsCode>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.type}</TableCell>
                <TableCell className="text-muted-foreground">{row.description}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const playbackReturnValues: ReturnValueRow[] = [
  { name: "start", type: "() => void", description: "Start the animation" },
  { name: "stop", type: "() => void", description: "Stop the animation" },
  { name: "toggle", type: "() => void", description: "Toggle animation state" },
  { name: "isPlaying", type: "boolean", description: "Current animation state" },
]

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
          {hooks.map((hook) => {
            return <HookCard key={hook.name} hook={hook} />
          })}
        </div>
      </DocsSection>

      <DocsSection title="useMap" id="usemap">
        <p>
          Access the Mapbox GL map instance and loading state. Must be used within a <DocsCode>Map</DocsCode> component.
        </p>
        <CodeBlock code={useMapCode} />
        <ReturnValuesTable
          rows={[
            { name: "map", type: "mapboxgl.Map | null", description: "The Mapbox GL map instance" },
            { name: "isLoaded", type: "boolean", description: "Whether the map has finished loading" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useRasterVideoControl" id="userastervidecontrol">
        <p>
          Control video layer playback. Pass the layer ID to control a specific <DocsCode>MapRasterVideo</DocsCode>{" "}
          component.
        </p>
        <CodeBlock code={useRasterVideoControlCode} />
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
        <ReturnValuesTable
          rows={[
            { name: "play", type: "() => void", description: "Start video playback" },
            { name: "pause", type: "() => void", description: "Pause video playback" },
            { name: "toggle", type: "() => void", description: "Toggle between play and pause" },
            { name: "isPlaying", type: "boolean", description: "Current playback state" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useLineAnimatedControl" id="uselineanimatedcontrol">
        <p>
          Control animated line playback state. Use with <DocsCode>MapLineAnimated</DocsCode> component.
        </p>
        <CodeBlock code={useLineAnimatedControlCode} />
        <ReturnValuesTable rows={playbackReturnValues} />
      </DocsSection>

      <DocsSection title="useMarkerAnimatedControl" id="usemarkeranimatedcontrol">
        <p>
          Control animated marker playback state. Use with <DocsCode>MapMarkerAnimated</DocsCode> component.
        </p>
        <CodeBlock code={useMarkerAnimatedControlCode} />
        <ReturnValuesTable rows={playbackReturnValues} />
      </DocsSection>

      <DocsSection title="useCameraFollowControl" id="usecamerafollowcontrol">
        <p>
          Control camera follow animation playback. Use with <DocsCode>MapCameraFollow</DocsCode> component.
        </p>
        <CodeBlock code={useCameraFollowControlCode} />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the camera animation" },
            { name: "stop", type: "() => void", description: "Stop the camera animation" },
            { name: "toggle", type: "() => void", description: "Toggle animation state" },
            { name: "isPlaying", type: "boolean", description: "Current animation state" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useArcAnimatedControl" id="usearcanimatedcontrol">
        <p>
          Control animated arc playback state. Use with <DocsCode>MapArcAnimated</DocsCode> component.
        </p>
        <CodeBlock code={useArcAnimatedControlCode} />
        <ReturnValuesTable rows={playbackReturnValues} />
      </DocsSection>

      <DocsSection title="useFootprintControl" id="usefootprintcontrol">
        <p>
          Control animated footprint start and reset. Returns <DocsCode>null</DocsCode> until the component with the
          matching ID mounts.
        </p>
        <CodeBlock code={useFootprintControlCode} />
        <IdParameterTable description="The ID of the footprint component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the footprint animation" },
            { name: "reset", type: "() => void", description: "Reset and hide all footprint steps" },
            { name: "isActive", type: "boolean", description: "Whether the animation is currently active" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useCycloneControl" id="usecyclonecontrol">
        <p>
          Control cyclone animation, intensity, scale, and rotation speed. Returns <DocsCode>null</DocsCode> until the
          component with the matching ID mounts.
        </p>
        <CodeBlock code={useCycloneControlCode} />
        <IdParameterTable description="The ID of the cyclone component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the cyclone animation" },
            { name: "stop", type: "() => void", description: "Stop the cyclone animation" },
            { name: "setIntensity", type: "(intensity: number) => void", description: "Set the cyclone intensity" },
            {
              name: "setScale",
              type: "(scale: number, instant?: boolean) => void",
              description: "Set the cyclone scale with optional instant transition",
            },
            {
              name: "setRotationSpeed",
              type: "(speed: number) => void",
              description: "Set the cyclone rotation speed (0-4)",
            },
            { name: "isActive", type: "boolean", description: "Whether the cyclone is animating" },
            { name: "isMoving", type: "boolean", description: "Whether the cyclone is moving along a path" },
            { name: "progress", type: "number", description: "Animation progress from 0 to 1" },
            { name: "scale", type: "number", description: "Current cyclone scale" },
            { name: "rotationSpeed", type: "number", description: "Current rotation speed" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useExplosionControl" id="useexplosioncontrol">
        <p>
          Trigger and reset explosion effects. Returns <DocsCode>null</DocsCode> until the component with the matching
          ID mounts.
        </p>
        <CodeBlock code={useExplosionControlCode} />
        <IdParameterTable description="The ID of the explosion component to control" />
        <ReturnValuesTable
          rows={[
            { name: "trigger", type: "() => void", description: "Trigger the explosion" },
            { name: "reset", type: "() => void", description: "Reset the explosion state" },
            { name: "isExploding", type: "boolean", description: "Whether the explosion is active" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useFireControl" id="usefirecontrol">
        <p>
          Control fire animation and intensity. Returns <DocsCode>null</DocsCode> until the component with the matching
          ID mounts.
        </p>
        <CodeBlock code={useFireControlCode} />
        <IdParameterTable description="The ID of the fire component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the fire animation" },
            { name: "stop", type: "() => void", description: "Stop the fire animation" },
            { name: "setIntensity", type: "(intensity: number) => void", description: "Set the fire intensity" },
            { name: "isActive", type: "boolean", description: "Whether the fire is burning" },
            { name: "spreadProgress", type: "number", description: "Fire spread progress from 0 to 1" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useLightningControl" id="uselightningcontrol">
        <p>
          Trigger lightning strike effects. Returns <DocsCode>null</DocsCode> until the component with the matching ID
          mounts.
        </p>
        <CodeBlock code={useLightningControlCode} />
        <IdParameterTable description="The ID of the lightning component to control" />
        <ReturnValuesTable
          rows={[
            { name: "strike", type: "() => void", description: "Trigger a lightning strike" },
            { name: "isActive", type: "boolean", description: "Whether a strike is in progress" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useMeteorControl" id="usemeteorcontrol">
        <p>
          Control meteor animation and track impact phases. Returns <DocsCode>null</DocsCode> until the component with
          the matching ID mounts.
        </p>
        <CodeBlock code={useMeteorControlCode} />
        <IdParameterTable description="The ID of the meteor component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the meteor animation" },
            { name: "stop", type: "() => void", description: "Stop the meteor animation" },
            { name: "reset", type: "() => void", description: "Reset the meteor to initial state" },
            { name: "isActive", type: "boolean", description: "Whether the meteor is animating" },
            { name: "progress", type: "number", description: "Animation progress from 0 to 1" },
            {
              name: "phase",
              type: '"falling" | "impact" | "fading" | "idle"',
              description: "Current meteor phase",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="useSandstormControl" id="usesandstormcontrol">
        <p>
          Control sandstorm animation and intensity. Returns <DocsCode>null</DocsCode> until the component with the
          matching ID mounts.
        </p>
        <CodeBlock code={useSandstormControlCode} />
        <IdParameterTable description="The ID of the sandstorm component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the sandstorm animation" },
            { name: "stop", type: "() => void", description: "Stop the sandstorm animation" },
            {
              name: "setIntensity",
              type: "(intensity: number) => void",
              description: "Set the sandstorm intensity",
            },
            { name: "isActive", type: "boolean", description: "Whether the sandstorm is active" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useSnowControl" id="usesnowcontrol">
        <p>
          Control snow animation and intensity. Returns <DocsCode>null</DocsCode> until the component with the matching
          ID mounts.
        </p>
        <CodeBlock code={useSnowControlCode} />
        <IdParameterTable description="The ID of the snow component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the snow animation" },
            { name: "stop", type: "() => void", description: "Stop the snow animation" },
            { name: "setIntensity", type: "(intensity: number) => void", description: "Set the snow intensity" },
            { name: "isActive", type: "boolean", description: "Whether the snow is falling" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useSteamControl" id="usesteamcontrol">
        <p>
          Control steam animation and intensity. Returns <DocsCode>null</DocsCode> until the component with the matching
          ID mounts.
        </p>
        <CodeBlock code={useSteamControlCode} />
        <IdParameterTable description="The ID of the steam component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the steam animation" },
            { name: "stop", type: "() => void", description: "Stop the steam animation" },
            { name: "setIntensity", type: "(intensity: number) => void", description: "Set the steam intensity" },
            { name: "isActive", type: "boolean", description: "Whether the steam is active" },
          ]}
        />
      </DocsSection>

      <DocsSection title="useTsunamiControl" id="usetsunamicontrol">
        <p>
          Control tsunami animation and track wave phases. Returns <DocsCode>null</DocsCode> until the component with
          the matching ID mounts.
        </p>
        <CodeBlock code={useTsunamiControlCode} />
        <IdParameterTable description="The ID of the tsunami component to control" />
        <ReturnValuesTable
          rows={[
            { name: "start", type: "() => void", description: "Start the tsunami animation" },
            { name: "stop", type: "() => void", description: "Stop the tsunami animation" },
            { name: "reset", type: "() => void", description: "Reset the tsunami to initial state" },
            { name: "isActive", type: "boolean", description: "Whether the tsunami is animating" },
            { name: "progress", type: "number", description: "Animation progress from 0 to 1" },
            {
              name: "phase",
              type: '"approaching" | "crashing" | "receding" | "idle"',
              description: "Current tsunami phase",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  )
}
