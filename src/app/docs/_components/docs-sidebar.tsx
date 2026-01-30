"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Code,
  Braces,
  MapPin,
  MessageSquare,
  Route,
  Settings,
  Layers,
  ArrowLeftRight,
  CloudRain,
  Globe,
  Video,
  Image,
  Flame,
  Play,
  Scale,
  Sparkles,
  BookMarked,
  Map as MapIcon,
  Anchor,
  EyeOff,
  Share2,
  Pentagon,
  Circle,
  Link2,
  Crosshair,
  Compass,
  Radar,
  type LucideIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NewBadge, UpdatedBadge, type BadgeVariant } from "./docs"

type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: BadgeVariant
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const navigation: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { title: "Story", href: "/docs/story", icon: BookMarked },
      { title: "Changelog", href: "/docs/changelog", icon: Sparkles },
    ],
  },
  {
    title: "Get Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Installation", href: "/docs/installation", icon: Code },
      { title: "Comparison", href: "/docs/comparison", icon: Scale },
      { title: "Components", href: "/docs/components", icon: Layers },
      { title: "Hooks", href: "/docs/hooks", icon: Anchor },
      { title: "Reference", href: "/docs/api-reference", icon: Braces },
    ],
  },
  {
    title: "Core",
    items: [
      { title: "Map", href: "/docs/basic-map", icon: Globe },
      { title: "Controls", href: "/docs/controls", icon: Settings },
      { title: "Compass", href: "/docs/compass", icon: Compass, badge: "new" },
      { title: "Marker", href: "/docs/markers", icon: MapPin, badge: "updated" },
      { title: "Popup", href: "/docs/popups", icon: MessageSquare },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Blur Area", href: "/docs/blur-area", icon: EyeOff },
      { title: "Targeting Reticle", href: "/docs/targeting-reticle", icon: Crosshair },
      { title: "Radar", href: "/docs/radar", icon: Radar, badge: "new" },
      { title: "MiniMap", href: "/docs/minimap", icon: MapIcon },
      { title: "Lines", href: "/docs/lines", icon: Route },
      { title: "Polygon", href: "/docs/polygon", icon: Pentagon },
      { title: "Circle", href: "/docs/circle", icon: Circle, badge: "new" },
      { title: "Animated Circle", href: "/docs/animated-circle", icon: Circle, badge: "new" },
      { title: "Animated Lines", href: "/docs/lines-animated", icon: Play, badge: "updated" },
      { title: "Animated Radial Lines", href: "/docs/lines-radial", icon: Share2 },
      { title: "Animated Arc", href: "/docs/arc-animated", icon: Route, badge: "updated" },
      { title: "Camera Follow", href: "/docs/camera-follow", icon: Play, badge: "new" },
      { title: "Animated Markers", href: "/docs/markers-animated", icon: Play },
      { title: "Circle Clusters", href: "/docs/circle-clusters", icon: Layers },
      { title: "Choropleth", href: "/docs/choropleth", icon: MapIcon, badge: "new" },
      { title: "Animated Pulse", href: "/docs/animated-pulse", icon: Sparkles },
      { title: "Animated Polygon", href: "/docs/animated-polygon", icon: Layers },
      { title: "Compare", href: "/docs/compare", icon: ArrowLeftRight },
      { title: "Sync", href: "/docs/sync", icon: Link2, badge: "new" },
      { title: "Image", href: "/docs/image", icon: Image },
      { title: "Video", href: "/docs/raster-video", icon: Video },
      { title: "Rain Effect", href: "/docs/rain", icon: CloudRain },
      { title: "Heatmaps", href: "/docs/heatmaps", icon: Flame },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar className="border-r border-t-0 bg-transparent **:data-[sidebar=sidebar]:bg-transparent sticky top-[64px] h-[calc(100vh-64px)] self-start">
      <SidebarHeader className="border-b lg:hidden">
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Globe className="size-5" />
            <span className="font-semibold tracking-tight">terrae</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-6">
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="text-muted-foreground hover:text-foreground data-[active=true]:bg-muted/50"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpenMobile(false)}
                        className="group flex items-center gap-2"
                      >
                        <item.icon className="size-4 group-data-[active=true]:text-purple-500" />
                        <span className="line-clamp-1 group-data-[active=true]:font-semibold group-data-[active=true]:text-transparent group-data-[active=true]:bg-gradient-to-r group-data-[active=true]:from-blue-500 group-data-[active=true]:via-purple-500 group-data-[active=true]:to-pink-500 group-data-[active=true]:bg-clip-text">
                          {item.title}
                        </span>
                        {item.badge === "new" && <NewBadge />}
                        {item.badge === "updated" && <UpdatedBadge />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

export function MobileSidebarTrigger() {
  return (
    <div className="md:hidden">
      <SidebarTrigger />
    </div>
  )
}
