# Codebase Structure

**Analysis Date:** 2026-06-08

## Directory Layout

```
ufa/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout with metadata and HTML structure
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles and design tokens
├── public/                 # Static assets served at root
│   ├── CNAME              # Custom domain configuration for GitHub Pages
│   └── .nojekyll          # Disables Jekyll processing on GitHub Pages
├── .github/               # GitHub configuration
│   └── workflows/         # CI/CD workflows (if any)
├── .planning/             # Planning and documentation
│   └── codebase/          # Codebase analysis documents
├── out/                   # Static site export (generated, committed for Pages)
├── .next/                 # Next.js build artifacts (generated, not committed)
├── node_modules/          # Dependencies (generated, not committed)
├── next.config.mjs        # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lockfile
├── README.md              # Project documentation
├── .gitignore             # Git exclusions
└── next-env.d.ts          # Next.js TypeScript definitions (generated)
```

## Directory Purposes

**app/:**
- Purpose: Contains all application routes and pages using Next.js App Router
- Contains: Layout components, page components, styles
- Key files: `layout.tsx` (root wrapper), `page.tsx` (home route)

**public/:**
- Purpose: Static assets served from root of the domain
- Contains: GitHub Pages configuration files
- Key files: `CNAME` (custom domain), `.nojekyll` (disable Jekyll)

**.planning/codebase/:**
- Purpose: Codebase analysis and architecture documentation
- Contains: ARCHITECTURE.md, STRUCTURE.md, and other analysis documents
- Key files: Strategic reference for future development

**.next/:**
- Purpose: Next.js build artifacts and development cache
- Generated: Yes (by `next dev` and `next build`)
- Committed: No

**out/:**
- Purpose: Static export output for GitHub Pages deployment
- Generated: Yes (by `next build` with `output: "export"`)
- Committed: Yes (required for GitHub Pages static hosting)

## Key File Locations

**Entry Points:**
- `app/page.tsx`: Home page route (` /`)
- `app/layout.tsx`: Root HTML document wrapper

**Configuration:**
- `tsconfig.json`: TypeScript compiler settings with path alias `@/*` mapping to project root
- `next.config.mjs`: Next.js configuration with static export settings
- `package.json`: Dependencies (Next.js, React) and npm scripts

**Styling:**
- `app/globals.css`: All styles, CSS custom properties, animations

**Metadata:**
- `app/layout.tsx`: SEO metadata (title, description, OpenGraph tags)

## Naming Conventions

**Files:**
- React Components: PascalCase `.tsx` files (e.g., `layout.tsx`, `page.tsx`)
- Styles: kebab-case `.css` files (e.g., `globals.css`)
- Configuration: lowercase with `.mjs`, `.json`, or no extension (e.g., `next.config.mjs`, `tsconfig.json`)

**Directories:**
- App routes: lowercase directory names match URL segments (e.g., `app/` for root)
- Configuration: lowercase dot-prefixed directories (e.g., `.next/`, `.github/`)

**Selectors & Classes:**
- CSS classes: lowercase dot-notation (e.g., `.screen`, `.content`, `.wordmark`)
- CSS custom properties: kebab-case with double-dash prefix (e.g., `--bg`, `--fg`, `--muted`)

## Where to Add New Code

**New Route/Page:**
- File: `app/[route-name]/page.tsx`
- Pattern: Default export React Server Component
- Layout: Automatically wrapped by `app/layout.tsx`

**New Styles (global):**
- File: Add selectors to `app/globals.css`
- Pattern: Use `.className { }` syntax; reference CSS custom properties for colors

**New Styles (scoped):**
- Not currently used; if needed, create `.module.css` alongside component and import as module

**Utilities or Helpers:**
- Location: Create `lib/` or `utils/` directory at project root or within `app/`
- Pattern: Export functions; import with `@/lib/` or relative path

**Configuration or Constants:**
- Location: Create `config/constants.ts` or place at top of relevant file
- Pattern: Named exports, TypeScript for type safety

## Special Directories

**.github/:**
- Purpose: GitHub-specific configuration
- Generated: No
- Committed: Yes

**.planning/:**
- Purpose: GSD planning documents and codebase analysis
- Generated: No (created manually by planning tools)
- Committed: Yes

**.next/:**
- Purpose: Next.js development and build cache
- Generated: Yes (created by `next dev` and `next build`)
- Committed: No (in `.gitignore`)

**out/:**
- Purpose: Static export output for GitHub Pages
- Generated: Yes (created by `next build` with `output: "export"`)
- Committed: Yes (required for GitHub Pages to serve)

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (created by `npm install`)
- Committed: No (in `.gitignore`)

---

*Structure analysis: 2026-06-08*
