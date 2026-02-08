# React Component Structure Guidelines

## File Structure

- Place all type definitions at the top of the file, before constants and components
- Order types from most general to most specific
- Group related types together

```typescript
// ✅ Good - types at the top
type User = {
  id: string
  name: string
}

type UserCardProps = {
  user: User
  onSelect: (id: string) => void
}

const DEFAULT_USER: User = {
  id: "1",
  name: "John",
}

const UserCard = ({ user, onSelect }: UserCardProps) => {
  // ...
}

// ❌ Avoid - types scattered
const DEFAULT_USER = {
  id: "1",
  name: "John",
}

type UserCardProps = {
  user: User
  onSelect: (id: string) => void
}

const UserCard = ({ user, onSelect }: UserCardProps) => {
  // ...
}

type User = {
  id: string
  name: string
}
```

## Component Structure

- Follow the Stepdown Rule: parent components before child components

- Order component internals consistently:
  1. Refs
  2. State
  3. Derived state / memoized values
  4. Effects
  5. Event handlers
  6. Early returns (loading, error states)
  7. Main render

## Event Handlers

- Prefix event handlers with `handle` (e.g., `handleClick`, `handleSubmit`)
- Use arrow functions for handlers defined inside components

```typescript
// ✅ Good
const handleClick = () => {
  // ...
}

// ❌ Avoid
const onClick = () => {
  // ...
}
```

## Component Composition

- Prefer composition over prop drilling
- Use children prop for flexible composition
- Create compound components for related functionality
- Keep components small and focused

```typescript
// ✅ Good - composition with children
const Card = ({ children }: { children: ReactNode }) => {
  return <div className="card">{children}</div>;
};

const CardHeader = ({ children }: { children: ReactNode }) => {
  return <div className="card-header">{children}</div>;
};

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <p>Content</p>
</Card>

// ❌ Avoid - props for everything
const Card = ({ title, content }: CardProps) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <p>{content}</p>
    </div>
  );
};
```

## State Management

- Keep state as local as possible
- Lift state up only when necessary
- Use context for deeply nested props, not as global state
- Prefer multiple specific contexts over one large context

## Refs and State Naming

- Avoid using "ready" in ref or state names (e.g., `isReady`, `mapReady`)
- Prefer more descriptive terms like `isLoaded`, `isInitialized`, or `isMounted`

```typescript
// ✅ Good - specific and descriptive
const [isLoaded, setIsLoaded] = useState(false)
const [isInitialized, setIsInitialized] = useState(false)
const [isMounted, setIsMounted] = useState(false)
const mapRef = useRef<Map | null>(null)

// ❌ Avoid - vague "ready" naming
const [isReady, setIsReady] = useState(false)
const [mapReady, setMapReady] = useState(false)
const readyRef = useRef(false)
```

```typescript
// ✅ Good - local state
const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => { setCount(count + 1); }}>{count}</button>;
};

// ❌ Avoid - unnecessary state lifting
const App = () => {
  const [count, setCount] = useState(0);

  return <Counter count={count} setCount={setCount} />;
};
```

## Map Components

Map components live in `src/registry/map/` and follow additional conventions.

### File Location and Naming

- Location: `src/registry/map/{component-name}.tsx`
- Use kebab-case for file names (e.g., `heat-map.tsx`, `circle-cluster.tsx`)

### Template

```typescript
"use client"

// 1. Imports (React first, then external, then internal)
import { useEffect, useRef, useState, type ReactNode } from "react"
import mapboxgl from "mapbox-gl"
import { cn } from "@/lib/utils"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

// 2. Type definitions (extracted, not inline)
type ComponentProps = {
  // Required props first
  coordinates: MapCoordinates
  children: ReactNode
  // Optional props after
  className?: string
}

// 3. Default constants (SCREAMING_SNAKE_CASE)
const DEFAULT_VALUE = 10

// 4. Parent component first (Stepdown Rule)
export const MapComponent = ({ coordinates, children, className }: ComponentProps) => {
  // Refs
  const elementRef = useRef<HTMLDivElement | null>(null)

  // State
  const [isMounted, setIsMounted] = useState(false)

  // Hooks
  const { map, isLoaded } = useMap()

  // Effects
  useEffect(() => {
    // Implementation
  }, [])

  // Handlers
  const handleClick = () => {
    // Handler logic
  }

  // Early returns
  if (!isLoaded) {
    return null
  }

  // Main render
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}

// 5. Child/compound components after
export const ComponentContent = () => {
  // ...
}

// 6. Control hooks at the bottom
export const useComponentControl = (id: string): ComponentControl | null => {
  return controls.get(id) || null
}
```

### Key Patterns

- Use `useMap()` hook to access the map instance
- Use `cn()` for className merging
- Add `"use client"` directive only if the component uses hooks, event handlers, or browser APIs
- Handle cleanup in useEffect return functions
- Use refs for Mapbox objects that shouldn't trigger re-renders

### Barrel Export

Add export to `src/registry/map/index.tsx`:

```typescript
// Simple component
export { MapHeatmap } from "./heat-map"

// Component with control hook
export { MapHeatmap, useHeatmapControl } from "./heat-map"

// Compound components
export { MapHeatmap, HeatmapLegend, HeatmapControls } from "./heat-map"

// Component with exported types
export { MapHeatmap, type HeatmapColorStop } from "./heat-map"
```

### Responsiveness

- Map containers must fill their parent with `h-full w-full`
- Use responsive Tailwind classes for UI overlays on the map (e.g., controls, legends)
- Avoid fixed pixel widths — use relative units or Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Test that overlays and controls don't overflow on small screens
- Use `resize` event listeners on the map to handle dynamic container resizing

### Performance

- Store Mapbox GL objects (markers, sources, layers, popups) in refs, not state — they should not trigger re-renders
- Always clean up in useEffect return functions: remove layers, sources, markers, and event listeners
- Use unique `id` props for sources and layers to avoid conflicts with multiple instances
- Avoid creating new Mapbox objects on every render — initialize once, update properties via refs
- Batch map operations inside `map.once("idle", ...)` or after `isLoaded` to avoid layout thrashing
- Prefer `map.setPaintProperty()` / `map.setLayoutProperty()` over removing and re-adding layers for updates
- For animation components, use `requestAnimationFrame` and cancel with the returned ID in cleanup
- Minimize GeoJSON data transformations on every render — memoize or compute outside the component when possible
