/**
 * Reduced-motion base-path spec for the motion primitives.
 *
 * NOTE: No test runner (Vitest / React Testing Library) is configured yet — that
 * is intentionally OUT OF SCOPE for plan 01-03 (no package.json changes here).
 * These describe/it blocks document the behavior contract that the full RTL suite
 * will assert once a runner is added in a later phase. They are NOT executed by
 * CI today.
 *
 * The ENFORCED, dependency-free gate that runs today lives in
 * `components/motion/reduced-motion.smoke.mjs` (Node's built-in `node:test`),
 * which statically proves each primitive contains a reduced-motion early-return
 * branch — i.e. reduced motion is the BASE path, not an enhancement.
 *
 * Pseudo-spec (illustrative — requires RTL + a jsdom matchMedia mock):
 *
 *   describe("Reveal (reduced motion is the base path)", () => {
 *     it("renders children fully visible with no motion props when reduced", () => {
 *       // mock useReducedMotionSafe -> true
 *       // render(<Reveal>hello</Reveal>)
 *       // expect screen.getByText("hello") to be in the document, visible
 *       // expect no `initial`/`whileInView`/`transition` motion attributes
 *     });
 *   });
 *
 *   describe("ScrollParallax (reduced motion is the base path)", () => {
 *     it("renders children with no transform / no scroll listener when reduced", () => {
 *       // mock useReducedMotionSafe -> true
 *       // expect a plain <div> wrapper, no style.y / transform
 *     });
 *   });
 *
 *   describe("SmoothScroll (reduced motion is the base path)", () => {
 *     it("does not instantiate Lenis when reduced", () => {
 *       // mock useReducedMotionSafe -> true
 *       // spy on Lenis constructor; expect 0 calls; native scroll preserved
 *     });
 *   });
 *
 *   describe("CTAButton (keyboard reachable)", () => {
 *     it("renders an <a> with href, else a <button>, and is focusable", () => {
 *       // expect tabbable real interactive element with accessible name
 *     });
 *   });
 */

export {};
