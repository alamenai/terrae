---
paths:
  - "src/registry/**/*.{ts,tsx}"
  - "src/components/**/*.{ts,tsx}"
---

# React Performance Rules

## Resource Cleanup

Every `useEffect` that creates resources must return a cleanup function.

Resources and their cleanup:

- `requestAnimationFrame` → `cancelAnimationFrame(id)`
- `setTimeout` → `clearTimeout(id)`
- `setInterval` → `clearInterval(id)`
- `map.on(event)` → `map.off(event)`
- `new mapboxgl.Marker()` → `marker.remove()`
- `map.addLayer()` → `map.removeLayer()`
- `map.addSource()` → `map.removeSource()`
- `map.addImage()` → `map.removeImage()`
- `window.addEventListener()` → `window.removeEventListener()`
- `ResizeObserver` → `observer.disconnect()`
- Canvas contexts → nullify references

```typescript
// ❌ Avoid — leaked animation frame
useEffect(() => {
  const animate = () => {
    // ...
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}, [])

// ✅ Good — tracked and cancelled
useEffect(() => {
  let frameId: number

  const animate = () => {
    // ...
    frameId = requestAnimationFrame(animate)
  }
  frameId = requestAnimationFrame(animate)

  return () => {
    cancelAnimationFrame(frameId)
  }
}, [])
```

## Recursive requestAnimationFrame Polling

When using `requestAnimationFrame` to poll for a condition (e.g., waiting for map style to load), track the ID and cancel it in cleanup.

```typescript
// ❌ Avoid — untracked recursive RAF
const waitForStyle = () => {
  if (map.isStyleLoaded()) {
    addLayers()
  } else {
    requestAnimationFrame(waitForStyle)
  }
}
requestAnimationFrame(waitForStyle)

// ✅ Good — tracked with cancellation
let pollId: number
const waitForStyle = () => {
  if (map.isStyleLoaded()) {
    addLayers()
  } else {
    pollId = requestAnimationFrame(waitForStyle)
  }
}
pollId = requestAnimationFrame(waitForStyle)

// In cleanup:
cancelAnimationFrame(pollId)
```

## Untracked Timers in Renderers

Store timer IDs from `setTimeout` or `setInterval` inside renderer objects, custom paint classes, or callbacks. Clear them on unmount.

```typescript
// ❌ Avoid — timeout inside renderer not tracked
render() {
  // ...
  setTimeout(() => {
    this.start()
  }, 1000)
}

// ✅ Good — track timer for cleanup
render() {
  // ...
  this.restartTimerId = window.setTimeout(() => {
    this.start()
  }, 1000)
}

destroy() {
  clearTimeout(this.restartTimerId)
}
```

## Mapbox Objects in Refs, Not State

Mapbox GL objects (markers, popups, sources, layers) must be stored in `useRef`, not `useState`. State causes unnecessary re-renders.

```typescript
// ❌ Avoid — triggers re-render on every marker update
const [marker, setMarker] = useState<mapboxgl.Marker | null>(null)

// ✅ Good — no re-render, direct mutation
const markerRef = useRef<mapboxgl.Marker | null>(null)
```

## useEffect Dependency Arrays

### Oversized dependency arrays

More than 5-6 deps indicates the effect does too many things. Split into focused effects with fewer deps.

### Unstable references in deps

Arrays, objects, and function calls that create new references every render cause the effect to re-run unnecessarily.

```typescript
// ❌ Avoid — canvasCenter is a new array every render, effect runs every render
const canvasCenter = calculateMidpoint(origin, target)

useEffect(() => {
  initializeCanvas(canvasCenter)
}, [canvasCenter])

// ✅ Good — memoize the computed value
const canvasCenter = useMemo(() => {
  return calculateMidpoint(origin, target)
}, [origin, target])

useEffect(() => {
  initializeCanvas(canvasCenter)
}, [canvasCenter])
```

### Callbacks in deps

```typescript
// ❌ Avoid — onClick recreated every render, event listener constantly re-attached
useEffect(() => {
  map.on("click", onClick)
  return () => map.off("click", onClick)
}, [map, onClick])

// ✅ Good — use ref for callbacks
const onClickRef = useRef(onClick)
onClickRef.current = onClick

useEffect(() => {
  const handler = (event: mapboxgl.MapMouseEvent) => onClickRef.current(event)
  map.on("click", handler)
  return () => map.off("click", handler)
}, [map])
```

## Layer and Source Management

### Update properties, don't remove and re-add

Use `map.setPaintProperty()` or `map.setLayoutProperty()` instead of removing and re-adding layers on prop changes.

```typescript
// ❌ Avoid — removes and re-adds entire layer
useEffect(() => {
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId)
  }
  map.addLayer({ id: layerId, paint: { "fill-color": color } })
}, [color])

// ✅ Good — update only the changed property
useEffect(() => {
  if (map.getLayer(layerId)) {
    map.setPaintProperty(layerId, "fill-color", color)
  }
}, [color])
```

### Check existence before removal

```typescript
// ❌ Avoid — throws if layer doesn't exist
map.removeLayer(layerId)

// ✅ Good — check first
if (map.getLayer(layerId)) {
  map.removeLayer(layerId)
}
if (map.getSource(sourceId)) {
  map.removeSource(sourceId)
}
```

## GeoJSON Data Handling

### Avoid recomputing on every render

Memoize expensive data transformations. Move static GeoJSON data outside the component.

```typescript
// ❌ Avoid — new GeoJSON object every render
const geojson = {
  type: "FeatureCollection",
  features: points.map((point) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: point },
  })),
}

// ✅ Good — memoize
const geojson = useMemo(() => {
  return {
    type: "FeatureCollection" as const,
    features: points.map((point) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: point },
    })),
  }
}, [points])
```

### Avoid updating source data too frequently

Batch updates or throttle when driven by animation.

## Canvas Performance

- Account for `window.devicePixelRatio` for sharp rendering, but cap at 2
- Size canvases to match the visible area, not larger
- Avoid `getImageData` / `putImageData` every frame — these are expensive
- Use `OffscreenCanvas` or a hidden canvas for pre-rendering complex scenes

## DOM Manipulation

- Avoid `innerHTML` clearing followed by manual `appendChild` — use React state/refs instead
- Avoid `document.createElement("style")` for style injection — creates elements that aren't cleaned up and duplicates across instances. Use global CSS or CSS modules instead

## Memory Leaks

### Event listeners

Remove all event listeners in cleanup with the same function reference used to attach them.

### Growing collections in refs

Refs that accumulate items (markers, layers) must have cleanup that removes items when the component updates or unmounts.

### Stale closures

Animation callbacks that capture component state become stale. Use refs for values that change but should not restart animations.
