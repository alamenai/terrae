# JavaScript Guidelines

## Function Declarations

- Use `const` with arrow functions instead of `function` keyword
- Prefer arrow functions for consistency and lexical `this` binding
- Always use explicit return with curly braces `{}`, avoid implicit returns

```javascript
// ✅ Good - explicit return with braces
const getTotal = (items) => {
  return items.reduce((sum, item) => {
    return sum + item.price
  }, 0)
}

// ❌ Avoid - implicit return
const getTotal = (items) => items.reduce((sum, item) => sum + item.price, 0)
```

## Early Returns

- Return early to avoid deep nesting and improve readability
- Handle edge cases and errors at the beginning of functions
- Avoid else blocks when possible by returning early
- Always use curly braces with return statements, even for early returns

```javascript
// ✅ Good - early return with braces
const processUser = (user) => {
  if (!user) {
    return null
  }
  if (!user.isActive) {
    return null
  }

  return transformUser(user)
}

// ❌ Avoid - return without braces
const processUser = (user) => {
  if (!user) return null

  return transformUser(user)
}
```

## Examples

```javascript
// ✅ Good - using const with arrow function
const getUserData = async (userId) => {
  return await fetchUser(userId)
}

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ❌ Avoid - using function keyword
function getUserData(userId) {
  return await fetchUser(userId)
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```
