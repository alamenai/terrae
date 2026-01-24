# React Hooks Guidelines

## useEffect

- Avoid implementation details inside useEffect - extract into functions
- Keep useEffect body clean and declarative
- Name extracted functions to describe what they do

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

## useCallback and useMemo

- Don't add `useCallback` or `useMemo` "just in case" - only use as performance optimization
- Measure performance first before adding memoization
- Most calculations are fast enough without memoization

**Only use `useMemo` when:**

- The calculation is noticeably slow AND dependencies rarely change
- Passing value to a component wrapped in `memo`
- The value is used as a dependency of another Hook

**Only use `useCallback` when:**

- Passing function to a component wrapped in `memo`
- The function is used as a dependency of another Hook (useEffect, another useCallback)

```typescript
// ✅ Good - useCallback needed (passed to memo component)
const handleSubmit = useCallback(() => {
  submitForm(data);
}, [data]);

return <MemoizedForm onSubmit={handleSubmit} />;

// ❌ Avoid - unnecessary useCallback
const handleClick = useCallback(() => {
  setCount(count + 1);
}, [count]);

return <button onClick={handleClick}>Click</button>;
```

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
