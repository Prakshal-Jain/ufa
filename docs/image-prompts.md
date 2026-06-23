# UFA — Image Generation Prompts

Two images for the website. Realistic documentary event photography, not futuristic, not AI-looking.

**Shared style (already baked into each prompt below):** realistic candid event photography, shot on a full-frame camera with a prime lens, natural and stage lighting, photojournalistic and editorial, true-to-life skin and fabric, dark venue with red stage lighting as the accent (`#ff3636`). Not futuristic, no robots, no holograms, no sci-fi, no CGI, no 3D render, no illustration, no AI look. No watermarks.

---

## Image 1 — Hero (behind the "UFA" wordmark)

Real and atmospheric, top kept dark for the logo.

A real photograph inside a dark San Francisco event hall at night. A crowd of young founders and engineers, seen from behind and partly in silhouette, watching a stage and a glowing screen. Red stage lighting washes the room, soft haze catches the light beams, the feeling of a sold-out, high-energy night. Candid and cinematic but completely real, shot on a full-frame camera with a 35mm lens, shallow depth of field, natural film grain. The upper third of the frame is dark and uncluttered. Deep near-black shadows with a dominant red #ff3636 accent from the lights. Not futuristic, no robots, no holograms, no CGI, no illustration. No readable text, no watermarks. 16:9, moody, realistic.

Output: 16:9, at least 2560px wide

---

## Image 2 — Sponsors / "Benefits for sponsors"

The SPONSOR t-shirt in frame, at a real event.

```
A realistic candid photograph at a live tech event at night. In the foreground, a person stands with their back to the camera, wearing a black t-shirt with the word "SPONSOR" printed large across the upper back and a smaller "UFA" wordmark beneath it. They are watching a stage and a large screen, softly out of focus behind them, where a crowd of builders is gathered under red stage lighting. Editorial event photography, shot on a full-frame camera with an 85mm lens, shallow depth of field, the shirt and back sharp and the background gently blurred. Natural realistic fabric and skin. Dark room with a dominant red #ff3636 accent. Not futuristic, no robots, no holograms, no CGI, no illustration. Clean realistic printed text on the shirt, no other text, no watermarks. 16:9.
```

**Output:** 16:9, at least 2000px wide. Save as `public/media/sponsors.jpg`.

---



## Notes

- AI generators often garble printed text, so "SPONSOR" and the "UFA" wordmark on the shirt may come out wrong. Either use a model that is strong at short text, or generate the shirt plain and have the text overlaid cleanly in post, since the logo is simple type.
- When the files are ready, drop them at the paths above. They get converted to WebP, placed, and the hero gets a dark gradient so the white text stays sharp.
