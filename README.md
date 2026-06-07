# UFA Foundation

Minimalist "coming soon" site for [ufa.foundation](https://ufa.foundation), built with
[Next.js](https://nextjs.org) and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
static export and publishes it to GitHub Pages.

## How it's wired

- `next.config.mjs` sets `output: "export"` for a fully static build.
- `public/CNAME` binds the GitHub Pages site to the `ufa.foundation` apex domain.
- `public/.nojekyll` stops GitHub from stripping the `_next/` asset directory.
- DNS: the apex domain points at GitHub Pages' four A records (and IPv6 AAAA
  records); `www` is a CNAME to `prakshal-jain.github.io`.
