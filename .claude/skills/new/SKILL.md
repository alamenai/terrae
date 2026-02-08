---
name: new
description: End-to-end workflow for building a new Terrae component from scratch
argument-hint: [component-name]
---

# Create New Component Skill

End-to-end workflow for building a new Terrae component from scratch.

Covers all 8 outputs:

- Component source
- Registry
- Exports
- Documentation
- Examples
- Sidebar
- Components page
- Changelog

Component structure, patterns, responsiveness, and performance rules are in `.claude/rules/react/component.md`.

## All Outputs

| #   | Output                | File(s)                                                |
| --- | --------------------- | ------------------------------------------------------ |
| 1   | Component source file | `src/registry/map/{name}.tsx`                          |
| 2   | Barrel export         | `src/registry/map/index.tsx` (update)                  |
| 3   | Registry entry        | `registry.json` (update)                               |
| 4   | Example file(s)       | `src/app/docs/_components/examples/{name}-example.tsx` |
| 5   | Documentation page    | `src/app/docs/{slug}/page.tsx`                         |
| 6   | Sidebar navigation    | `src/app/docs/_components/docs-sidebar.tsx` (update)   |
| 7   | Components listing    | `src/app/docs/components/page.tsx` (update)            |
| 8   | Changelog entry       | `src/app/docs/changelog/page.tsx` (update)             |

## Instructions

When the developer requests a new component:

### Step 1: Gather Requirements

Ask for:

- Component name (e.g., `MapHeatmap`, `MapPolygon`)
- Core functionality
- Whether it needs compound components (like `MarkerContent`, `MarkerPopup`)
- Category: `"core"` or `"features"` (most components are features)
- Lucide icon for the sidebar and components page
- Whether it exposes a control hook (e.g., `useHeatmapControl`)

If there are multiple valid implementation approaches (e.g., Mapbox layers vs DOM overlay, canvas vs CSS animations, GeoJSON source vs custom rendering), present the options with trade-offs and let the developer choose before writing code.

### Step 2: Create the Component File and Export

Follow the map component rules in `.claude/rules/react/component.md` for the component structure, template, patterns, and barrel export.

- Location: `src/registry/map/{component-name}.tsx`
- Use kebab-case for file names (e.g., `heat-map.tsx`)
- Export from `src/registry/map/index.tsx`

### Step 3: Add Registry Entry

Update `registry.json` by adding an entry to the `items` array.

Follow this structure:

```json
{
  "name": "heat-map",
  "type": "registry:ui",
  "title": "Map Heatmap",
  "description": "Short description of the component.",
  "dependencies": ["mapbox-gl"],
  "devDependencies": ["@types/mapbox-gl"],
  "registryDependencies": ["https://www.terrae.dev/map.json"],
  "files": [
    {
      "path": "src/registry/map/heat-map.tsx",
      "type": "registry:ui",
      "target": "components/ui/map/heat-map.tsx"
    }
  ]
}
```

##### Key rules:

- `name` uses kebab-case with ``prefix (e.g.,`heat-map`)
- `registryDependencies` always includes `["https://www.terrae.dev/map.json"]` (the core `Map` component that all other components depend on)
- Add extra `dependencies` only if the component needs packages beyond `mapbox-gl`
- Components that don't need `mapbox-gl` directly can have empty `dependencies` (e.g., watermark)

### Step 4: Create Example File(s)

Location: `src/app/docs/_components/examples/{name}-example.tsx`

Use kebab-case for the file name.

The basic example should demonstrate the simplest usage of the component.

```typescript
import { Map, MapHeatmap } from "@/registry/map"

export const HeatmapExample = () => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-74.006, 40.7128]} zoom={10}>
        <MapHeatmap id="heatmap-basic" {/* ...minimal props */} />
      </Map>
    </div>
  )
}
```

##### Key rules:

- Only add `"use client"` if the example uses hooks, event handlers, or browser APIs — purely compositional examples that just render map components don't need it
- Import from `@/registry/map`
- Wrap the map in a `<div className="h-full w-full">`
- Pass `process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""` as the access token — the `Map` component validates it and shows an error if missing, so examples don't need their own check
- Export the component with a descriptive name (PascalCase)
- Create additional example files for each variation (e.g., `heatmap-color-example.tsx`, `heatmap-custom-example.tsx`)

### Step 5: Create Documentation Page

Location: `src/app/docs/{slug}/page.tsx`

Use the `lines-animated/page.tsx` as the gold standard reference.

The slug should match the sidebar href (e.g., `/docs/heatmap` → `src/app/docs/heatmap/page.tsx`).

```typescript
import { DocsLayout, DocsSection, DocsCode, DocsLink } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { HeatmapExample } from "../_components/examples/heatmap-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Heatmap",
}

const HeatmapPage = () => {
  const basicSource = getExampleSource("heatmap-example.tsx")

  return (
    <DocsLayout
      title="Heatmap"
      description="Short description of what the component does."
      prev={{ title: "Previous Component", href: "/docs/previous" }}
      next={{ title: "Next Component", href: "/docs/next" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the heatmap component:</p>
        <CodeBlock
          code={`npx shadcn@latest add https://www.terrae.dev/heat-map.json`}
          language="bash"
        />
      </DocsSection>

      <ComponentPreview code={basicSource}>
        <HeatmapExample />
      </ComponentPreview>

      {/* Additional sections with examples, props tables, etc. */}
    </DocsLayout>
  )
}

export default HeatmapPage
```

##### Key rules:

- Always export `metadata` with a `title`
- Use `DocsLayout` with `title`, `description`, `prev`, and `next` navigation links
- First section is always "Installation" with two `CodeBlock`s (base map + component)
- The basic `ComponentPreview` goes directly after Installation (no section title or description, just the demo)
- Use `ComponentPreview` to wrap each example with its source code
- Use `getExampleSource("filename.tsx")` to load example source code
- Use `DocsCode` for inline code references in descriptions
- Use `DocsSection` with a `title` for each section
- Add a props `Table` when the component has many configurable props
- Set `prev`/`next` to match adjacent items in the sidebar navigation

### Step 6: Add to Sidebar

Update `src/app/docs/_components/docs-sidebar.tsx`:

1. Import the Lucide icon at the top (if not already imported)
2. Add a `NavItem` entry in the correct section of the `navigation` array
3. Add `badge: "new"`

```typescript
{ title: "Heatmap", href: "/docs/heatmap", icon: Flame, badge: "new" },
```

Sections:

- `"Explore"` — Story, Changelog
- `"Get Started"` — Introduction, Installation, Comparison, Components, Hooks, Reference
- `"Core"` — Map, Controls, Compass, Marker, Popup
- `"Features"` — Everything else

### Step 7: Add to Components Page

Update `src/app/docs/components/page.tsx`:

1. Import the Lucide icon at the top (if not already imported)
2. Add a `ComponentItem` entry to the `components` array
3. Add `isNew: true`

```typescript
{
  title: "Heatmap",
  href: "/docs/heatmap",
  description: "Short description matching the registry description",
  icon: Flame,
  category: "features",
  installCommand: "npx shadcn@latest add https://www.terrae.dev/heat-map.json",
  isNew: true,
},
```

##### Key rules:

- `category` is `"core"` or `"features"` (must match the sidebar section)
- `installCommand` URL follows the pattern `https://www.terrae.dev/{registry-name}.json`
- Add `mapboxOnly: true` if the component only works with Mapbox GL (not MapLibre)
- Place the entry near similar components in the array

### Step 8: Update Changelog

Update `src/app/docs/changelog/page.tsx`:

Add a new entry to the `components` array of the most recent (topmost) `ChangelogEntry` in the `changelogs` array:

```typescript
{
  title: "Heatmap",
  description: (
    <>
      New <code className="rounded bg-muted px-1 py-0.5 text-xs">MapHeatmap</code> component for
      visualizing data density on the map. Supports customizable color ramps, radius control,
      and intensity adjustment.
    </>
  ),
  href: "/docs/heatmap",
},
```

##### Key rules:

- Add under `components` for new components, `features` for new features, `fixes` for bug fixes, `properties` for new props
- The `description` uses JSX with inline `<code>` tags for component names
- Always include `href` linking to the docs page

### Step 9: Review with User

Before finalizing, show all changes:

- The component source code
- The barrel export addition
- The registry entry
- The example file(s)
- The documentation page
- The sidebar entry
- The components page entry
- The changelog entry
