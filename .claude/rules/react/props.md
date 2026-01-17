# React Props Guidelines

## Props Documentation
- Avoid commenting props - use clear, self-documenting prop names instead
- Only add `//` comments above props when absolutely necessary for clarification
- Don't comment obvious props or repeat what the type already says
- Good prop names > comments

```typescript
// ✅ Good - clear names, minimal comments
type MapProps = {
  accessToken: string;
  children?: ReactNode;
  // Overrides theme-based styles when set
  style?: string;
  styles?: MapThemeStyles;
  center?: MapCoordinates;
  zoom?: number;
};

// ❌ Avoid - commenting every prop
type MapProps = {
  // Mapbox access token
  accessToken: string;
  // React children
  children?: ReactNode;
  // Map style
  style?: string;
};

// ❌ Avoid - redundant comments
type ButtonProps = {
  // Handles click events
  onClick: () => void;
  // Button variant
  variant?: "primary" | "secondary";
};
```

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
