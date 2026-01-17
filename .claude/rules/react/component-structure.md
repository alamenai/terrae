# React Component Structure Guidelines

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
};

// ❌ Avoid
const onClick = () => {
  // ...
};
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
