# React Hooks Guidelines

## useEffect
- Avoid implementation details inside useEffect - extract into functions
- Keep useEffect body clean and declarative
- Name extracted functions to describe what they do

### useEffect Dependencies
- **Always include all values used inside the effect that can change over time**
- Don't lie about dependencies - React needs them to know when to re-run
- Empty array `[]` = run once on mount only
- No array = run after every render (rarely needed)
- If you don't want to re-run when a value changes, you have options:
  - Move that code outside the effect if possible
  - Use a ref to store values that shouldn't trigger re-runs
  - Split into multiple smaller effects with different dependencies

```typescript
// ✅ Good - separate effects for different concerns
useEffect(() => {
  const map = createMap(container);
  mapRef.current = map;

  return () => {
    map.destroy();
  };
}, []);

useEffect(() => {
  if (!mapRef.current) {
    return;
  }

  mapRef.current.setZoom(zoom);
}, [zoom]);

useEffect(() => {
  if (!mapRef.current) {
    return;
  }

  mapRef.current.setCenter(center);
}, [center]);

// ❌ Avoid - everything in one effect causes unnecessary recreations
useEffect(() => {
  const map = createMap(container);
  map.setZoom(zoom);
  map.setCenter(center);
  mapRef.current = map;

  return () => {
    map.destroy();
  };
}, [zoom, center]);

// ❌ Avoid - missing dependencies (lies to React)
useEffect(() => {
  console.log(userId);
}, []);

// ❌ Avoid - using value not in dependencies
useEffect(() => {
  fetchUser(userId);
}, []);
```

```typescript
// ✅ Good - implementation extracted to function
const initializeMap = () => {
  const map = new Map(container);
  map.setCenter(center);
  map.setZoom(zoom);

  return map;
};

useEffect(() => {
  const map = initializeMap();

  return () => {
    map.destroy();
  };
}, []);

// ❌ Avoid - implementation details inside useEffect
useEffect(() => {
  const map = new Map(container);
  map.setCenter(center);
  map.setZoom(zoom);
  map.on("load", () => {
    setIsLoaded(true);
  });
  map.on("error", (e) => {
    console.error(e);
    setError("Failed");
  });

  return () => {
    map.destroy();
  };
}, []);
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
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Map initialization logic
  }, [accessToken]);

  return { map, isLoaded };
};

// ❌ Avoid - logic mixed in component
const Map = ({ accessToken }: MapProps) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // ... all map logic here
};
```
