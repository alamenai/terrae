# React Guidelines

## Props Ordering
- Define required props before optional props in type definitions
- Group related props together within required/optional sections

```typescript
// ✅ Good - required props first
type ButtonProps = {
  // Required
  onClick: () => void;
  children: ReactNode;
  // Optional
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

// ❌ Avoid - mixed required and optional
type ButtonProps = {
  variant?: "primary" | "secondary";
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};
```

## Default Values
- Define default values as static constants outside the component
- Use SCREAMING_SNAKE_CASE for default value constants
- Group all defaults in a single object or as individual constants
- Place defaults above the component that uses them

```typescript
// ✅ Good - static defaults outside component
const DEFAULT_ZOOM = 2;
const DEFAULT_CENTER: MapCoordinates = [0, 0];
const DEFAULT_BEARING = 0;

// Or grouped as object
const MAP_DEFAULTS = {
  zoom: 2,
  center: [0, 0] as MapCoordinates,
  bearing: 0,
} as const;

const Map = ({ zoom = DEFAULT_ZOOM, center = DEFAULT_CENTER }: MapProps) => {
  // ...
};

// ❌ Avoid - inline default values (harder to find and reuse)
const Map = ({ zoom = 2, center = [0, 0] }: MapProps) => {
  // ...
};
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

## Props Destructuring
- Destructure props in the function signature for simple components
- Use explicit destructuring for components with many props

```typescript
// ✅ Good - destructure in signature
const Button = ({ onClick, children, variant = "primary" }: ButtonProps) => {
  // ...
};

// ✅ Also good for many props - explicit destructuring
const ComplexComponent = (props: ComplexProps) => {
  const {
    requiredProp1,
    requiredProp2,
    optionalProp1 = DEFAULT_VALUE,
    optionalProp2,
  } = props;
  // ...
};
```

## Event Handlers
- Prefix event handlers with `handle` (e.g., `handleClick`, `handleSubmit`)
- Use arrow functions for handlers defined inside components

```typescript
// ✅ Good
const handleClick = () => {
  // ...
};

// ❌ Avoid
const onClick = () => {
  // ...
};
```
