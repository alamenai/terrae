@.claude/rules/overview.md
@.claude/rules/typescript.md
@.claude/rules/javascript.md
@.claude/rules/react.md
@.claude/rules/nextjs.md
@.claude/rules/security.md
@.claude/rules/clean-code.md

# Common Commands

- `npm run dev` - Start Next.js dev server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run format:check` - Check formatting
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run registry:build` - Build component registry to `./public`
- `npx tsc --noEmit` - Type-check without emitting

# Project Gotchas

- Mapbox GL requires `"use client"` on all map components
- The `useMap()` hook only works inside the `<Map>` provider context
- Always check `isLoaded` from `useMap()` before accessing the map instance
- Registry components are installed into user projects, so never include side effects beyond the component's purpose
- Husky pre-commit hook runs `npm run build` and will fail the commit if the build breaks
- Commit messages must follow conventional commits format (enforced by commitlint)
- Do not add `Co-Authored-By` lines to commit messages
- Do not commit until you review the changes with the user
