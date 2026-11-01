---
title: Your first claims
description: A developer working alone records a first invariant and a first decision, renders the rules, and puts them where an agent reads them.
sidebar:
  order: 1
---

Ada works alone on `shop`, an online shop, with a coding agent beside
her. She wants two things written down once: that an issued invoice is
never edited, and that amounts are stored as whole cents. Here is what
she types and what she sees. None of it runs yet; this is the design.

## 1. Make the ledger's repository

boom keeps its ledger in a Git repository of its own, beside the
repository it describes. Ada makes one and tells it about `shop`:

```console
$ mkdir -p shop-ledger/.config && cd shop-ledger && git init -q
```

```toml
# shop-ledger/.config/boom.toml
[repositories.shop]
remote = "git@example.org:ada/shop.git"
checkout = "../shop"
```

And one line in `shop`, so a command run there finds its ledger:

```toml
# shop/.config/boom.toml
ledger = "../shop-ledger"
```

She draws no map. Until she does, `shop` is one context, and each claim
she writes attaches to it.

## 2. Propose an invariant

An **invariant** is something the code holds at every revision. Each
claim says how one would know it holds, as a **scenario**:

```console
$ boom propose invariant invoices-final \
    "An issued invoice is never edited; a correction is a credit note." \
    --scenario "Given an issued invoice, when its lines or its total change, then the change is refused and a credit note is offered instead."
proposed invoices-final@3f9a1c2, an invariant attached to shop
it waits on a person: boom accept invoices-final
recorded in shop-ledger at 1c0e5aa
```

`3f9a1c2` is the claim's version, the hash of what it says. The claim is
**proposed**: anyone can read it, and nothing checks code against it yet.

## 3. Accept it

Proposing and accepting are two events, so that an agent can propose and
only a person accepts. Working alone, Ada does both:

```console
$ boom accept invoices-final
accepted invoices-final@3f9a1c2: it stands
in scope for shop; boom sync writes it there
recorded in shop-ledger at 77b3d10
```

## 4. Record a decision, with its reasons

A **decision** carries its reasoning, written now, while it is fresh.
Ada writes it in MADR's sections:

```markdown
<!-- amounts.md -->
## Context
Prices are stored as floats, and three items at 0.10 total 0.30000000000000004.
## Considered options
1. Keep floats and round for display.
2. Store whole cents.
## Decision outcome
Option 2: rounding for display hides the error inside every sum.
## Consequences
Every amount is an integer, and each view formats it.
```

```console
$ boom propose decision amounts-in-cents "Amounts are stored as whole cents." \
    --scenario "Given three items at 0.10, when the total is stored, then it is 30." \
    --body amounts.md
proposed amounts-in-cents@e12b4a7, a decision attached to shop
it waits on a person: boom accept amounts-in-cents
recorded in shop-ledger at 0d4e6b1

$ boom accept amounts-in-cents
accepted amounts-in-cents@e12b4a7: it stands
in scope for shop; boom sync writes it there
recorded in shop-ledger at 5a9f2c8
```

## 5. See what stands

The status of each claim is read from its events, every time:

```console
$ boom query
2 standing claims:
  invoices-final@3f9a1c2    invariant  An issued invoice is never edited; a correction is a credit note.
  amounts-in-cents@e12b4a7  decision   Amounts are stored as whole cents.

$ git log --oneline
5a9f2c8 boom: accepted amounts-in-cents@e12b4a7
0d4e6b1 boom: proposed amounts-in-cents@e12b4a7
77b3d10 boom: accepted invoices-final@3f9a1c2
1c0e5aa boom: proposed invoices-final@3f9a1c2
```

## 6. Render the rules

The rules for a scope are its standing invariants. The decision goes to
the decision records:

```console
$ boom render rules
# Rules for shop

- **invoices-final**: An issued invoice is never edited; a correction is a credit note.

$ boom render adrs --out /tmp/adr
wrote /tmp/adr/0001-amounts-in-cents.md
```

```markdown
---
status: accepted
date: 2026-11-02
decision-makers: Ada
---
# Amounts are stored as whole cents

## Context and problem statement
Prices are stored as floats, and three items at 0.10 total 0.30000000000000004.
…
```

Neither file is the truth. Render them again tomorrow and they come out
the same, unless the ledger changed.

## 7. Put them where the agent reads them

```console
$ boom sync
shop: .boom/slice.rec, docs/rules.md and docs/adr/0001-amounts-in-cents.md changed
shop: opened a pull request on boom/sync
```

Ada merges the pull request. Now `shop` holds its rules for any agent to
read, and the slice `boom check` reads at the merge. The next sync
updates the same pull request, and opens none when nothing changed.

## 8. Ask before an edit

Before her agent edits a file, it asks what applies, and so can she:

```console
$ cd ../shop
$ boom query src/billing/invoice.rs
2 standing claims apply to src/billing/invoice.rs, in shop:
  invoices-final@3f9a1c2    invariant  An issued invoice is never edited; a correction is a credit note.
  amounts-in-cents@e12b4a7  decision   Amounts are stored as whole cents.
```

## Next

- [An agent proposes, you accept](/boom/guides/an-agent-proposes/): the
  agent writes claims while it plans.
- [A change breaks a claim](/boom/guides/a-change-breaks-a-claim/):
  `boom check` at the merge.
