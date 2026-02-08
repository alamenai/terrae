# React Hooks Guidelines

## useEffect

### Extract Implementation Logic

**Do not implement function logic inside useEffect.** Extract implementation details into named functions defined outside the effect body. This keeps effects clean, declarative, and easier to test.

- Define helper functions above the effect or outside the component
- Name functions to describe what they do (e.g., `initializeMap`, `createMarkers`)
- The effect body should only call functions, not contain logic

### useEffect Dependencies

- **Only add dependencies that should trigger re-runs** - don't blindly add everything the linter suggests
- If a value is used but shouldn't trigger re-runs, use a ref instead of adding it to deps
- Empty array `[]` = run once on mount only
- No array = run after every render (rarely needed)
- Split effects by concern - each effect should have minimal, focused dependencies

**Strategies to avoid unnecessary dependencies:**

- Use refs for values that shouldn't trigger re-runs (callbacks, latest values)
- Move static values outside the component
- Split into multiple smaller effects with different dependencies
- Extract logic into functions defined outside the effect

```typescript
// ✅ Good - separate effects for different concerns
useEffect(() => {
  const map = createMap(container)
  mapRef.current = map

  return () => {
    map.destroy()
  }
}, [])

useEffect(() => {
  if (!mapRef.current) {
    return
  }

  mapRef.current.setZoom(zoom)
}, [zoom])

useEffect(() => {
  if (!mapRef.current) {
    return
  }

  mapRef.current.setCenter(center)
}, [center])

// ❌ Avoid - everything in one effect causes unnecessary recreations
useEffect(() => {
  const map = createMap(container)
  map.setZoom(zoom)
  map.setCenter(center)
  mapRef.current = map

  return () => {
    map.destroy()
  }
}, [zoom, center])

// ❌ Avoid - missing dependencies (lies to React)
useEffect(() => {
  console.log(userId)
}, [])

// ❌ Avoid - adding callback to deps causes infinite loops or unnecessary re-runs
useEffect(() => {
  map.on("click", onClick)
  return () => map.off("click", onClick)
}, [map, onClick]) // onClick changes every render!

// ✅ Good - use ref for callbacks to avoid unnecessary re-runs
const onClickRef = useRef(onClick)
onClickRef.current = onClick

useEffect(() => {
  const handler = (e) => onClickRef.current(e)
  map.on("click", handler)
  return () => map.off("click", handler)
}, [map]) // Only re-run when map changes
```

```typescript
// ✅ Good - implementation extracted to function
const initializeMap = () => {
  const map = new Map(container)
  map.setCenter(center)
  map.setZoom(zoom)

  return map
}

useEffect(() => {
  const map = initializeMap()

  return () => {
    map.destroy()
  }
}, [])

// ❌ Avoid - implementation details inside useEffect
useEffect(() => {
  const map = new Map(container)
  map.setCenter(center)
  map.setZoom(zoom)
  map.on("load", () => {
    setIsLoaded(true)
  })
  map.on("error", (e) => {
    console.error(e)
    setError("Failed")
  })

  return () => {
    map.destroy()
  }
}, [])
```

## useCallback, useMemo, and memo

**Default: Don't use them.** These are performance optimizations, not best practices. Adding them "just in case" adds complexity without benefit.

### When NOT to use useMemo

- Simple calculations (math, string operations, array methods on small arrays)
- Creating objects or arrays that are only used in render
- Values that change on every render anyway
- "Just in case" or "to be safe"

```typescript
// ❌ Avoid - trivial calculations don't need memoization
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`
}, [firstName, lastName])

const isActive = useMemo(() => {
  return status === "active"
}, [status])

const centerSize = useMemo(() => {
  return size * 0.35
}, [size])

// ✅ Good - just compute directly
const fullName = `${firstName} ${lastName}`
const isActive = status === "active"
const centerSize = size * 0.35
```

### When to use useMemo

Only when ALL of these are true:

1. The calculation is **measurably slow** (profile first with React DevTools)
2. The result is used in a way that benefits from referential stability
3. The dependencies change infrequently

```typescript
// ✅ Good - expensive filtering/sorting on large dataset
const sortedItems = useMemo(() => {
  return items.filter((item) => item.category === category).sort((a, b) => b.score - a.score)
}, [items, category])

// ✅ Good - value passed to memo component or used as effect dependency
const config = useMemo(() => {
  return { threshold, sensitivity }
}, [threshold, sensitivity])

useEffect(() => {
  initializeWithConfig(config)
}, [config])
```

### When NOT to use useCallback

- Event handlers passed to regular DOM elements (`<button>`, `<input>`)
- Functions that are only called in the same component
- Functions with dependencies that change frequently

```typescript
// ❌ Avoid - button is not memoized, no benefit
const handleClick = useCallback(() => {
  setCount(count + 1)
}, [count])

return <button onClick={handleClick}>Click</button>

// ✅ Good - just define the function
const handleClick = () => {
  setCount(count + 1)
}

return <button onClick={handleClick}>Click</button>
```

### When to use useCallback

Only when the function is:

1. Passed to a component wrapped in `memo`
2. Used as a dependency of `useEffect` or another Hook

```typescript
// ✅ Good - passed to memoized child component
const handleSubmit = useCallback(() => {
  submitForm(data)
}, [data])

return <MemoizedForm onSubmit={handleSubmit} />
```

### When NOT to use memo

- Components that always re-render with new props anyway
- Components with children prop (children change on parent render)
- Simple/cheap components
- "Just in case" wrapping

### When to use memo

Only when:

1. Component renders often with the same props
2. Re-rendering is **measurably expensive** (profile first)
3. Props are referentially stable (primitives or memoized objects)

### The Rule

**If your code works fine without memoization, you don't need it.** Profile first, optimize second. Premature optimization adds complexity, hurts readability, and can even hurt performance if dependencies aren't managed correctly.

## Custom Hooks

- Extract reusable logic into custom hooks
- Prefix custom hooks with `use` (e.g., `useLocalStorage`, `useDebounce`)
- Keep hooks focused on a single responsibility
- Return arrays for positional values `[value, setValue]` or objects for named values `{ data, loading, error }`

```typescript
// ✅ Good - custom hook with clear responsibility
const useMap = (accessToken: string) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Map initialization logic
  }, [accessToken])

  return { map, isLoaded }
}

// ❌ Avoid - logic mixed in component
const Map = ({ accessToken }: MapProps) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  // ... all map logic here
}
```
