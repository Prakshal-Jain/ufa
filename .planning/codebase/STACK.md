# Technology Stack

**Analysis Date:** 2026-06-08

## Languages

**Primary:**
- TypeScript 5.x - All source code (`app/page.tsx`, `app/layout.tsx`)
- CSS 3 - Styling (`app/globals.css`)

**Secondary:**
- JavaScript - Build configuration and tooling (`next.config.mjs`)

## Runtime

**Environment:**
- Node.js (version not explicitly specified in package.json, inferred from Next.js 16.x compatibility)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.2.7 - Full-stack React framework for server-side rendering and static generation
- React 19.1.0 - UI component library
- React DOM 19.1.0 - DOM rendering for React components

**Testing:**
- Not detected

**Build/Dev:**
- Next.js built-in build system
- TypeScript compiler for type checking

## Key Dependencies

**Critical:**
- next@^16.2.7 - React framework providing routing, SSR, static export, and development server
- react@19.1.0 - React library for component-based UI
- react-dom@19.1.0 - React rendering engine

**Dev Dependencies:**
- @types/node@^22 - TypeScript definitions for Node.js APIs
- @types/react@^19 - TypeScript definitions for React
- @types/react-dom@^19 - TypeScript definitions for React DOM
- typescript@^5 - TypeScript compiler

## Configuration

**Environment:**
- No external environment variables required for static build
- Gitignore entries: `.env*.local` (local environment files ignored)

**Build:**
- `next.config.mjs` - Next.js configuration
  - Output mode: Static export to `out/` directory for GitHub Pages deployment
  - Image optimization: Disabled (`unoptimized: true`)
  - Trailing slashes: Enabled for clean URLs on static hosting
  - Apex domain: `ufa.foundation` with no basePath
- `tsconfig.json` - TypeScript configuration
  - Target: ES2017
  - Module: esnext with bundler resolution
  - Strict mode enabled
  - Path alias: `@/*` maps to project root
  - JSX: react-jsx for modern React

## Platform Requirements

**Development:**
- Node.js runtime
- npm package manager
- Unix-like environment (macOS, Linux) or Windows with WSL

**Production:**
- Static hosting capable of serving HTML/CSS/JS files (e.g., GitHub Pages, Netlify, Vercel, S3)
- No server runtime required (fully static export)
- Apex domain DNS configuration for `ufa.foundation`

---

*Stack analysis: 2026-06-08*
