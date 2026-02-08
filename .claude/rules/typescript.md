# TypeScript Guidelines

## Type Definitions

- Use `type` instead of `interface` for all type definitions
- Prefer type aliases for object shapes, unions, and intersections
- Use `type` for consistency across the codebase

## Naming Conventions

- Use PascalCase for type names
- Prefix types with descriptive names (e.g., `UserProfile`, `ApiResponse`)
- Avoid generic names like `Data` or `Props` without context

## Type Ordering

- Define parent types before child types that reference them
- Types that are used by other types must appear first in the file
- Order: independent types → composed types → component props types

```typescript
// ✅ Good - parent type before child type
type Coordinates = [number, number]

type Step = {
  coordinates: Coordinates
  bearing: number
}

type AnimationProps = {
  steps: Step[]
  duration: number
}

// ❌ Avoid - child type before parent type
type AnimationProps = {
  steps: Step[]
  duration: number
}

type Step = {
  coordinates: Coordinates
  bearing: number
}

type Coordinates = [number, number]
```

## Type Safety

- Avoid using `any` - use `unknown` if the type is truly unknown
- Prefer strict typing over loose typing
- Use const assertions where appropriate
- Leverage utility types (Pick, Omit, Partial, Required, etc.)

## Examples

```typescript
// ✅ Good - using type
type User = {
  id: string
  name: string
  email: string
}

// ❌ Avoid - using interface
interface User {
  id: string
  name: string
  email: string
}
```
