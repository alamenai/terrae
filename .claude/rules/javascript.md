# JavaScript Guidelines

## Function Declarations
- Use `const` with arrow functions instead of `function` keyword
- Prefer arrow functions for consistency and lexical `this` binding

## Examples
```javascript
// ✅ Good - using const with arrow function
const getUserData = async (userId) => {
  return await fetchUser(userId);
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ Avoid - using function keyword
function getUserData(userId) {
  return await fetchUser(userId);
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```
