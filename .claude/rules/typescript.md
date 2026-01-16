# TypeScript Guidelines

## Type Definitions
- Use `type` instead of `interface` for all type definitions
- Prefer type aliases for object shapes, unions, and intersections
- Use `type` for consistency across the codebase

## Naming Conventions
- Use PascalCase for type names
- Prefix types with descriptive names (e.g., `UserProfile`, `ApiResponse`)
- Avoid generic names like `Data` or `Props` without context

## Type Safety
- Avoid using `any` - use `unknown` if the type is truly unknown
- Prefer strict typing over loose typing
- Use const assertions where appropriate
- Leverage utility types (Pick, Omit, Partial, Required, etc.)

## Examples
```typescript
// ✅ Good - using type
type User = {
  id: string;
  name: string;
  email: string;
};

// ❌ Avoid - using interface
interface User {
  id: string;
  name: string;
  email: string;
}
```
