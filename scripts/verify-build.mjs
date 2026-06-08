// verify-build.mjs — post-build integrity check for the GitHub Pages static export.
// Confirms the build emitted the load-bearing host files and that Tailwind is active.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");

const errors = [];

function require(path, label) {
  if (!existsSync(join(out, path))) errors.push(`missing ${label}: out/${path}`);
}

// 1. GitHub Pages host files must survive into out/ (CNAME for the apex domain,
//    .nojekyll so Pages does not Jekyll-process the _next directory).
require("CNAME", "GitHub Pages domain file");
require(".nojekyll", "Jekyll-disable file");

// 2. The home page must still render.
require("index.html", "home page");

// 3. Tailwind v4 must be active — hashed CSS should exist under _next/static.
function hasHashedCss(dir) {
  if (!existsSync(dir)) return false;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (hasHashedCss(full)) return true;
    } else if (entry.endsWith(".css")) {
      return true;
    }
  }
  return false;
}

if (!hasHashedCss(join(out, "_next", "static"))) {
  errors.push("no hashed CSS emitted under out/_next/static (Tailwind not active?)");
}

if (errors.length > 0) {
  console.error("verify-build FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log("verify-build OK: CNAME + .nojekyll + index.html present, Tailwind CSS emitted.");
