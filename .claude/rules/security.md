# Security Rules

## 1. XSS — Cross-Site Scripting Prevention

- Never use `dangerouslySetInnerHTML` with user-supplied or external data
- `dangerouslySetInnerHTML` is only acceptable for trusted, server-generated HTML (e.g., syntax-highlighted code from Shiki)
- Never use `innerHTML` to inject content — use React state/refs instead
- Never use `eval()`, `Function()`, or `document.write()`
- Sanitize any dynamic values inserted into DOM attributes (especially `href`, `src`, `style`)
- For `href` props, reject `javascript:` protocol URLs
- Escape user input before rendering — rely on React's built-in escaping by using JSX expressions `{value}` instead of string interpolation into HTML

```typescript
// ✅ Good — React auto-escapes
<p>{userInput}</p>

// ❌ Avoid — bypasses React escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Acceptable — trusted server-generated HTML only
const highlighted = await highlightCode(code)
<div dangerouslySetInnerHTML={{ __html: highlighted }} />
```

## 2. CSP — Content Security Policies

- Configure Content-Security-Policy headers in `next.config.ts` for production
- Restrict `script-src` to `'self'` — no inline scripts, no `eval`
- Restrict `style-src` to `'self'` and `'unsafe-inline'` (required by Tailwind)
- Restrict `img-src` to `'self'`, `data:`, and explicitly allowed domains
- Restrict `connect-src` to `'self'` and required API domains (e.g., Mapbox APIs)
- Restrict `frame-ancestors` to `'none'` to prevent clickjacking
- Never use `'unsafe-eval'` in any directive

## 3. CORS — Cross-Origin Resource Sharing

- API routes must not set `Access-Control-Allow-Origin: *` unless the endpoint is intentionally public and read-only
- For API routes that proxy external services, validate and restrict the origin
- Never forward user-controlled headers to external APIs without sanitization
- When fetching external APIs from route handlers, do not expose raw external error messages to the client

```typescript
// ✅ Good — generic error to client
return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })

// ❌ Avoid — leaks external API details
return NextResponse.json({ error: externalError.message, stack: externalError.stack }, { status: 500 })
```

## 4. CSRF — Cross-Site Request Forgery

- API routes that mutate data (POST, PUT, DELETE) must validate the `Origin` or `Referer` header
- Use Next.js built-in CSRF protections for Server Actions
- Never perform mutations via GET requests
- For any future forms or actions that modify state, use tokens or same-origin checks

## 5. Secure Authentication

- Never hardcode API keys, tokens, or secrets in source code
- Access tokens must come from environment variables (`process.env`)
- Client-side tokens use `NEXT_PUBLIC_` prefix — never put private secrets in `NEXT_PUBLIC_` variables
- Never log tokens or secrets, even in error handlers
- `.env`, `.env.local`, and credential files must be in `.gitignore`

```typescript
// ✅ Good — from environment variable
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

// ❌ Avoid — hardcoded token
const accessToken = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbG..."
```

## 6. Rate Limiting and Abuse Prevention

- API routes that proxy external services should implement timeouts to prevent hanging requests
- Use `AbortController` with a timeout for all external fetch calls
- For any future public-facing API endpoints, add rate limiting (e.g., via middleware or edge functions)
- Validate and constrain input parameters (query strings, body) — reject unexpected shapes early

```typescript
// ✅ Good — timeout on external fetch
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 5000)

const response = await fetch(url, { signal: controller.signal })
clearTimeout(timeoutId)
```

## Component-Specific Security

- Map components that accept `image` or `src` props: only load from HTTPS URLs
- Never pass user-controlled strings to `new Function()` or CSS `expression()`
- Registry components are installed into user codebases — never include network calls, telemetry, or side effects beyond the component's stated purpose
- `innerHTML` clearing (e.g., `container.innerHTML = ""`) is acceptable only for cleaning up Mapbox-managed DOM containers, not for rendering content
