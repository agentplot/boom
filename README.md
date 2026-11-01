# boom

**Designed, not built.** The binary prints its version and nothing more;
the site shows what boom will do.

A ledger of what a project has claimed about itself: its invariants,
its decisions and its assumptions, each recorded with who proposed it,
who accepted it and what it replaced. Its rules for a scope, its
decision records, its design book and its context map are views
computed from the ledger, and `boom check` reads the work against the
claims that hold.

<p align="center"><img src="docs/diagrams/boom.svg" alt="An agent runs boom propose and a person runs boom accept; each appends an event to the ledger, where each record's status is read from its events. The views, the rules for a scope, the decision records, the design book, the context map and boom check, are computed again from the ledger after each accept, and a superseded claim leaves them." width="900"></p>

- **The site:** https://agentplot.github.io/boom

## What it does

- **One ledger.** Claims, and the narratives, contexts, relationships
  and terms around them, as plain-text recfiles in a Git repository the
  project owns.
- **Status read from events.** Proposed, accepted, rejected, superseded
  and annotated are events, appended and never edited. An agent
  proposes; only a person accepts.
- **Views computed.** The rules for a scope, the decision records in
  MADR, the design book in mdBook and the context map are computed from
  the ledger, and `boom sync` writes what each repository needs into it.
- **Checked at the merge.** `boom check` reads a change against the
  standing claims it touches: scope first, then each claim's rule, then
  a reviewer model for the claims in prose.

## This repository

| path | what |
|---|---|
| `crates/boom` | the binary; for now it answers `--version` |
| `site/` | the site, Astro with Starlight; its diagrams are drawn at build time (`site/README.md`) |
| `docs/architecture/core.md` | the rules every change keeps |
| `docs/adr/` | the decisions behind them, one MADR record each |
| `docs/diagrams/` | the README's diagram, generated from the site's |

```sh
devenv shell -- cargo run -p boom -- --version
devenv shell -- moon run :#check-fast   # every check in the fast layer
devenv shell -- site-build              # the site, through moon
devenv shell -- prose                   # the prose, through Vale
```

## License

MIT
