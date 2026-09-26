"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SPRITES, type SpriteName } from "@/components/Invader";

// Hidden arcade. Opens on the Konami code or when someone shoots down the saucer
// (any element that dispatches the `ufa:invade` window event). Esc closes it.
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const W = 224;
const H = 256;
const ROWS: SpriteName[] = ["squid", "crab", "crab", "octopus", "octopus"];
const POINTS: Record<string, number> = { squid: 30, crab: 20, octopus: 10 };
const COLS = 8;

type Alien = { x: number; y: number; kind: SpriteName; alive: boolean };
type Shot = { x: number; y: number };

function drawSprite(ctx: CanvasRenderingContext2D, rows: readonly string[], x: number, y: number, color: string) {
  ctx.fillStyle = color;
  rows.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++) if (row[rx] === "X") ctx.fillRect(Math.round(x) + rx, Math.round(y) + ry, 1, 1);
  });
}

function readHi() {
  try {
    return Number(localStorage.getItem("ufa-invaders-hi") || 0);
  } catch {
    return 0;
  }
}
function writeHi(n: number) {
  try {
    localStorage.setItem("ufa-invaders-hi", String(n));
  } catch {}
}

export function InvaderGame() {
  const [open, setOpen] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});

  const close = useCallback(() => setOpen(false), []);

  // Triggers: Konami code and the `ufa:invade` event.
  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seq = [...seq, k].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        setOpen(true);
      }
    };
    const onInvade = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ufa:invade", onInvade);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ufa:invade", onInvade);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    let aliens: Alien[] = [];
    let dir = 1;
    let stepMs = 700;
    let lastStep = 0;
    let frame = 0;
    let wave = 1;
    let player = W / 2 - 5;
    let shot: Shot | null = null;
    let bombs: Shot[] = [];
    let score = 0;
    let lives = 3;
    let hi = readHi();
    let over = false;
    let flash = 0;
    let raf = 0;

    const spawn = () => {
      aliens = [];
      ROWS.forEach((kind, r) => {
        for (let c = 0; c < COLS; c++) aliens.push({ x: 24 + c * 20, y: 40 + r * 16 + Math.min(wave - 1, 4) * 6, kind, alive: true });
      });
      dir = 1;
      stepMs = Math.max(160, 700 - (wave - 1) * 90);
    };
    const reset = () => {
      wave = 1;
      score = 0;
      lives = 3;
      over = false;
      bombs = [];
      shot = null;
      spawn();
    };
    reset();

    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (["ArrowLeft", "ArrowRight", " ", "a", "d", "Enter"].includes(e.key)) e.preventDefault();
      keys.current[e.key] = true;
      if (over && e.key === "Enter") reset();
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    const tick = (t: number) => {
      const k = keys.current;
      if (!over) {
        if (k.ArrowLeft || k.a || k.left) player = Math.max(4, player - 1.6);
        if (k.ArrowRight || k.d || k.right) player = Math.min(W - 15, player + 1.6);
        if ((k[" "] || k.fire) && !shot) shot = { x: player + 5, y: H - 30 };

        if (shot) {
          shot.y -= 4;
          if (shot.y < 16) shot = null;
        }

        // March.
        if (t - lastStep > stepMs) {
          lastStep = t;
          frame ^= 1;
          const live = aliens.filter((a) => a.alive);
          const edge = live.some((a) => (dir > 0 ? a.x + 14 >= W - 4 : a.x <= 4));
          if (edge) {
            dir = -dir;
            live.forEach((a) => (a.y += 6));
          } else live.forEach((a) => (a.x += 3 * dir));
          stepMs = Math.max(90, stepMs - 4);
          // Bombs come from the lowest alien in a random column.
          if (live.length && Math.random() < 0.55) {
            const shooter = live[Math.floor(Math.random() * live.length)];
            const lowest = live.filter((a) => Math.abs(a.x - shooter.x) < 4).sort((a, b) => b.y - a.y)[0];
            bombs.push({ x: lowest.x + 6, y: lowest.y + 8 });
          }
          if (live.some((a) => a.y + 8 >= H - 34)) lives = 0;
        }

        // Hits.
        if (shot) {
          const s = shot;
          const hit = aliens.find((a) => a.alive && s.x >= a.x && s.x <= a.x + 12 && s.y >= a.y && s.y <= a.y + 8);
          if (hit) {
            hit.alive = false;
            score += POINTS[hit.kind] ?? 10;
            shot = null;
          }
        }
        bombs.forEach((b) => (b.y += 1.8));
        bombs = bombs.filter((b) => {
          if (b.y > H - 30 && b.y < H - 22 && b.x >= player && b.x <= player + 11) {
            lives -= 1;
            flash = 20;
            return false;
          }
          return b.y < H - 16;
        });

        if (!aliens.some((a) => a.alive)) {
          wave += 1;
          bombs = [];
          spawn();
        }
        if (lives <= 0) {
          over = true;
          if (score > hi) {
            hi = score;
            writeHi(hi);
          }
        }
      }

      // Draw.
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#f7f7f4";
      ctx.font = "8px ui-monospace, monospace";
      ctx.fillText(`SCORE ${String(score).padStart(4, "0")}`, 8, 12);
      ctx.fillText(`HI ${String(Math.max(hi, score)).padStart(4, "0")}`, W / 2 - 18, 12);
      ctx.fillText(`WAVE ${wave}`, W - 44, 12);
      aliens.forEach((a) => a.alive && drawSprite(ctx, SPRITES[a.kind][frame], a.x, a.y, "#f7f7f4"));
      if (!over && (flash-- <= 0 || flash % 4 < 2)) drawSprite(ctx, SPRITES.ship[0], player, H - 30, "#ff3636");
      if (shot) {
        ctx.fillStyle = "#ff3636";
        ctx.fillRect(shot.x, shot.y, 1, 4);
      }
      ctx.fillStyle = "#f7f7f4";
      bombs.forEach((b) => ctx.fillRect(b.x, b.y, 1, 4));
      ctx.fillStyle = "#ff3636";
      ctx.fillRect(0, H - 14, W, 1);
      for (let i = 0; i < lives; i++) drawSprite(ctx, SPRITES.ship[0], 8 + i * 14, H - 10, "#ff3636");
      ctx.fillStyle = "#6e6e6a";
      ctx.fillText("UFA ARCADE", W - 52, H - 4);
      if (over) {
        ctx.fillStyle = "#ff3636";
        ctx.font = "bold 16px ui-monospace, monospace";
        ctx.fillText("GAME OVER", W / 2 - 40, H / 2 - 4);
        ctx.fillStyle = "#f7f7f4";
        ctx.font = "8px ui-monospace, monospace";
        ctx.fillText("ENTER TO RETRY  ·  ESC TO LEAVE", W / 2 - 66, H / 2 + 12);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      keys.current = {};
    };
  }, [open, close]);

  if (!open) return null;

  const hold = (k: string) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      keys.current[k] = true;
    },
    onPointerUp: () => (keys.current[k] = false),
    onPointerLeave: () => (keys.current[k] = false),
    onPointerCancel: () => (keys.current[k] = false),
  });

  return (
    <div className="arcade" role="dialog" aria-modal="true" aria-label="UFA Arcade: Space Invaders" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="arcade-cab">
        <div className="arcade-top">
          <span>You found the arcade</span>
          <button className="arcade-x" onClick={close} aria-label="Close the arcade">ESC</button>
        </div>
        <canvas ref={canvas} width={W} height={H} className="arcade-screen" />
        <p className="arcade-help">← → to move · Space to fire. JEV decides in about the time one frame takes. How fast are you?</p>
        <div className="arcade-pad">
          <button {...hold("left")} aria-label="Move left">◀</button>
          <button {...hold("fire")} aria-label="Fire">FIRE</button>
          <button {...hold("right")} aria-label="Move right">▶</button>
        </div>
      </div>
    </div>
  );
}
