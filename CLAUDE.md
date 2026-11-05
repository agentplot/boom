# boom

A ledger of what a project has claimed about itself, invariants,
decisions and assumptions, with every view of it (rules for a scope,
decision records, a design book, a context map) computed from the
ledger, and `boom check` reading the work against the claims that hold.
For now the crate prints its version and nothing more.

## The family

**The family.** This tool works with the others of the Boomdrive
family: sluice (the merge queue), Flume (places and their agents),
Boomdrive (the runner), timber, weir and boom. Each tool's statement is
in agentplot/blueprints, `design/<tool>/requirements.md`. Before
designing or fixing a behavior here, look at how the related tools do
the same thing, in their code and their statements: readiness,
configuration, credentials, retries, what a place is. Where two tools do
one thing, reconcile them into one design with one owner the others call
or cite, and say so in the design. Never fix one tool alone when the
cause is that the tools differ.

**Specs.** `openspec/specs/` changes only through an OpenSpec change: a
proposal, a delta spec, and tasks, validated with
`openspec validate --strict` and archived with `openspec archive`, so
the spec reconciles. This holds for a fix or a chore too. Where the
work changes a requirement, it carries that change in the same branch.
Never edit a spec file directly.

## Rules

The rules are in `docs/architecture/`: `core.md` binds wherever a change
is made, and an area page, when one exists, binds the paths its
frontmatter names. The decisions behind them are `docs/adr/`, one MADR
record each. A design or a commit that relies on a rule cites its id;
one that departs from a rule says which and why. A rule is sent to
`core.md` or its area page with an id, the next free number in its area,
amended in the same commit as the decision that changes it.

## Checks

Every tool runs through the shell, one command at a time:
`devenv shell -- <command>`. moon runs the checks, tagged by layer
(`.moon/workspace.yml`); `.config/sluice.toml` says which layers each
branch requires:

| layer | what | who requires it |
|---|---|---|
| `check-fast` | the crate's format (rustfmt), lint (clippy -D warnings), type check and tests; the site's format and lint (Biome), type check (astro check), diagrams, prose (Vale) and build; the root's format (treefmt), toolchain, records, specs and open changes | main |

Run suites through sluice, so the agents on this host take turns under
its bound: once your work is committed, `sluice exec main` for the
gate's checks, and while iterating `sluice exec main -- moon run
<project>:<task>`. The projects are those `.moon/workspace.yml` lists:
`boom` (`crates/boom`), `site` (`site/`, its own `README.md`) and
`root`. A quick, narrow call, `cargo check` or one unit test, is fine to
run directly. `devenv shell -- moon run :#check-fast` runs the fast
layer.

## Commits

Stage by pathspec and commit the paths you wrote: `git add <paths>`, then
`git commit -m "<subject>" -- <paths>`. Never `-a`, never `add .`.
Conventional Commits subjects, scope the part of the tree touched.

@docs/architecture/core.md
