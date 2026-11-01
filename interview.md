# boom's constitution interview

The interview of 2026-11-01 with the user, to capture every requirement
boom must meet and the falsifiable rules a change to boom must hold to.
Each topic below says what the material already settles, what was asked,
the user's words, and the requirement or rule each answer gives. What
nobody has answered yet is marked **open**.

An id here is a name, never a number: it is fixed when the item is
written, it never depends on what else exists, and a later record,
clause or rule that takes the item in keeps it. This is the scheme the
first topic settles, applied to these notes.

Each item is one of:

- **requirement**: what boom must do or never do, for the statement;
- **rule**: what a change to boom must hold to, for `docs/architecture/core.md`;
- **open**: a question nobody has answered yet.

## Sources

- This repository: `docs/architecture/core.md` (core.1 to core.6),
  record 0001, `README.md` and the site's pages.
- The change `boom-is-designed-in-its-own-records`, as its first
  construct wrote it (proposal, design, specs, tasks), and the words the
  user sent it back with on 2026-11-01.
- The design notes that change was drawn from, kept in a private
  repository and cited here only by date and words (core.4): the design
  session of 2026-10-31 on claims, verdicts and reconciliation, its
  rulings (the status ruling, Q1 to Q6), and decisions 18 to 42 of the
  design's log.
- The family's requirements style, and sluice's, flume's and millpond's
  statements.
- Another repository's constitution interview, as the model for the
  method: rules proposed from the reading, each kept, changed or dropped
  by the user, with what it rules out.

## Identity and citation when branches race

### What the material settles

The user, 2026-11-01, sending the change back: "another repository's
constitution interview spent hours renumbering because main moved under
its branch: a parallel branch landed records 0002-0016 and rules
core.12-18, so every number on the branch collided, 22 records and 75
rules were renumbered twice, and each citation rewritten. A
well-designed boom must make that impossible."

- **`identity-fixed-at-proposal`** (requirement). A record's identity is
  its name, in kebab case, chosen by whoever proposes it and fixed when
  it is proposed; it never depends on what else exists. Source: the
  user, 2026-11-01, (1).
- **`name-clash-fails-at-merge`** (requirement). Two records brought
  under one name fail a check when the second reaches the default
  branch, so the clash is caught at the merge and never mended by a
  rename after it. Source: the user, 2026-11-01, (1).
- **`cite-by-name`** (requirement). Every citation, in a claim, a rule,
  a statement, code or a commit, cites a record by its name (a claim at
  a version as `<name>@<version>`), never by a sequence number. Source:
  the user, 2026-11-01, (2).
- **`ordinal-derived-on-render`** (requirement). A number a reader sees,
  a decision record's 0007 or a clause's 12, is a display ordinal
  computed when a view is rendered, from the order of acceptance on the
  default branch; it is never written into a filename, a citation or a
  record, so a landing beside another renumbers nothing. Source: the
  user, 2026-11-01, (3).
- **`legacy-number-alias`** (requirement). A decision record imported
  from another tool keeps its old number as an alias, cited only as
  legacy. Source: the user, 2026-11-01, (3).
- **`boom-follows-its-own-scheme`** (rule). boom's own statement, rules
  and records follow the same scheme, or say plainly where they cannot
  yet and why; `core.md` gains a rule that holds it, with the
  renumbering above as what it rules out. Source: the user, 2026-11-01,
  (4).

### Asked

Not yet asked.

## The ledger's storage and merge behaviour

Not yet asked.

## Who may propose, accept, reject and supersede, and how a person's word is proven

Not yet asked.

## boom check: its three layers and what blocks a merge

Not yet asked.

## Reconciliation across repositories

Not yet asked.

## The command line, its JSON and its exit codes

Not yet asked.

## boom mcp and the Claude Code and herdr plugins

Not yet asked.

## sluice, flume and millpond, by boom's command line

Not yet asked.

## Importing existing decision records

Not yet asked.

## What stays out of this repository

Not yet asked.

## What the change must take in

Written at the end of the interview.
