# React Rendering Guidelines

## Conditional Rendering
- Use `if-else` statements instead of ternary operators for complex conditions
- Extract conditional rendering logic to variables before the return statement
- Avoid long inline conditional expressions in JSX

```typescript
// ✅ Good - if-else with early return
if (isLoading) {
  return <Loader />;
}

if (error) {
  return <Error message={error} />;
}

return <Content data={data} />;

// ✅ Good - extract to variable
const content = isExpanded ? <ExpandedView data={data} /> : <CollapsedView />;

return <div>{content}</div>;

// ❌ Avoid - long ternary in JSX
return (
  <div>
    {isLoading ? <Loader /> : error ? <Error message={error} /> : <Content data={data} />}
  </div>
);
```

## Inline Functions in JSX
- Avoid defining functions inline in JSX
- Extract handlers to named functions above the return statement

```typescript
// ✅ Good - extracted handler
const handleClick = () => {
  setCount(count + 1);
};

return <button onClick={handleClick}>Click</button>;

// ❌ Avoid - inline function
return <button onClick={() => setCount(count + 1)}>Click</button>;

// ❌ Avoid - inline function with logic
return (
  <ul>
    {items.map((item) => {
      const total = item.price * item.quantity;
      return <li key={item.id}>{total}</li>;
    })}
  </ul>
);

// ✅ Good - extract to component or function
const renderItem = (item: Item) => {
  const total = item.price * item.quantity;

  return <li key={item.id}>{total}</li>;
};

return <ul>{items.map(renderItem)}</ul>;
```

## Keys in Lists
- Always provide stable, unique keys for list items
- Use item IDs, not array indices
- Don't use index as key unless list is static and never reordered

```typescript
// ✅ Good - unique ID as key
{items.map((item) => {
  return <li key={item.id}>{item.name}</li>;
})}

// ❌ Avoid - index as key (for dynamic lists)
{items.map((item, index) => {
  return <li key={index}>{item.name}</li>;
})}
```

## Fragment Usage
- Use `<>` shorthand for fragments when no key is needed
- Use `<Fragment>` when you need to add a key
- Avoid unnecessary wrapper divs

```typescript
// ✅ Good - fragment shorthand
const Component = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

// ✅ Good - Fragment with key
{items.map((item) => {
  return (
    <Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.definition}</dd>
    </Fragment>
  );
})}

// ❌ Avoid - unnecessary div wrapper
const Component = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};
```
