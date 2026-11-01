---
title: Roadmap and open questions
description: Where boom stands, what its design has settled, what it leans toward and proposes, and the questions it has yet to settle.
---

boom is designed and not built. Its repository holds its rules,
`docs/architecture/core.md`, its first decision record, and a binary
that prints its version:

```console
$ boom --version
boom 0.0.0
```

The design is still being worked on, and has no build plan yet. This
page sorts it by how settled each part is.

## Settled

- boom is a repository of its own, open source under MIT, written in
  Rust, and its binary is `boom`
  ([record 0001](https://github.com/agentplot/boom/blob/main/docs/adr/0001-boom-is-an-open-source-repository-of-its-own-and-its-binary-is-boom.md)).
- A record's status is read from its events, and an event is appended,
  never changed or removed (core.1).
- Every view is computed from the ledger and never stored as the truth
  (core.2).
- The design book holds two kinds of content: narratives written when
  the work was planned, and what is computed when it is rendered. Every
  paragraph carries its record's name, so a note on the book reaches the
  record.
- A claim changes in two ways, both kept: an amendment is a new version
  of the same claim, a supersession a new claim in its place.
- boom judges verdicts and reconciles them on the host where a
  repository is checked out, and only at its shared head.
- The merge gate reads its claims from the slice committed in the
  repository, so a claim is checked there once its sync lands.
- An unclear check fails as unclear until a person answers it with
  `boom check --answer`.
- The accepted claims are the target, and nobody keeps a second map of
  what is built: what is built is read from the verdicts.
- A claim's standing in a repository is a function of boom's records,
  computed when asked, and nothing runs between commands.

## Leaning

- Invariants, decisions, ADRs, rules, the design book and the context map
  are one thing seen several ways: the ledger is the base, and the rest
  are views of it.
- A claim attaches to a context rather than to paths where it can, so
  it survives code moving.
- Reasoning is written when a decision is made; rendering only arranges
  it.
- The map, contexts and relationships, is records like claims.
- boom writes to Git directly.

## Proposed

- The records and events on [How it's used](/boom/how-its-used/), and
  verdicts beside them.
- The three layers of [boom check](/boom/check/), and prose claims that
  become rules as they are checked.
- `boom render` writing mdBook source, `boom sync` keeping one pull
  request in each repository, and `boom import adr`.
- One engine with thin wrappers: the command line with JSON, `boom mcp`,
  and the Claude Code and herdr plugins.
- sluice, flume and millpond using boom by its command line, never by
  its code.
- An accept or a supersession signed by the person who made it, in a
  format other tools can refer to by its id, and a command that verifies
  the signatures.

## Open questions

1. **How the ledger is laid out on disk**: one file per record or one
   log of events, the exact fields of each record, and how events are
   laid out. [Configuration](/boom/configuration/) shows one sketch.
2. **Who accepts.** Agents propose and people accept, and an agent may
   propose a supersession but never accept one. How boom tells a
   person's accept from an agent's, and who among people may accept
   what, are not settled; nor whether `boom mcp` offers accept and
   reject at all.
3. **The name.** `boom` is a working name.
4. **Where the ledger lives for one repository.** The design keeps it in
   a state repository of its own. Whether a project with one repository
   may keep its ledger in that repository instead is not settled.
5. **What a check rule looks like.** The design names dependency rules,
   lint rules and architecture tests, and no form for any of them.
6. **Which model reviews prose claims**, and how a project names it.
7. **Where an answer to an unclear check is kept**, so that the gate's
   next run of the same change reads it.
8. **What keeps a change from editing the slice it is checked against.**
   The gate reads `.boom/slice.rec` from the change's own tree.
9. **An imported decision's scenario.** Every claim needs one, and a
   MADR file has none.
10. **What the herdr plugin shows**, and which keys it adds.
11. **The order boom is built in.**
