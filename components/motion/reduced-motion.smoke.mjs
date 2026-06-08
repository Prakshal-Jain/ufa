// Dependency-free smoke test (Node's built-in node:test, Node 22+).
// Proves the reduced-motion BASE path is wired into every motion primitive by
// statically asserting each source early-returns a static render under `reduced`.
// This gate runs in CI today without a React test runner; the full RTL behavioral
// suite (components/motion/motion.test.tsx) lands once a runner is added later.
//
// Run: node --test components/motion/reduced-motion.smoke.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const read = (name) => readFileSync(join(here, name), "utf8");

// Each primitive must (a) gate through the single useReducedMotionSafe hook and
// (b) early-return a static/native path when reduced.
const primitives = [
  {
    file: "Reveal.tsx",
    guard: /if \(reduced\) return <>\{children\}<\/>/,
  },
  {
    file: "ScrollParallax.tsx",
    guard: /if \(reduced\) return <div>\{children\}<\/div>/,
  },
  {
    file: "SmoothScroll.tsx",
    guard: /if \(reduced\) return/,
  },
];

for (const { file, guard } of primitives) {
  test(`${file}: gates through useReducedMotionSafe`, () => {
    const src = read(file);
    assert.match(
      src,
      /useReducedMotionSafe/,
      `${file} must call the centralized useReducedMotionSafe gate`,
    );
  });

  test(`${file}: reduced motion is the base path (early-return)`, () => {
    const src = read(file);
    assert.match(
      src,
      guard,
      `${file} must early-return a static/native path when reduced`,
    );
  });
}

// Reveal animates transform/opacity only — never layout-shifting properties.
test("ScrollParallax.tsx: no layout-shifting animated properties", () => {
  const src = read("ScrollParallax.tsx");
  assert.doesNotMatch(
    src,
    /(^|[^-])(top|left|width|height|margin)\s*:/m,
    "ScrollParallax must not animate top/left/width/height/margin",
  );
});
