import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { UpcomingAnimation } from "@/components/upcoming-animation"

export const metadata: Metadata = {
  title: "Changelog",
  description: "Follow along with Terrae's development journey. New features, improvements, and fixes.",
}

type ChangelogFeature = {
  component?: string
  title: string
  description: React.ReactNode
  href?: string
}

type ChangelogEntry = {
  date?: string
  upcoming?: boolean
  components?: ChangelogFeature[]
  properties?: ChangelogFeature[]
  fixes?: ChangelogFeature[]
}

type AnnouncementEntry = {
  title: string
  date: string
  announcement: true
}

type Changelog = ChangelogEntry | AnnouncementEntry

type FeatureSectionProps = {
  title: string
  items: ChangelogFeature[]
  color: "purple" | "blue" | "green"
}

const BORDER_COLORS = {
  purple: "border-purple-500/50",
  blue: "border-blue-500/50",
  green: "border-green-500/50",
} as const

const FeatureSection = ({ title, items, color }: FeatureSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className={`border-l-2 ${BORDER_COLORS[color]} pl-4 space-y-2`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                {item.component && (
                  <span className="relative w-fit">
                    <span className="absolute inset-0 rounded bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
                    <span className="relative text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-background rounded px-1.5 py-0.5 block m-px">
                      {item.component}
                    </span>
                  </span>
                )}
                <h4 className="font-semibold text-foreground">{item.title}</h4>
              </div>
              {item.href && (
                <Link
                  href={item.href}
                  className="text-xs font-medium bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 flex items-center gap-1 shrink-0 transition-opacity"
                >
                  View docs
                  <ArrowRight className="size-3 text-purple-500" />
                </Link>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const changelogs: Changelog[] = [
  {
    upcoming: true,
  },
  {
    date: "February 1, 2026",
    components: [
      {
        title: "Camera Follow",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapCameraFollow</code> component for immersive
            fly-through experiences. Animates the camera along a path with automatic bearing adjustment. Supports
            pause/resume, looping, navigation marker, and custom duration.
          </>
        ),
        href: "/docs/camera-follow",
      },
      {
        title: "Targeting Reticle",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapTargetingReticle</code> component for
            military-style targeting brackets with tracking and lock-on capabilities. Supports smooth tracking
            animation, customizable colors for locked/unlocked states, optional crosshair, and GPS coordinates display.
          </>
        ),
        href: "/docs/targeting-reticle",
      },
    ],
  },
  {
    date: "January 25, 2026",
    components: [
      {
        title: "Blur Area",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapBlurArea</code> component to blur specific
            areas on the map. Supports multiple areas, custom blur intensity, rounded corners, and interaction blocking
            for premium content or unexplored areas.
          </>
        ),
        href: "/docs/blur-area",
      },
      {
        title: "Polygon",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapPolygon</code> component for drawing static
            filled polygons on the map. Supports customizable fill color, stroke color, opacity, and dashed strokes.
          </>
        ),
        href: "/docs/polygon",
      },
      {
        title: "Animated Polygon",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapAnimatedPolygon</code> component for drawing
            animated polygons with outline and fill effects. Supports three animation modes:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">draw</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">fill</code>, and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">draw-then-fill</code>.
          </>
        ),
        href: "/docs/animated-polygon",
      },
      {
        title: "Animated Radial Lines",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapLineRadial</code> component for animated
            curved lines spreading from a central origin to multiple destinations. Supports custom markers, traveling
            markers, staggered animations, and auto-curvature based on distance.
          </>
        ),
        href: "/docs/lines-radial",
      },
      {
        title: "Animated Arc",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapArcAnimated</code> component for animated
            curved arc lines between two points. Supports customizable arc height, traveling markers, origin/destination
            markers, dash patterns, and loop animations.
          </>
        ),
        href: "/docs/arc-animated",
      },
    ],
    properties: [
      {
        component: "Map",
        title: "autoRotate",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">autoRotate</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">rotateSpeed</code> props for automatic globe
            rotation. Only works with <code className="rounded bg-muted px-1 py-0.5 text-xs">projection="globe"</code>.
          </>
        ),
        href: "/docs/basic-map#auto-rotate",
      },
      {
        component: "Map",
        title: "showLoader",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">showLoader</code> prop for external loader
            control. Also includes a new animated globe as the default loader.
          </>
        ),
        href: "/docs/basic-map#custom-loader",
      },
      {
        component: "Map",
        title: "projection",
        description: (
          <>
            The <code className="rounded bg-muted px-1 py-0.5 text-xs">projection</code> prop is now reactive. Switch
            between all 8 Mapbox projections dynamically at runtime.
          </>
        ),
        href: "/docs/basic-map#projection",
      },
      {
        component: "Map",
        title: "Style Presets",
        description: (
          <>
            Built-in style presets that automatically adapt to your theme. Includes{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">standardMapStyles</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">streetsMapStyles</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">outdoorsMapStyles</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">satelliteMapStyles</code>, and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">navigationMapStyles</code>.
          </>
        ),
        href: "/docs/basic-map#style-presets",
      },
      {
        component: "Mini Map",
        title: "draggable",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">draggable</code> prop lets users reposition the
            minimap anywhere within the map container.
          </>
        ),
        href: "/docs/minimap#draggable",
      },
      {
        component: "Mini Map",
        title: "rounded",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">rounded</code> prop for custom border radius. Set
            to a number or <code className="rounded bg-muted px-1 py-0.5 text-xs">"full"</code> for a circular minimap.
          </>
        ),
        href: "/docs/minimap#rounded",
      },
      {
        component: "Mini Map",
        title: "styles",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">styles</code> prop for theme-aware map styles.
            Minimap now automatically switches between light and dark styles based on your theme.
          </>
        ),
        href: "/docs/minimap",
      },
      {
        component: "Map Compare",
        title: "orientation",
        description: (
          <>
            New <code className="rounded bg-muted px-1 py-0.5 text-xs">orientation</code> prop for horizontal or
            vertical layouts, and <code className="rounded bg-muted px-1 py-0.5 text-xs">showLabels</code> to display
            Before/After labels.
          </>
        ),
        href: "/docs/compare#vertical-orientation",
      },
    ],
    fixes: [
      {
        component: "Animated Lines",
        title: "Theme Switching",
        description: (
          <>
            Fixed animation breaking when switching themes. The component now properly re-adds sources and restarts
            animation after theme changes.
          </>
        ),
      },
    ],
  },
  {
    title: "Hello, Terrae!",
    date: "January 18, 2026",
    announcement: true,
  },
]

export default function ChangelogPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Changelog</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          Welcome to the Terrae Changelog. Here you'll find detailed updates on new features, improvements, and fixes
          shipped with each release.
        </p>
      </div>

      <div className="space-y-12">
        {changelogs.map((changelog, index) => {
          if ("announcement" in changelog) {
            return (
              <div
                key={index}
                className="rounded-3xl bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 p-12 text-center space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-5xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {changelog.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">{changelog.date}</p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6 text-foreground/90">
                  <p className="text-lg leading-relaxed">
                    I'm excited to introduce Terrae—a modern, declarative map library built for design engineers who
                    want beautiful, interactive maps without the complexity. Built with React, TypeScript, shadcn/ui,
                    and Mapbox GL JS.
                  </p>
                  <div className="text-left space-y-4 pt-4">
                    <h3 className="text-xl font-semibold">What's included in the initial release:</h3>
                    <ul className="space-y-2 text-base list-disc list-inside">
                      <li>Core map component with theme support</li>
                      <li>Markers with customizable content and avatars</li>
                      <li>Popups and tooltips</li>
                      <li>Navigation controls (zoom, rotation, fullscreen)</li>
                      <li>MiniMap for context overview</li>
                      <li>Lines and animated route paths with dashed line support</li>
                      <li>Animated markers with path following</li>
                      <li>Animated pulse effects</li>
                      <li>Circle clusters for data visualization</li>
                      <li>Side-by-side map comparison</li>
                      <li>Image and video overlays</li>
                      <li>Rain weather effects</li>
                    </ul>
                  </div>
                  <p className="text-base text-muted-foreground pt-4">
                    This is just the beginning. More components, features, and improvements are coming in future
                    releases. Thank you for being part of this journey!
                  </p>
                </div>
              </div>
            )
          }

          const entry = changelog as ChangelogEntry

          if (entry.upcoming) {
            return (
              <div
                key={index}
                className="rounded-3xl border border-dashed border-border/50 p-8 sm:p-12 overflow-hidden"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <h2 className="text-3xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Coming Soon
                  </h2>
                  <UpcomingAnimation />
                </div>
              </div>
            )
          }

          const hasComponents = entry.components && entry.components.length > 0
          const hasProperties = entry.properties && entry.properties.length > 0
          const hasFixes = entry.fixes && entry.fixes.length > 0

          return (
            <div key={index} className="rounded-3xl border border-border/50 p-8 sm:p-12 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">{entry.date}</h2>
                <div className="h-px bg-border/50 max-w-xs mx-auto" />
              </div>

              <div className="space-y-8">
                {hasComponents && <FeatureSection title="New Components" items={entry.components!} color="purple" />}
                {hasProperties && <FeatureSection title="New Properties" items={entry.properties!} color="blue" />}
                {hasFixes && <FeatureSection title="Fixes" items={entry.fixes!} color="green" />}
              </div>

              <div className="flex justify-center pt-4">
                <a
                  href="https://github.com/alamenai/terrae/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-foreground/80 border border-border/50 rounded-full px-3 py-1.5 transition-colors"
                >
                  Share your feedback
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-16 p-8 rounded-3xl border border-dashed bg-muted/20 text-center space-y-3">
        <h3 className="text-xl font-semibold">Want to shape the future of Terrae?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your feedback and ideas help guide development priorities. Share your suggestions, feature requests, or use
          cases on{" "}
          <a
            href="https://github.com/alamenai/terrae/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </>
  )
}
