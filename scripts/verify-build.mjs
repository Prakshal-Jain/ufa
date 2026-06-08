// verify-build.mjs — post-build integrity guard for the GitHub Pages static export.
// Fails the build (non-zero exit) if the load-bearing host files are missing, if
// next.config.mjs introduces a non-empty basePath/assetPrefix (which would break
// asset resolution at the apex root), or if Tailwind CSS did not ship. Zero external
// deps: only node: builtins so it runs anywhere `node` does.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// 1. Resolve project root relative to THIS script (scripts/verify-build.mjs -> repo root),
//    so the guard is robust regardless of the working directory it is invoked from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, "..");
const out = join(root, "out");

const errors = [];

function fail(msg) {
  errors.push(msg);
}

// 2. CNAME must exist AND name the apex domain, or GitHub Pages drops the custom domain.
const cnamePath = join(out, "CNAME");
if (!existsSync(cnamePath)) {
  fail('out/CNAME missing — ensure public/CNAME exists and is copied by the build (expected "ufa.foundation")');
} else {
  const cname = readFileSync(cnamePath, "utf8").trim();
  if (cname !== "ufa.foundation") {
    fail(`out/CNAME content is "${cname}" but must be exactly "ufa.foundation" — fix public/CNAME`);
  }
}

// 3. .nojekyll must exist or Pages will Jekyll-process and 404 the _next/ directory.
if (!existsSync(join(out, ".nojekyll"))) {
  fail("out/.nojekyll missing — ensure public/.nojekyll exists and is copied by the build");
}

// 4. next.config.mjs must NOT set a non-empty basePath/assetPrefix. The apex domain serves
//    from root; a non-empty value here would break every asset/link silently. Absent key or
//    empty-string value both pass.
const configPath = join(root, "next.config.mjs");
if (!existsSync(configPath)) {
  fail("next.config.mjs missing — cannot verify basePath/assetPrefix are empty");
} else {
  const config = readFileSync(configPath, "utf8");
  for (const key of ["basePath", "assetPrefix"]) {
    const m = config.match(new RegExp(`${key}\\s*:\\s*(["'])(.*?)\\1`));
    if (m && m[2].length > 0) {
      fail(`next.config.mjs sets a non-empty ${key} ("${m[2]}") — the apex domain serves from root; remove ${key} or set it to ""`);
    }
  }
}

// 5. The home page must still render.
if (!existsSync(join(out, "index.html"))) {
  fail("out/index.html missing — the home page did not export");
}

// 6. Tailwind/CSS must have shipped — at least one hashed .css under out/_next/static.
function hasCss(dir) {
  if (!existsSync(dir)) return false;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (hasCss(full)) return true;
    } else if (entry.endsWith(".css")) {
      return true;
    }
  }
  return false;
}

if (!hasCss(join(out, "_next", "static"))) {
  fail("no .css emitted under out/_next/static — Tailwind/CSS did not ship (check globals.css import)");
}

if (errors.length > 0) {
  console.error("verify-build FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log("verify-build: OK");
