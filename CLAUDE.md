<!-- GSD:project-start source:PROJECT.md -->
## Project

**Ultimate Agent Fight (UFA)**

A single, cinematic landing page for **Ultimate Agent Fight** — a live competition where AI agents interrogate and fight each other to win credits and money. The site lives at **ufa.foundation** and exists to make sponsors, companies, SF hackers, and investors feel that this is the coolest thing happening in AI right now, and to get them to reach out / sponsor. It replaces the current minimalist "Coming Soon" placeholder.

**Core Value:** A first-time visitor on a phone is hit with a "holy shit, I need to be part of this" feeling within the first screen — and knows exactly how to get in touch / sponsor.

### Constraints

- **Tech stack**: Next.js static export (`output: "export"`) — required to host free on GitHub Pages. No server runtime.
- **Hosting**: GitHub Pages, apex domain `ufa.foundation`. Build artifact must keep `CNAME` + `.nojekyll`.
- **Performance**: Mobile-first; motion must stay ~60fps on phones; honor `prefers-reduced-motion`.
- **Design**: Cinematic sci-fi aesthetic (deep gradients, iridescent/holographic accents, large cinematic type, depth/parallax). Executed "bold but performant" — rich scroll motion + light WebGL accent, NOT maximal-everywhere.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.x - All source code (`app/page.tsx`, `app/layout.tsx`)
- CSS 3 - Styling (`app/globals.css`)
- JavaScript - Build configuration and tooling (`next.config.mjs`)
## Runtime
- Node.js (version not explicitly specified in package.json, inferred from Next.js 16.x compatibility)
- npm
- Lockfile: `package-lock.json` (present)
## Frameworks
- Next.js 16.2.7 - Full-stack React framework for server-side rendering and static generation
- React 19.1.0 - UI component library
- React DOM 19.1.0 - DOM rendering for React components
- Not detected
- Next.js built-in build system
- TypeScript compiler for type checking
## Key Dependencies
- next@^16.2.7 - React framework providing routing, SSR, static export, and development server
- react@19.1.0 - React library for component-based UI
- react-dom@19.1.0 - React rendering engine
- @types/node@^22 - TypeScript definitions for Node.js APIs
- @types/react@^19 - TypeScript definitions for React
- @types/react-dom@^19 - TypeScript definitions for React DOM
- typescript@^5 - TypeScript compiler
## Configuration
- No external environment variables required for static build
- Gitignore entries: `.env*.local` (local environment files ignored)
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
## Platform Requirements
- Node.js runtime
- npm package manager
- Unix-like environment (macOS, Linux) or Windows with WSL
- Static hosting capable of serving HTML/CSS/JS files (e.g., GitHub Pages, Netlify, Vercel, S3)
- No server runtime required (fully static export)
- Apex domain DNS configuration for `ufa.foundation`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Use `.tsx` extension for React components: `app/page.tsx`, `app/layout.tsx`
- Use `.css` extension for stylesheets: `app/globals.css`
- Use kebab-case for CSS class names: `.wordmark`, `.tagline`, `.screen`, `.content`
- Use camelCase for React component functions: `Home()`, `RootLayout()`
- React components are named using PascalCase despite the function expression format: `export default function Home()`
- Use camelCase for CSS variable declarations (custom properties): `--bg`, `--fg`, `--muted`, `--rule`
- Descriptive names reflecting visual purpose: `--bg` (background), `--fg` (foreground), `--muted` (secondary text color)
- Use TypeScript's `type` keyword for type definitions: `type { Metadata } from "next"`
- Inline prop types for components using object syntax:
## Code Style
- No explicit formatter configuration (Prettier, ESLint, or Biome not configured in this codebase)
- Code follows standard Next.js and React conventions as enforced by the `next lint` command
- Indentation: 2 spaces (consistent across TypeScript and CSS)
- Line length: No strict enforced limit detected
- Framework: `next lint` (built-in Next.js ESLint wrapper)
- Run with: `npm run lint`
- Uses Next.js built-in ESLint configuration by default
- No custom `.eslintrc` file present
## Import Organization
- Configured in `tsconfig.json`: `"@/*": ["./*"]`
- Available for absolute imports from project root
- Not currently used in the codebase (minimal project)
## Error Handling
- No error handling code observed in the current minimal codebase
- The project is a static coming-soon site with no dynamic data flow
- No try-catch blocks or error boundaries detected
## Logging
- No console logging observed in application code
- No logging configuration file present
- Recommended approach when needed: Use `console.log()`, `console.warn()`, `console.error()` in browser context or server-side code
## Comments
- Configuration files include descriptive comments explaining intent: `next.config.mjs` includes comments explaining `output: "export"` and image optimization settings
- CSS comments used to explain specific design decisions: `/* optically balance the letter-spacing */` in `app/globals.css`
- Not observed in the minimal codebase
- No type annotations beyond TypeScript's inline type syntax
## Function Design
- `Home()` component: 12 lines total, single responsibility
- `RootLayout()` component: 27 lines total, handles root HTML structure and metadata
- Use destructuring for prop parameters: `{ children: React.ReactNode }`
- Clear parameter typing with TypeScript
- React components return JSX.Element (implicit)
- Exported components use `export default`
## Module Design
- Use `export default` for React components
- Use `export const` for metadata exports: `export const metadata: Metadata = {...}`
- Not used in the current minimal codebase
- As project grows, consider creating barrel files (index.ts) in feature directories
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Single-page coming-soon landing page
- Fully static export with no server-side rendering
- Minimalist approach with zero dynamic routing or data fetching
- Deployed as static HTML to GitHub Pages with custom domain
- Responsive design with CSS animations
## Layers
- Purpose: Render the user-visible interface
- Location: `app/page.tsx`, `app/globals.css`
- Contains: React Server Component for home page, global styles with CSS custom properties
- Depends on: React, Next.js layout system
- Used by: Browser rendering
- Purpose: Establish root HTML structure and metadata
- Location: `app/layout.tsx`
- Contains: Root layout component with SEO metadata (title, description, Open Graph tags)
- Depends on: Next.js Metadata API, React
- Used by: All pages (currently just home page)
- Purpose: Define visual design system and component styles
- Location: `app/globals.css`
- Contains: CSS custom properties (--bg, --fg, --muted, --rule), reset styles, utility classes (.screen, .content, .wordmark, .tagline, .rule, .soon), animations (@keyframes rise)
- Depends on: CSS3, media queries
- Used by: All HTML elements in the page
## Data Flow
- None: Site contains no dynamic state, interactive components, or client-side logic
- All rendering is static at build time
- No use of React hooks or state management libraries
## Key Abstractions
- Purpose: Establish consistent HTML structure and SEO metadata
- Files: `app/layout.tsx`
- Pattern: Root layout component using Next.js Metadata API; provides metadata object to Next.js and HTML wrapper structure
- Purpose: Render the home page content
- Files: `app/page.tsx`
- Pattern: Default export Server Component with semantic HTML markup and CSS classes for styling
- Purpose: System-wide design tokens and component styles
- Files: `app/globals.css`
- Pattern: Global CSS with CSS custom properties for theming, utility classes using semantic naming (.screen, .content), animations defined with @keyframes
## Entry Points
- Location: `app/page.tsx`
- Triggers: HTTP GET request to `/` (root)
- Responsibilities: Render the landing page with brand name, tagline, divider, and "Coming soon" message
- Location: `app/layout.tsx`
- Triggers: Automatically applied by Next.js App Router to all pages
- Responsibilities: Establish HTML document structure, set page title and meta tags, link global styles, define language
## Error Handling
- No dynamic error boundaries needed
- 404 page automatically generated by Next.js static export (fallback at `out/404/index.html`)
- Graceful degradation: CSS animations respect `prefers-reduced-motion` media query
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
