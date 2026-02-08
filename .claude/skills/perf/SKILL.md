---
name: perf
description: Audit component performance and identify optimization opportunities with actionable fixes
argument-hint: [component-name]
allowed-tools: Read, Grep, Glob, Bash(git diff*)
---

# Performance Audit Skill

Audit Terrae components for performance issues. Identifies problems, explains their impact, and provides actionable fixes.

If `$ARGUMENTS` is provided, audit only that component. Otherwise, audit all components in `src/registry/map/`.

Performance patterns and best practices are defined in `.claude/rules/react/performance.md`.

## Instructions

### Step 1: Identify Target

If a component name is provided, locate it in `src/registry/map/`. Otherwise, scan all component files.

### Step 2: Run the Audit

For each component, read the full file and check every rule in `.claude/rules/react/performance.md`:

1. Resource cleanup (RAF, timers, listeners, markers, layers, sources, images, observers, canvas)
2. Recursive requestAnimationFrame polling
3. Untracked timers in renderers
4. Mapbox objects in state vs refs
5. useEffect dependency arrays (oversized, unstable references, callbacks)
6. Layer and source management (setPaintProperty vs remove/re-add, existence checks)
7. GeoJSON data handling (recomputation, update frequency)
8. Canvas performance (pixel ratio, size, getImageData, off-screen canvas)
9. DOM manipulation (innerHTML, style injection)
10. Memory leaks (event listeners, growing collections, stale closures)

Also check for:

- Component re-render cost (expensive computations in render path, large JSX trees)
- Duplicate utility functions across files (DRY violations that bloat bundle size)

### Step 3: Report

Structure the report as:

```
## Performance Audit: [Component Name]

### Score: [X/10]

### Critical Issues
Issues that cause measurable performance degradation or memory leaks.

### Warnings
Patterns that could degrade performance under load or over time.

### Best Practices
Recommendations for following optimal patterns.

### Passed Checks
Checks that the component already handles correctly.
```

For each issue found, include:

- **What**: Description of the problem
- **Where**: File path and line number
- **Impact**: What happens if not fixed (memory leak, jank, unnecessary re-renders, etc.)
- **Fix**: Concrete code example showing the solution

## Scoring Guide

- **10/10**: No issues found, follows all best practices
- **8-9/10**: Minor warnings only, no performance impact
- **6-7/10**: Some warnings that could cause issues under load
- **4-5/10**: Has performance issues that affect user experience
- **2-3/10**: Critical issues causing memory leaks or severe jank
- **0-1/10**: Fundamentally broken performance patterns
