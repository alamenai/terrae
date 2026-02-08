---
name: check
description: Verify all outputs exist after creating a new component and fix any issues
argument-hint: [component-name]
---

# Check Component Skill

Verify that all 8 required outputs exist and are wired correctly after creating a new component.

## Instructions

Given a component name (e.g., `cyclone`, `MapCyclone`), normalize it to its kebab-case slug (e.g., `cyclone`) and run through every check below.

### Check 1: Component Source File

- File exists: `src/registry/map/{slug}.tsx`
- Has `"use client"` directive (if it uses hooks, event handlers, or browser APIs)
- Exports a named component (e.g., `MapCyclone`)
- Uses `type` not `interface` for type definitions
- Uses arrow functions with explicit returns
- Default values use `SCREAMING_SNAKE_CASE` constants above the component
- Required props come before optional props in the type definition
- Cleanup in useEffect return functions (removes layers, sources, markers, event listeners)

### Check 2: Barrel Export

- `src/registry/map/index.tsx` has an export line for the component
- If the component exposes a control hook, it is also exported (e.g., `useCycloneControl`)

### Check 3: Registry Entry

- `registry.json` has an entry in `items` with:
  - `name` in kebab-case (e.g., `cyclone`)
  - `registryDependencies` includes `"https://www.terrae.dev/map.json"`
  - `files[0].path` matches the source file path
  - `files[0].target` follows `components/ui/map/{slug}.tsx`

### Check 4: Example Files

- At least one example exists: `src/app/docs/_components/examples/{slug}-example.tsx`
- Examples import from `@/registry/map`
- Examples wrap the map in `<div className="h-full w-full">`
- Examples use `process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""` as access token
- Examples that use hooks or event handlers have `"use client"`

### Check 5: Documentation Page

- File exists: `src/app/docs/{slug}/page.tsx`
- Exports `metadata` with a `title`
- Uses `DocsLayout` with `title`, `description`, `prev`, and `next`
- First section is "Installation" with two `CodeBlock`s (base map + component)
- Basic `ComponentPreview` appears directly after Installation
- Every example rendered on the page has a matching `getExampleSource` call
- If the component has configurable props, a properties `Table` section exists
- All documented props match the actual component props (no missing, no extra)

### Check 6: Sidebar Navigation

- `src/app/docs/_components/docs-sidebar.tsx` has a `NavItem` for the component
- The `href` matches `/docs/{slug}`
- Has `badge: "new"`
- Placed in the correct section (`"Core"` or `"Features"`)
- The Lucide icon is imported

### Check 7: Components Page

- `src/app/docs/components/page.tsx` has a `ComponentItem` entry
- The `href` matches `/docs/{slug}`
- Has `isNew: true`
- `category` matches the sidebar section
- `installCommand` URL matches `https://www.terrae.dev/{registry-name}.json`
- The Lucide icon is imported

### Check 8: Changelog

- `src/app/docs/changelog/page.tsx` has an entry in the most recent `ChangelogEntry`
- Entry has `title`, `description` (with `<code>` tag for component name), and `href`
- `href` matches `/docs/{slug}`

## Output Format

Present results as a checklist table:

```
| #   | Output             | Status | Notes                   |
| --- | ------------------ | ------ | ----------------------- |
| 1   | Component source   | pass   |                         |
| 2   | Barrel export      | pass   |                         |
| 3   | Registry entry     | fail   | Missing target path     |
| 4   | Examples           | pass   | 3 examples found        |
| 5   | Documentation page | warn   | Missing props: `scale`  |
| 6   | Sidebar navigation | pass   |                         |
| 7   | Components page    | pass   |                         |
| 8   | Changelog          | pass   |                         |
```

- **pass**: Everything correct
- **warn**: Works but has minor issues (e.g., missing optional prop in docs table)
- **fail**: Missing or broken, needs fixing

After the table, list specific issues with file paths and line numbers.

## Fix Phase

If any checks have **fail** or **warn** status, fix them automatically:

1. Work through issues in check order (1–8)
2. Apply the minimal change needed for each issue
3. After all fixes, re-run the checks to confirm everything passes
4. Present the updated checklist table showing all checks as **pass**

If a fix requires a decision (e.g., which sidebar section to place the component in), ask the user before proceeding.
