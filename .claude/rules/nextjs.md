# Next.js Guidelines

## App Router Folder Structure

### Keep Route Folders Clean

Route folders inside `src/app/` should only contain Next.js route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, etc.) and sub-route folders.

All non-route files (components, data, utilities, articles, illustrations) must live outside the route folder.

Do not use underscore-prefixed folders (`_components`, `_data`, etc.) inside route segments.

While Next.js supports this pattern, it clutters the route folder and mixes routing concerns with application logic.

```
// ❌ Avoid - non-route folders inside route segments
src/app/blog/
├── [slug]/
│   ├── layout.tsx
│   └── page.tsx
├── _articles/
│   └── my-article.tsx
├── _components/
│   └── blog-card.tsx
├── _data/
│   └── posts.ts
├── _illustrations/
│   └── hero.tsx
└── page.tsx

// ✅ Good - route folder only has route files
src/app/blog/
├── [slug]/
│   ├── layout.tsx
│   └── page.tsx
└── page.tsx
```

### Where Non-Route Files Go

- **Components**: `src/components/{feature}/` (e.g., `src/components/blog/card.tsx`)
- **Data / Posts**: `src/{concern}/` with an `index.ts` barrel (e.g., `src/posts/index.ts`)
- **Illustrations**: `src/illustrations/` with an `index.tsx` barrel
- **Articles / Content**: `src/{feature}/` (e.g., `src/blog/my-article.tsx`)
- **Shared components** (header, footer): `src/components/`

### File Naming

- Do not repeat the parent folder name in file names.

Files inside `src/components/blog/` should be named `card.tsx`, not `blog-card.tsx`.

```
// ❌ Avoid - redundant prefix
src/components/blog/blog-card.tsx
src/components/blog/blog-header.tsx

// ✅ Good - folder provides context
src/components/blog/card.tsx
src/components/blog/header.tsx
```
