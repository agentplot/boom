---
title: Commands
description: Each command boom will have, with its arguments, an example run and its output, plain and as JSON. A sketch of a binary not yet built.
---

:::caution[A sketch]
No command here runs yet: the binary prints its version and nothing
more. The names, the arguments and the output are the design's sketch,
and building boom will change them.
:::

A command finds its ledger from where it runs: in the state repository
itself, or in a repository whose `.config/boom.toml` names its ledger.
`--ledger <path>` names one outright. A command that adds events appends
them and commits them to the state repository before it returns. Every
command takes `--json` and then prints one JSON object instead of lines
for a person; the examples below lay it out over several lines to read.
A command exits 0 when it did what it was asked, 1 when `boom check`
finds a claim violated or unclear, and 2 when it refuses.

| Command | What it does |
|---|---|
| [`boom propose`](#boom-propose) | Proposes a claim, or a narrative, context, relationship or term. |
| [`boom accept`](#boom-accept) | Accepts a proposed version, so it stands. A person's. |
| [`boom reject`](#boom-reject) | Rejects a proposed version, with a reason. A person's. |
| [`boom supersede`](#boom-supersede) | Proposes a claim that replaces a standing one. |
| [`boom query`](#boom-query) | Lists what applies to a path, a context or a name. |
| [`boom check`](#boom-check) | Reads a change against the standing claims it touches. |
| [`boom render`](#boom-render) | Computes a view: the design book, the rules, the ADRs or the map. |
| [`boom sync`](#boom-sync) | Writes each repository's slice, rules and ADRs, on one pull request. |
| [`boom import adr`](#boom-import-adr) | Records a folder of MADR files as decisions. |
| [`boom mcp`](#boom-mcp) | Serves these commands as tools to an agent. |

## `boom propose`

```text
boom propose <kind> <name> <statement> --scenario <text>...
             [--attach <part>]... [--body <file>] [--check <rule>]
             [--amends] [--provenance <text>]
```

`<kind>` is `invariant`, `decision` or `assumption` for a claim, or
`narrative`, `context`, `relationship` or `term`. A claim needs at least
one `--scenario` saying how one would know it holds; a decision takes
its context, options, outcome and consequences from `--body`. With no
`--attach`, a claim attaches to the context of the repository it was
proposed from. `--amends` proposes a new version of the standing claim
`<name>`.

```console
$ boom propose invariant refund-within-payment \
    "A refund never exceeds what the order was paid." \
    --scenario "Given an order paid 40.00, when a refund of 45.00 is asked, then it is refused."
proposed refund-within-payment@5e8c210, an invariant attached to shop
it waits on a person: boom accept refund-within-payment
recorded in shop-ledger at 2f6d9b1
```

```json
{
  "event": "proposed",
  "record": { "name": "refund-within-payment", "version": "5e8c210", "kind": "invariant", "attach": ["shop"] },
  "status": "proposed",
  "commit": "2f6d9b1"
}
```

## `boom accept`

```text
boom accept <name>[@<version>] [--note <text>]
```

Accepts the proposed version, the latest when `@<version>` is left out,
and it stands. Accepting a claim that supersedes another supersedes that
one in the same commit. Only a person accepts; how boom tells a person's
accept from an agent's is one of the [open
questions](/boom/roadmap/#open-questions).

```console
$ boom accept refund-within-payment
accepted refund-within-payment@5e8c210: it stands
in scope for shop; boom sync writes it there
recorded in shop-ledger at 8a01c4e
```

```json
{
  "event": "accepted",
  "record": { "name": "refund-within-payment", "version": "5e8c210" },
  "status": "standing",
  "superseded": [],
  "scope": ["shop"],
  "commit": "8a01c4e"
}
```

## `boom reject`

```text
boom reject <name>[@<version>] --reason <text>
```

```console
$ boom reject card-payments-only --reason "We take bank transfers too."
rejected card-payments-only@0b77e3d
recorded in shop-ledger at 91cd3a2
```

```json
{ "event": "rejected", "record": { "name": "card-payments-only", "version": "0b77e3d" }, "status": "rejected", "commit": "91cd3a2" }
```

## `boom supersede`

```text
boom supersede <name> <new-name> <statement> --scenario <text>...
               [--kind <kind>] [--body <file>] [--reason <text>]
```

Proposes a new claim that replaces the standing claim `<name>`, of the
same kind unless `--kind` says otherwise. The new claim is only
proposed: the old one stands, and the gate holds work to it, until a
person accepts the new one. An agent may run it; it never gets a change
through on its own.

```console
$ boom supersede billing-owns-invoices invoice-writers \
    "Only billing and refunds write invoices; refunds writes only credit notes." \
    --scenario "Given src/refunds, when it writes a credit note, then the check holds." \
    --reason "Refunds issue their own credit notes."
proposed invoice-writers@a93f6d2, an invariant that supersedes billing-owns-invoices
billing-owns-invoices stands until a person accepts: boom accept invoice-writers
recorded in shop-ledger at 4c2e7b0
```

```json
{
  "event": "proposed",
  "record": { "name": "invoice-writers", "version": "a93f6d2", "kind": "invariant", "supersedes": "billing-owns-invoices" },
  "status": "proposed",
  "commit": "4c2e7b0"
}
```

## `boom query`

```text
boom query [<path>|<part>|<name>]... [--status <status>] [--kind <kind>]
```

Lists the records that apply to a file or a directory, through the
contexts homed there; to a context; or by name. With nothing named, it
lists every standing claim. `--status proposed` lists what waits on a
person.

```console
$ boom query src/billing/invoice.rs
2 standing claims apply to src/billing/invoice.rs, in shop:
  invoices-final@3f9a1c2         invariant  An issued invoice is never edited; a correction is a credit note.
  billing-owns-invoices@7d2e91a  invariant  Only billing writes invoices. (rule)
```

```console
$ boom query --status proposed --json
```

```json
{
  "records": [
    { "name": "refund-within-payment", "version": "5e8c210", "kind": "invariant", "status": "proposed", "proposed_by": "agent", "attach": ["shop"] },
    { "name": "card-payments-only", "version": "0b77e3d", "kind": "assumption", "status": "proposed", "proposed_by": "agent", "attach": ["shop"] }
  ]
}
```

## `boom check`

```text
boom check [--base <revision> | <diff>]
boom check --answer <name> holds|violated --reason <text>
```

Reads a change, the working tree against `--base` (`main` when left
out) or a diff file, against the standing claims in the repository's
slice, `.boom/slice.rec`. It prints one line per claim it touched:
`holds`, `violated` or `unclear`, with a few words. A person answers an
unclear claim for this change with `--answer`. [boom check](/boom/check/)
says how it decides.

```console
$ boom check --base main
3 standing claims in scope of 4 changed files
  billing-owns-invoices  violated  its rule: src/refunds/credit.rs imports src/billing/invoices
  invoices-final         holds     a credit note is a new invoice; no issued invoice is edited
  money-has-currency     holds     every new amount is a Money
violated: 1 claim. Fix the code, or propose a claim to replace it: boom supersede billing-owns-invoices
```

```json
{
  "outcome": "violated",
  "claims": [
    { "name": "billing-owns-invoices", "version": "7d2e91a", "outcome": "violated", "layer": "rule", "words": "src/refunds/credit.rs imports src/billing/invoices" },
    { "name": "invoices-final", "version": "3f9a1c2", "outcome": "holds", "layer": "prose", "words": "a credit note is a new invoice; no issued invoice is edited" },
    { "name": "money-has-currency", "version": "c40b5f3", "outcome": "holds", "layer": "prose", "words": "every new amount is a Money" }
  ]
}
```

## `boom render`

```text
boom render [book|rules|adrs|map] [--scope <part>] [--out <dir>]
```

Computes a view from the ledger and writes it under `--out`, the
configured `render.out` when left out, and never into the ledger.
`book`, the default, writes mdBook source, `SUMMARY.md`, `book.toml` and
a chapter for each context, and runs `mdbook build` when mdBook is
installed. `rules` with no `--out` prints to the terminal.

```console
$ boom render book
wrote book/: SUMMARY.md, book.toml, 1 chapter, 4 claims anchored by name
ran mdbook build: book/book/index.html
```

```console
$ boom render rules --scope shop
# Rules for shop

- **invoices-final**: An issued invoice is never edited; a correction is a credit note.
- **billing-owns-invoices**: Only billing writes invoices.
```

```json
{ "view": "book", "out": "book", "files": ["SUMMARY.md", "book.toml", "shop.md"], "mdbook": "book/book/index.html" }
```

## `boom sync`

```text
boom sync [<repository>]... [--dry-run]
```

Writes into each repository what agents and people need there: the
slice `boom check` reads, the rules for its scope, and its decisions as
MADR files. It keeps one pull request open in each repository, on its
own branch, and updates it in place. When the output has not changed, it
changes nothing and touches no pull request. Run it after an accept,
from a hook after each merge to the state repository, or on a schedule.

```console
$ boom sync
shop: .boom/slice.rec, docs/rules.md and docs/adr/0001-money-has-currency.md changed
shop: updated the pull request on boom/sync
```

```json
{ "repositories": [{ "name": "shop", "changed": [".boom/slice.rec", "docs/rules.md", "docs/adr/0001-money-has-currency.md"], "branch": "boom/sync", "pull_request": "updated" }] }
```

## `boom import adr`

```text
boom import adr <dir> [--repository <name>]
```

Reads a folder of MADR files and records each as a decision: its title
as the statement, its sections as the body, its number and title kept.
Its status and date become its events, and a "superseded by" link a
supersession. Run it once; after that, boom writes the MADR files and
`boom sync` keeps them.

```console
$ boom import adr ../shop/docs/adr --repository shop
read 4 MADR files from ../shop/docs/adr
  0001  record-architecture-decisions  standing
  0002  amounts-as-floats              superseded by 0003
  0003  amounts-in-cents               standing
  0004  one-database                   standing
imported 4 decisions, 3 standing
recorded in shop-ledger at 6b3e0f9
```

```json
{
  "imported": [
    { "number": 1, "name": "record-architecture-decisions", "status": "standing" },
    { "number": 2, "name": "amounts-as-floats", "status": "superseded", "by": "amounts-in-cents" },
    { "number": 3, "name": "amounts-in-cents", "status": "standing" },
    { "number": 4, "name": "one-database", "status": "standing" }
  ],
  "commit": "6b3e0f9"
}
```

## `boom mcp`

```text
boom mcp
```

Serves the same commands as MCP tools over standard input and output,
for an agent's harness to start. Each tool takes its command's arguments
and returns its `--json` object. Accepting and rejecting are a person's;
whether `boom mcp` offers them at all is part of the [open question of
who accepts](/boom/roadmap/#open-questions).

```console
$ boom mcp
boom mcp: serving shop-ledger on stdio
tools: propose, supersede, annotate, query, check, render
```

## Also in the design

These come from the design's later work on verdicts, and are sketched
less far.

| Command | What it does |
|---|---|
| `boom annotate <name>[@<version>] <note>` | Adds an `annotated` event: a note on one version, as a review leaves it. |
| `boom judge [<repository>]` | Judges the claims due in a repository at its shared head, and appends a verdict for each. Run twice on the same inputs, it writes nothing the second time. |
| `boom reconcile [<repository>]` | Reads a repository's shared head and marks a verdict due when its evidence is gone or a landing cites its claim. |
| `boom backlog [<repository>]` | Lists the claims judged partial or not satisfied. |
| `boom challenge <name> --signal <text>` | Marks a claim's verdicts for judging again; an assumption goes back to a person. |
