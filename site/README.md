# The site

boom's site at https://agentplot.github.io/boom, an
[Astro](https://astro.build) site with
[Starlight](https://starlight.astro.build), published by
`.github/workflows/pages.yml` on every push to `main` that touches it.
boom is designed and not built, and every page says so.

```sh
devenv shell -- site-build         # moon run site:build: dist/, every internal link checked
devenv shell -- prose              # Vale over the pages and the README
devenv shell -- moon run site:test # the diagrams, and the README's copy of the hero
cd site && bun run dev             # http://localhost:4321/boom/
devenv shell -- site-shots <dir>   # screenshots: every page, both widths, both themes, and diagram frames
```

Each check is a moon task in the fast layer (`moon.yml`): `format` and
`lint` by Biome, with the settings in `/biome.json` that treefmt formats
with too; `typecheck` by `astro check`; `test` by `scripts/diagrams.ts`;
`prose` by Vale; and `build`.

The family's look is `@agentplot/site-theme`: its `starlight.css` carries
the type and the ink and paper of both themes, its header puts the family
bar above Starlight's, and its footer adds the family's. The family list
names no boom yet, so two things are boom's own until it does: the accent,
`src/accent.ts`, and the banner, `src/components/Banner.astro`, which says
boom is designed and not built.

## Where things live

| path | what |
|---|---|
| `src/content/docs/` | one page per file: start, how it's used, configuration, commands, `boom check`, `guides/` for the walkthroughs, integrations, and the roadmap |
| `src/diagrams/` | the SVG diagrams, drawn at build time: `kit.ts` the builder, one file per diagram |
| `src/components/Diagram.astro` | inlines a diagram's wide and narrow layouts and shows the one its column fits |
| `src/components/Hero.astro` | the start page's hero, with the animated diagram |
| `src/components/Banner.astro` | every page's line saying boom is designed and not built, and the accent |
| `src/styles/brand.css` | the diagrams' palette, `--dg-*`, drawn from the theme's `--ap-*` tokens |
| `src/assets/`, `public/favicon.svg` | the mark: a boom of three logs across the water, holding two, in the family's 112 by 88 frame |
| `scripts/diagrams.ts` | checks every diagram, and writes the README's |
| `scripts/shots.mjs` | the screenshots, with Playwright and the Chromium devenv provides |

## The diagrams

Each diagram uses CSS keyframes only, so it animates with no script and
follows the theme toggle through the `--dg-*` variables. Each makes one
claim, and its animation shows the mechanism moving: the hero the ledger
and its views, `events` a status read from an appended log, `check` the
three layers of `boom check`, and `fits` the tools that run boom by its
command line. A reader who asks for less motion sees one still frame
chosen to hold the whole claim. Every diagram is drawn twice, a wide
layout for a column of 600 pixels or more and a narrow one for a phone.

The accents of sluice, flume and millpond, where `fits` draws them, come
from the family list.

`scripts/diagrams.ts --check`, the `test` task, draws every diagram in
both layouts and fails on markup that does not close, a diagram with no
title or description, an id outside its prefix, or a label that runs out
of its box. `bun run readme-diagram` writes the hero as a standalone SVG
with its own palette, `docs/diagrams/boom.svg`, for the README, and the
check fails when that copy is not what the site draws now.
