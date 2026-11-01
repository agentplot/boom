---
number: 1
title: boom is an open-source repository of its own, and its binary is boom
status: accepted
date: 2026-11-01
decision-makers:
- Chuck Swanberg
---

# boom is an open-source repository of its own, and its binary is boom

Status: accepted by the user on 2026-11-01.

Deciders: the user, on 2026-10-31 and 2026-11-01.
Sources: flume's and sluice's scaffolding, which this repository copies.

## Context and problem statement

A project's invariants, decisions, assumptions, decision records, rules
for a scope, design book and context map are one thing seen several
ways: a ledger of claims and the events that propose, accept, reject or
supersede them, with every other form a view of it. Where does the tool
that keeps that ledger live, is it open, and what is its binary called?

## Considered options

1. A part of another tool, a command of its binary.
2. A repository of its own, agentplot/boom, open source under MIT, its binary named `boom`, in Rust.

## Decision outcome

Option 2. The ledger's format must be open so a project trusts that it
owns its history, and a tool of its own keeps that format free of any
one caller. Rust, so it shares the family's crates. `boom` is a working
name.

The decisions after this one are recorded here, one MADR record each,
and the rules in `docs/architecture/core.md` name them as sources.

### Consequences

- The repository carries the MIT license.
- Status is read from events and every view is computed (core.1, core.2).
- Nothing commercial appears in it (core.4).
