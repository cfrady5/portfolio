# Project screenshots

Drop real project screenshots here, then reference their paths to replace the
placeholder browser-window mockups.

## Two ways to add a screenshot

**1. Local data (no Supabase yet)** — edit `src/data/projects.ts`, find the
project, and set a `screenshots` entry's `image_url` to e.g.
`/projects/thoy-lawncare-1.png`. Then pass it through in the relevant component
(`ProjectMockup` already accepts an `imageUrl` prop).

**2. Supabase** — insert rows into the `project_screenshots` table with the
`image_url` pointing at a public Storage URL or a path under `/public/projects`.

## Suggested naming

`<slug>-1.png`, `<slug>-2.png`, … (e.g. `frames-by-frady-1.png`). Use the same
slug as the project so it's easy to find.

Recommended size: ~1600×1000 (16:10) for crisp cards and case-study heroes.
