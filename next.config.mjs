/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in `out/` for GitHub Pages.
  output: "export",
  // Apex custom domain (ufa.foundation) serves from root, so no basePath.
  // Static export can't use the Next.js Image Optimization server.
  images: { unoptimized: true },
  // Emit `about/index.html` instead of `about.html` so clean URLs work on Pages.
  trailingSlash: true,
};

export default nextConfig;
