import { DocsLayout, DocsSection, NewBadge } from "../_components/docs"
import { Metadata } from "next"
import Link from "next/link"
import {
  Map,
  Settings,
  MapPin,
  MessageSquare,
  Route,
  Play,
  Layers,
  ArrowLeftRight,
  CloudRain,
  Video,
  Image,
  Map as MapIcon,
  Sparkles,
  EyeOff,
  Share2,
  Pentagon,
  Circle,
  Link2,
  Crosshair,
  Compass,
  Radar,
  Stamp,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all available map components",
}

type ComponentItem = {
  title: string
  href: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: "core" | "features"
  status?: "available" | "coming-soon"
  installCommand?: string
  isNew?: boolean
  mapboxOnly?: boolean
}

const components: ComponentItem[] = [
  {
    title: "Map",
    href: "/docs/basic-map",
    description: "Core map component with Mapbox GL and MapLibre GL support",
    icon: Map,
    category: "core",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map.json",
  },
  {
    title: "Controls",
    href: "/docs/controls",
    description: "Navigation, zoom, fullscreen, and custom map controls",
    icon: Settings,
    category: "core",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-controls.json",
  },
  {
    title: "Compass",
    href: "/docs/compass",
    description: "Interactive compass with drag-to-rotate functionality",
    icon: Compass,
    category: "core",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-compass.json",
    isNew: true,
  },
  {
    title: "Marker",
    href: "/docs/markers",
    description: "Customizable markers with popups and interactive content",
    icon: MapPin,
    category: "core",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-marker.json",
  },
  {
    title: "Popup",
    href: "/docs/popups",
    description: "Info popups and tooltips for map annotations",
    icon: MessageSquare,
    category: "core",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-popup.json",
  },
  {
    title: "MiniMap",
    href: "/docs/minimap",
    description: "Overview map showing current viewport context",
    icon: MapIcon,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/mini-map.json",
  },
  {
    title: "Lines",
    href: "/docs/lines",
    description: "Draw static lines and paths for routes and directions",
    icon: Route,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-line.json",
  },
  {
    title: "Polygon",
    href: "/docs/polygon",
    description: "Draw filled polygons with customizable fill and stroke",
    icon: Pentagon,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-polygon.json",
  },
  {
    title: "Circle",
    href: "/docs/circle",
    description: "Draggable geographic circles with center point and radius",
    icon: Circle,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-circle.json",
    isNew: true,
  },
  {
    title: "Animated Circle",
    href: "/docs/animated-circle",
    description: "Animated circles with drawing and fill effects",
    icon: Circle,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-animated-circle.json",
    isNew: true,
  },
  {
    title: "Animated Lines",
    href: "/docs/lines-animated",
    description: "Animated path visualization with customizable timing",
    icon: Play,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-line-animated.json",
  },
  {
    title: "Animated Radial Lines",
    href: "/docs/lines-radial",
    description: "Animated curved lines spreading from origin to multiple destinations",
    icon: Share2,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-line-radial.json",
  },
  {
    title: "Animated Arc",
    href: "/docs/arc-animated",
    description: "Animated curved arc between two points for flights and connections",
    icon: Route,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-arc-animated.json",
  },
  {
    title: "Camera Follow",
    href: "/docs/camera-follow",
    description: "Animate camera along a path for immersive fly-through experiences",
    icon: Play,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-camera-follow.json",
    isNew: true,
  },
  {
    title: "Animated Markers",
    href: "/docs/markers-animated",
    description: "Animate markers along paths for real-time tracking",
    icon: Play,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-marker-animated.json",
  },
  {
    title: "Circle Clusters",
    href: "/docs/circle-clusters",
    description: "Marker clustering for large datasets",
    icon: Layers,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-marker-cluster.json",
  },
  {
    title: "Choropleth",
    href: "/docs/choropleth",
    description: "Color geographic regions based on data values",
    icon: MapIcon,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-choropleth.json",
    isNew: true,
  },
  {
    title: "Compare",
    href: "/docs/compare",
    description: "Side-by-side map comparison with slider",
    icon: ArrowLeftRight,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-compare.json",
  },
  {
    title: "Sync",
    href: "/docs/sync",
    description: "Synchronized multi-map with bidirectional movement sync",
    icon: Link2,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-sync.json",
    isNew: true,
  },
  {
    title: "Image",
    href: "/docs/image",
    description: "Overlay images on specific map coordinates",
    icon: Image,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-image.json",
  },
  {
    title: "Video",
    href: "/docs/raster-video",
    description: "Overlay video content on map coordinates",
    icon: Video,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-raster-video.json",
  },
  {
    title: "Rain Effect",
    href: "/docs/rain",
    description: "Weather overlay with rain animation effects",
    icon: CloudRain,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-rain.json",
    mapboxOnly: true,
  },
  {
    title: "Animated Pulse",
    href: "/docs/animated-pulse",
    description: "Pulsing dot animations for highlighting markers",
    icon: Sparkles,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-animated-pulse.json",
  },
  {
    title: "Animated Polygon",
    href: "/docs/animated-polygon",
    description: "Animated polygons with outline drawing and fill effects",
    icon: Layers,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-animated-polygon.json",
  },
  {
    title: "Blur Area",
    href: "/docs/blur-area",
    description: "Blur effect overlay for obscuring map areas",
    icon: EyeOff,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-blur-area.json",
  },
  {
    title: "Targeting Reticle",
    href: "/docs/targeting-reticle",
    description: "Animated targeting reticle with tracking and lock-on effects",
    icon: Crosshair,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-targeting-reticle.json",
    isNew: true,
  },
  {
    title: "Radar",
    href: "/docs/radar",
    description: "Animated radar sweep signal with concentric rings and crosshairs",
    icon: Radar,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-radar.json",
    isNew: true,
  },
  {
    title: "Watermark",
    href: "/docs/watermark",
    description: "Text watermark overlay with configurable position and styling",
    icon: Stamp,
    category: "features",
    installCommand: "npx shadcn@latest add https://terrae.vercel.app/maps/map-watermark.json",
    isNew: true,
  },
]

type ComponentCardProps = {
  component: ComponentItem
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  const isComingSoon = component.status === "coming-soon"

  const cardContent = (
    <>
      {component.isNew && (
        <span className="absolute top-3 right-3">
          <NewBadge />
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
          <component.icon className="size-5 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {component.title}
            </h3>
            {isComingSoon && (
              <span className="whitespace-nowrap text-xs px-2 py-1 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {component.description}
            {component.mapboxOnly && (
              <span className="ml-2 inline-flex items-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                Mapbox only
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  )

  if (isComingSoon) {
    return (
      <div
        className={cn(
          "group relative flex flex-col gap-3 rounded-3xl border border-border/50 bg-card p-6",
          "opacity-60 cursor-not-allowed"
        )}
      >
        {cardContent}
      </div>
    )
  }

  return (
    <Link
      href={component.href}
      className={cn(
        "group relative flex flex-col gap-3 rounded-3xl border border-border/50 bg-card p-6",
        "hover:border-border hover:shadow-md transition-all duration-200",
        "hover:bg-accent/5"
      )}
    >
      {cardContent}
    </Link>
  )
}

const ComponentsPage = () => {
  const coreComponents = components.filter((c) => {
    return c.category === "core"
  })
  const featureComponents = components.filter((c) => {
    return c.category === "features"
  })

  return (
    <DocsLayout
      title="Components"
      description="A comprehensive collection of map components for building interactive experiences."
      prev={{ title: "Comparison", href: "/docs/comparison" }}
      next={{ title: "Hooks", href: "/docs/hooks" }}
    >
      <DocsSection title="Core Components">
        <p className="text-muted-foreground mb-6">
          Essential components for building interactive maps. These form the foundation of your map applications.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {coreComponents.map((component) => (
            <ComponentCard key={component.href} component={component} />
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Feature Components">
        <p className="text-muted-foreground mb-6">
          Advanced components for routes, animations, effects, data clustering, and specialized layers.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {featureComponents.map((component) => (
            <ComponentCard key={component.href} component={component} />
          ))}
        </div>
      </DocsSection>
    </DocsLayout>
  )
}

export default ComponentsPage
