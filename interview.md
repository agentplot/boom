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

**Is a name unique across every kind of record, or within its kind?**
The user: one name space. A citation carries no kind, so a name
resolves alone.

- **`one-name-space`** (requirement). No two records of one ledger share
  a name, whatever their kinds; a second record under a taken name is
  refused when it reaches the default branch, naming the record that
  holds it. The same name and the same version brought by two branches
  are one proposal, and the second adds nothing. Rules out: a context
  `billing` and a claim `billing`; a rename after the merge to settle a
  clash; a name made unique by a number boom appends. Not ruled out: the
  same name in two ledgers. Source: the user, 2026-11-01.

**Two branches each amend one standing claim, and one is accepted:
what of the other?** The user: refused until it is proposed again on
the version that stands.

- **`amend-names-its-base`** (requirement). An amendment names the
  version it amends, and accepting it is refused unless that version is
  the one that stands; the refusal names the standing version and
  records nothing. Rules out: a later accept silently replacing a
  version its acceptor never read; boom merging two amendments into one
  text. Not ruled out: two amendments pending side by side; a person
  rejecting one and accepting the other; the proposer proposing the same
  words again on the new base, as a new version. Source: the user,
  2026-11-01.

**Is an ordinal counted per kind across the ledger, or per view?** The
user: per kind, across the ledger.

- **`ordinal-per-kind-ledger-wide`** (requirement). A record's display
  ordinal is its place among the records of its kind, by first
  acceptance on the ledger's default branch, and it never changes once
  given. Rules out: an ordinal that shifts when a claim is re-attached
  or a view is filtered; an ordinal for a proposed or rejected record; a
  superseded record losing its ordinal; an amendment taking a new one.
  Not ruled out: gaps in a view of one scope; a view that shows no
  ordinal. Source: the user, 2026-11-01.

**What does boom's own repository do now, before boom can manage it?**
The user: names everywhere, now.

- **`boom-names-everything-now`** (rule). In this repository, a
  decision record, a core rule and a clause, invariant or scenario of
  the statement each carry a short kebab name; a record's file is
  `docs/adr/<name>.md`, its frontmatter names it and holds no number;
  a rule's id is `core.<name>`; a clause opens with its name and is
  anchored by it; a citation names it, `(status-from-events, record
  five-records)`. The site shows ordinals ("Record 0002", "Clause 12")
  computed at build from the order each landed on main. A check in
  `check-fast`, run on the candidate, fails when two records, two rules
  or two items of the statement share a name. Record 0001 and core.1 to
  core.6 keep their ids as legacy aliases, cited only as legacy. Rules
  out: a number in a filename, a frontmatter field, an id or a
  citation; a check that holds records to unique numbers. Source: the
  user, 2026-11-01.

**The rule for `core.md`.** The user kept it as proposed.

- **`core.names-not-numbers`** (rule, for `core.md`). A record, a rule,
  a clause, an invariant or a scenario is identified by a name fixed
  when it is written and unique in its repository, and every citation
  names it; a number is shown only as an ordinal computed from the
  order things landed on main, never written into a filename, an id, a
  field or a citation. Rules out: a branch's records numbered "after the
  last" and renumbered when main moves, as another repository's
  interview renumbered 22 records and 75 rules twice, rewriting every
  citation; a filename `0007-<title>.md`; `core.12` as a new rule's id; a
  check that holds records to unique numbers. Not ruled out: record 0001
  and core.1 to core.6, cited only as legacy; an ordinal shown on a page
  or in a heading. Source: the user, 2026-11-01.

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
