# Swing Type

A row of enormous coloured letters swings back and forth past a fixed window on a white field, each letter turning on its own vertical axis as it travels — squashed to a thin sliver at the sides, full face in the middle. Only two or three letters are ever readable at once, and the whole word never assembles. That's the point: every few seconds it quietly becomes a different word, and the letters change by turning, not by cutting.

## Why

The whole effect comes out of one line of geometry: a letter's rotation is its distance from the frame centre divided by a constant. The row only ever translates — everything else (squash, spacing, where a letter culls) falls out of that single relation, not from a second clock or per-letter state.

The interesting engineering is in what looks like it should be a shortcut and isn't. The obvious way to change a word is to swap a letter's glyph while it's culled, since a letter past edge-on isn't drawn. It doesn't work at this pitch: the two slots either side of centre sit a full pitch apart while the cull is only 90 degrees, so they're never both hidden at the same instant. Whichever slot takes the new word first stands next to one that hasn't, and the row spells neither word — checked by search across slot orderings, cue phases, and swap instants, not by eye. So the letter that's changing gets driven to edge-on and back on purpose, and its glyph swaps at the midpoint of that dedicated turn.

## How it works

- **The swing amplitude is derived from the letter count**, not declared — it's exactly half the word's angular width, which lands an end letter dead centre at both extremes. A hardcoded amplitude would strand a shorter word squashed and alone for a third of the loop.
- **A detent warps the phase** so it crawls wherever a letter is square-on rather than lingering only at the two extremes the way a plain sine does. It's derived from the pitch and is exactly zero at every extreme, so the swing still lands precisely on the derived amplitude.
- **The lean is an in-plane rotation, not a shear** — a letter's width axis and height axis tilt in opposite senses as it turns, the way a real object turning in space would. A symmetric shear was the obvious first guess and reads as flat squashing instead of something turning.
- **Two weights, cross-faded.** The squash takes the stem down with it, so a bold letter would thin to a hairline exactly where it's moving fastest. Each letter is rasterised at a regular and a heavy cut, sharing the regular cut's metrics so they stay registered, and the heavy cut fades in as the letter turns edge-on.
- **Drawn far to near** — sorted by absolute angle before drawing, so an edge-on sliver never paints over the square-on letter beside it.

## Stack

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS v4
- **Rendering:** a single `<canvas>` and the 2D context — one cached glyph bitmap per letter, one `setTransform` + `drawImage` per visible letter per frame. No WebGL, no perspective, no per-frame glyph rasterisation.
- **Font:** [Archivo](https://fonts.google.com/specimen/Archivo) at 600 and 800 — a heavy grotesque, matching the "real bold, not a regular" the piece calls for

The animation (`src/components/swing-type/`) doesn't import React or Next — `engine.ts` is a plain class over a canvas element, `params.ts` holds the tuning constants and the word list, and `swing-type-card.tsx` is the thin wrapper that mounts it and watches for visibility, reduced-motion, and route transitions. There's no pointer interaction anywhere — the piece is a loop you watch, not a thing you steer.

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
