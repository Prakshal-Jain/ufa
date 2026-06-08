# Coding Conventions

**Analysis Date:** 2026-06-08

## Naming Patterns

**Files:**
- Use `.tsx` extension for React components: `app/page.tsx`, `app/layout.tsx`
- Use `.css` extension for stylesheets: `app/globals.css`
- Use kebab-case for CSS class names: `.wordmark`, `.tagline`, `.screen`, `.content`

**Functions:**
- Use camelCase for React component functions: `Home()`, `RootLayout()`
- React components are named using PascalCase despite the function expression format: `export default function Home()`

**Variables:**
- Use camelCase for CSS variable declarations (custom properties): `--bg`, `--fg`, `--muted`, `--rule`
- Descriptive names reflecting visual purpose: `--bg` (background), `--fg` (foreground), `--muted` (secondary text color)

**Types:**
- Use TypeScript's `type` keyword for type definitions: `type { Metadata } from "next"`
- Inline prop types for components using object syntax:
  ```typescript
  {
    children: React.ReactNode;
  }
  ```

## Code Style

**Formatting:**
- No explicit formatter configuration (Prettier, ESLint, or Biome not configured in this codebase)
- Code follows standard Next.js and React conventions as enforced by the `next lint` command
- Indentation: 2 spaces (consistent across TypeScript and CSS)
- Line length: No strict enforced limit detected

**Linting:**
- Framework: `next lint` (built-in Next.js ESLint wrapper)
- Run with: `npm run lint`
- Uses Next.js built-in ESLint configuration by default
- No custom `.eslintrc` file present

## Import Organization

**Order:**
1. Next.js framework imports (`import type { Metadata } from "next"`)
2. Third-party library imports
3. Relative imports (CSS stylesheets): `import "./globals.css"`

**Path Aliases:**
- Configured in `tsconfig.json`: `"@/*": ["./*"]`
- Available for absolute imports from project root
- Not currently used in the codebase (minimal project)

## Error Handling

**Patterns:**
- No error handling code observed in the current minimal codebase
- The project is a static coming-soon site with no dynamic data flow
- No try-catch blocks or error boundaries detected

## Logging

**Framework:** No logging framework present

**Patterns:**
- No console logging observed in application code
- No logging configuration file present
- Recommended approach when needed: Use `console.log()`, `console.warn()`, `console.error()` in browser context or server-side code

## Comments

**When to Comment:**
- Configuration files include descriptive comments explaining intent: `next.config.mjs` includes comments explaining `output: "export"` and image optimization settings
- CSS comments used to explain specific design decisions: `/* optically balance the letter-spacing */` in `app/globals.css`

**JSDoc/TSDoc:**
- Not observed in the minimal codebase
- No type annotations beyond TypeScript's inline type syntax

## Function Design

**Size:** Functions are compact and focused:
- `Home()` component: 12 lines total, single responsibility
- `RootLayout()` component: 27 lines total, handles root HTML structure and metadata

**Parameters:** 
- Use destructuring for prop parameters: `{ children: React.ReactNode }`
- Clear parameter typing with TypeScript

**Return Values:**
- React components return JSX.Element (implicit)
- Exported components use `export default`

## Module Design

**Exports:**
- Use `export default` for React components
- Use `export const` for metadata exports: `export const metadata: Metadata = {...}`

**Barrel Files:**
- Not used in the current minimal codebase
- As project grows, consider creating barrel files (index.ts) in feature directories

---

*Convention analysis: 2026-06-08*
