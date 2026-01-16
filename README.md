<div align="center">
  <h1>Terrae</h1>
  <p><strong>Map library for Design Engineers</strong></p>

  <p>
    Beautiful map components built with <a href="https://react.dev">React</a>, <a href="https://www.typescriptlang.org">TypeScript</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, and <a href="https://www.mapbox.com/">Mapbox GL JS</a>. Perfect companion for <a href="https://ui.shadcn.com">shadcn/ui</a>. Pronounced <strong>"TER-ray"</strong>.
  </p>
</div>

---

## The Story

Working with interactive maps has been a challenge since my first experience with [Leaflet](https://leafletjs.com/) and [Vue.js](https://vuejs.org/) back in 2018. The [imperative nature](https://docs.mapbox.com/mapbox-gl-js/guides/install/) of most map libraries, lack of community resources, and difficulty in building complex, declarative components made it frustrating. Years later, while working at Credium, I faced similar frustrations with Next.js. I was looking for a solution that would work seamlessly with modern tooling like [shadcn/ui](https://github.com/shadcn-ui/ui), provide a declarative pattern instead of imperative code, and reduce the complexity of implementing interactive maps. Unfortunately, I couldn't find anything that met all these requirements.

My initial idea was to build on top of [Google Maps](https://maps.google.com), but I quickly realized it was too challenging and not opinionated enough for the kind of composable, declarative components I wanted to create. [Mapbox GL JS](https://www.mapbox.com/) proved to be the perfect fit—it's flexible, powerful, and has the right level of opinion to build beautiful, composable components on top of it.

Existing Mapbox implementations in React felt clunky and required too much boilerplate. So I built Terrae—a collection of beautiful, composable map components that embrace declarative patterns, focus on the interactive parts of maps, and work seamlessly with React and shadcn/ui.

## Inspiration

This project is inspired by [MapCN](https://mapcn.vercel.app/), a project by [Anmol Saini](https://github.com/AnmolSaini16). Building on these foundations, I created Terrae to bring declarative map components to React with a focus on simplicity and composability.

---

## Installation

### 1. Get a Mapbox Access Token

Get your access token from [Mapbox Account](https://account.mapbox.com/access-tokens/). Create a new token with default public scopes.

### 2. Install Dependencies

```bash
npm install mapbox-gl next-themes
npm install --save-dev @types/mapbox-gl
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and add your token:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual access token:

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
```

### 4. Install Components

Just like shadcn/ui, you can install components using the CLI:

#### Method 1: Direct URL (Recommended)

```bash
# Install any component directly
npx shadcn@latest add https://terrae.vercel.app/maps/map.json
npx shadcn@latest add https://terrae.vercel.app/maps/map-marker.json
npx shadcn@latest add https://terrae.vercel.app/maps/map-line.json
```

Dependencies are automatically resolved!

#### Method 2: Using Namespace (Optional)

Add Terrae registry to your `components.json`:

```json
{
  "registries": {
    "@terrae": "https://terrae.vercel.app/maps/{name}.json"
  }
}
```

Then install with cleaner syntax:

```bash
npx shadcn@latest add @terrae/map
npx shadcn@latest add @terrae/map-marker @terrae/map-line
```

#### Available Components

- `map` - Core map component
- `map-marker` - Customizable markers
- `map-marker-animated` - Animated markers
- `map-marker-cluster` - Marker clustering
- `map-line` - Lines and routes
- `map-polygon` - Polygon overlays  
- `map-popup` - Popups and tooltips
- `map-tooltip` - Simple tooltips
- `map-controls` - Map controls
- `map-heatmap` - Heatmap visualization
- `map-3d-building` - 3D buildings
- `mini-map` - Mini map overview
- `map-compare` - Side-by-side comparison
- `draw-control` - Drawing tools

## Quick Start

### Basic Map

```tsx
import { Map } from "@/components/ui/map/map";

export const BasicMap = () => {
  return (
    <div className="h-[600px] w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-122.4194, 37.7749]}
        zoom={12}
      />
    </div>
  );
};
```

### Map with Markers

```tsx
import { Map } from "@/components/ui/map/map";
import { MapMarker } from "@/components/ui/map/marker";
import { MapPin } from "lucide-react";

export const MapWithMarkers = () => {
  return (
    <div className="h-[600px] w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-122.4194, 37.7749]}
        zoom={12}
      >
        <MapMarker coordinates={[-122.4194, 37.7749]}>
          <div className="flex items-center gap-2 bg-card text-card-foreground px-3 py-2 rounded-lg shadow-lg border">
            <MapPin className="h-4 w-4" />
            <span>San Francisco</span>
          </div>
        </MapMarker>
      </Map>
    </div>
  );
};
```

### Marker Clustering

```tsx
import { Map } from "@/components/ui/map/map";
import { MapCircleCluster } from "@/components/ui/map/circle-cluster";

export const ClusteredMap = () => {
  const data: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.4194, 37.7749] },
        properties: { title: "San Francisco" },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-118.2437, 34.0522] },
        properties: { title: "Los Angeles" },
      },
    ],
  };

  return (
    <div className="h-[600px] w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-118.5, 36]}
        zoom={5}
      >
        <MapCircleCluster data={data} />
      </Map>
    </div>
  );
};
```

### Dark Mode Support

The Map component automatically adapts to your theme:

```tsx
import { useTheme } from "next-themes";
import { Map } from "@/components/ui/map/map";

export const DarkModeMap = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Map
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      center={[-122.4194, 37.7749]}
      zoom={12}
      style={
        resolvedTheme === "dark"
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11"
      }
    />
  );
};
```

Create custom map styles in [Mapbox Studio](https://studio.mapbox.com/).

## Available Components

Choose only the components you need and install them individually. Each component is lightweight and has its own dependencies.

### Core Component

| Component | Installation | Description |
|-----------|--------------|-------------|
| `map` | `npx shadcn@latest add https://terrae.vercel.app/registry map` | Core Map component with theme support |

### Interactive Components

| Component | Installation | Description |
|-----------|--------------|-------------|
| `map-marker` | `npx shadcn@latest add https://terrae.vercel.app/registry map-marker` | Customizable markers |
| `map-popup` | `npx shadcn@latest add https://terrae.vercel.app/registry map-popup` | Info popups and tooltips |
| `map-controls` | `npx shadcn@latest add https://terrae.vercel.app/registry map-controls` | Map controls (zoom, fullscreen, etc) |

### Visualization Components

| Component | Installation | Description |
|-----------|--------------|-------------|
| `map-line` | `npx shadcn@latest add https://terrae.vercel.app/registry map-line` | Static routes and paths |
| `map-line-animated` | `npx shadcn@latest add https://terrae.vercel.app/registry map-line-animated` | Animated path/route animation |
| `map-circle-cluster` | `npx shadcn@latest add https://terrae.vercel.app/registry map-circle-cluster` | Marker clustering |
| `map-animated-pulse` | `npx shadcn@latest add https://terrae.vercel.app/registry map-animated-pulse` | Pulsing dot animation for markers |

### Feature Components

| Component | Installation | Description |
|-----------|--------------|-------------|
| `map-mini-map` | `npx shadcn@latest add https://terrae.vercel.app/registry map-mini-map` | Minimap overview navigation |
| `map-compare` | `npx shadcn@latest add https://terrae.vercel.app/registry map-compare` | Side-by-side map comparison |
| `map-image` | `npx shadcn@latest add https://terrae.vercel.app/registry map-image` | Image overlay layers |
| `map-raster-video` | `npx shadcn@latest add https://terrae.vercel.app/registry map-raster-video` | Video overlay layers |
| `map-rain` | `npx shadcn@latest add https://terrae.vercel.app/registry map-rain` | Rain effect layer |

## Mapbox Terms

This project uses Mapbox GL JS. Please review the [Mapbox Terms of Service](https://www.mapbox.com/legal/tos) for usage guidelines and pricing information.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
