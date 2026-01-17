# Clean Code Rules (Robert C. Martin)

## Naming
- Use intention-revealing names that explain purpose, not implementation
- Avoid disinformation - don't use misleading names
- Make meaningful distinctions - avoid noise words like `data`, `info`, `the`
- Use pronounceable and searchable names
- Avoid encodings and prefixes (no Hungarian notation)
- Class names should be nouns, function names should be verbs

## Functions
- Keep functions small (ideally under 20 lines)
- Functions should do one thing and do it well
- One level of abstraction per function
- Prefer fewer arguments (ideal: 0-2, avoid more than 3)
- Avoid flag arguments - split into separate functions instead
- Have no side effects - do only what the name promises
- Command-Query Separation: functions should either do something or answer something, not both
- Prefer exceptions over error codes

## Comments
- Code should be self-documenting - good code needs few comments
- Don't comment bad code, rewrite it
- Avoid redundant comments that repeat what code says
- Avoid noise comments (`// constructor`, `// default`)
- Never leave commented-out code - delete it
- Acceptable comments: legal, informative, explanation of intent, clarification, TODOs, warnings
- Use `//` comments on their own line above the code, not beside it
- Avoid `/* */` for single-line comments - use `//` instead

```typescript
// ✅ Good - comment above the line
// Timeout in milliseconds
const timeout = 5000;

// ❌ Avoid - comment beside the line
const timeout = 5000; // milliseconds

// ❌ Avoid - block comment for single line
/* Timeout in milliseconds */
const timeout = 5000;
```

## Formatting (The Newspaper Metaphor)
- Code should read like a newspaper: headline (name), synopsis (high-level), then details
- Vertical openness: separate concepts with blank lines
- Vertical density: keep related code together
- Declare variables close to their usage
- Keep dependent functions vertically close
- **Stepdown Rule**: place caller/parent functions above callees/children (top-down reading)
  - In React: parent components before child components
  - High-level functions at the top, low-level details below
  - Reader should understand intent before implementation
- Keep lines short (80-120 characters max)

## Objects and Data Structures
- Hide internal structure - expose behavior, not data
- Law of Demeter: only talk to immediate friends
- Avoid train wrecks: `a.getB().getC().doSomething()`
- Data structures expose data, objects expose behavior - don't mix

## Error Handling
- Use exceptions rather than return codes
- Write try-catch-finally first when writing code that could fail
- Provide context with exceptions
- Don't return null - throw exception or return special case object
- Don't pass null - validate inputs early

## Boundaries
- Keep third-party code at boundaries with wrapper classes
- Write learning tests to understand third-party APIs
- Use adapters to isolate external dependencies

## Unit Tests
- Follow the Three Laws of TDD:
  1. Write a failing test before production code
  2. Write only enough test to fail
  3. Write only enough production code to pass
- Keep tests clean - they are as important as production code
- One assert per test (when practical)
- F.I.R.S.T principles: Fast, Independent, Repeatable, Self-validating, Timely

## Classes
- Classes should be small - measured by responsibilities, not lines
- Single Responsibility Principle (SRP): one reason to change
- High cohesion: methods should use most instance variables
- Open-Closed Principle: open for extension, closed for modification
- Dependency Inversion: depend on abstractions, not concretions

## Code Smells to Avoid
- Rigidity: hard to change
- Fragility: breaks in unexpected places
- Immobility: hard to reuse
- Needless complexity: over-engineering
- Needless repetition: DRY violations
- Opacity: hard to understand

## General Principles
- Boy Scout Rule: leave code cleaner than you found it
- DRY (Don't Repeat Yourself)
- YAGNI (You Aren't Gonna Need It)
- Principle of Least Surprise: code should do what readers expect
- Separate construction from use (dependency injection)
