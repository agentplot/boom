---
title: Configuration
description: What a project's boom configuration and ledger look like on disk, as recfiles, in a sketch of a format the design has yet to settle.
---

:::caution[A sketch]
No file here is a format yet. The design proposes recfiles for the
ledger and leaves the layout open: one file per record or one log of
events, the exact fields, and how events are laid out. This page shows
one way it could look, so you can picture it.
:::

## Two repositories

The ledger lives in a **state repository** of its own. Each repository
it describes holds only what `boom sync` writes into it, and a line
saying where its ledger is.

```text
shop-ledger/              the state repository: the ledger
  .config/boom.toml       the repositories it describes
  records/
    claims.rec            every version of every claim
    narratives.rec
    contexts.rec          contexts and homes, once drawn
    relationships.rec
    terms.rec
  events.rec              every event, appended
  verdicts.rec            every verdict, appended

shop/                     a repository the ledger describes
  .config/boom.toml       where its ledger is
  .boom/slice.rec         by boom sync: what boom check reads
  docs/rules.md           by boom sync: the rules, to read
  docs/adr/               by boom sync: each decision, in MADR
```

## The configuration

The state repository's `.config/boom.toml` names each repository the
ledger describes, and what `boom sync` writes there:

```toml
# shop-ledger/.config/boom.toml

# Each repository this ledger describes. Until a map is drawn, each is
# one context, named after it.
[repositories.shop]
remote = "git@example.org:ada/shop.git"
# Where it is checked out on this machine, for boom judge and boom
# reconcile, which read its code.
checkout = "../shop"

# What boom sync writes into each repository, on one pull request it
# keeps open there.
[sync]
branch = "boom/sync"
slice = ".boom/slice.rec"
rules = "docs/rules.md"
adrs = "docs/adr"

# Where boom render writes the design book's source. Nothing commits it.
[render]
out = "book"
```

A repository the ledger describes names its ledger, so a command run
there, or an agent's MCP server started there, finds it:

```toml
# shop/.config/boom.toml
ledger = "../shop-ledger"
```

## Claims

One entry per version of a claim. Each version is the hash of its
statement, scenarios and body; boom computes it, and nobody writes it.
What a claim attaches to and its check rule sit outside the hash.

```text
# shop-ledger/records/claims.rec
%rec: Claim
%type: Kind enum invariant decision assumption
%mandatory: Name Kind Statement Scenario

# version 3f9a1c2
Name: invoices-final
Kind: invariant
Statement: An issued invoice is never edited; a correction is a credit note.
Scenario: Given an issued invoice, when its lines or its total change,
+ then the change is refused and a credit note is offered instead.
Attach: shop

# version 7d2e91a
Name: billing-owns-invoices
Kind: invariant
Statement: Only billing writes invoices.
Scenario: Given a module outside src/billing, when it writes an invoice,
+ then the check fails.
Attach: shop
Check: deny import src/billing/invoices from src/** except src/billing/**

# version 19aa0c2
Name: one-currency
Kind: assumption
Statement: Every order is in one currency.
Scenario: Given any order, when it is placed, then all its amounts share a currency.
Attach: shop

# version c40b5f3
Name: money-has-currency
Kind: decision
Statement: Every amount carries its currency.
Scenario: Given an order in two currencies, when it is totalled,
+ then each total names its currency.
Body: ## Context
+ Orders now arrive in euros as well as dollars.
+ ## Considered options
+ 1. Keep one currency and convert at checkout.
+ 2. Store each amount with its currency.
+ ## Decision outcome
+ Option 2: converting at checkout loses the amount the buyer paid.
+ ## Consequences
+ Every report sums per currency.
Attach: shop
Supersedes: one-currency
```

The form of a check rule is not settled; the design names dependency
rules, lint rules and architecture tests.

## Events

Every event, in the order it was appended. A record's status is read
from these and stored nowhere else.

```text
# shop-ledger/events.rec
%rec: Event
%type: Event enum proposed accepted rejected superseded annotated
%mandatory: Event Record Actor At

Event: proposed
Record: money-has-currency@c40b5f3
Actor: agent
Provenance: planning session for multi-currency orders, plans/currency.md
At: 2026-11-05T10:12:40Z

Event: annotated
Record: money-has-currency@c40b5f3
Actor: person Ada <ada@example.org>
Note: Say what a report does with two currencies.
At: 2026-11-05T11:02:09Z

Event: accepted
Record: money-has-currency@c40b5f3
Actor: person Ada <ada@example.org>
At: 2026-11-05T16:40:51Z

Event: superseded
Record: one-currency@19aa0c2
By: money-has-currency@c40b5f3
Actor: person Ada <ada@example.org>
At: 2026-11-05T16:40:51Z
```

They are recfiles, so GNU recutils reads them as they are, with no boom
at all:

```console
$ recsel -t Event -e "Event = 'proposed'" -p Record,Actor events.rec
Record: money-has-currency@c40b5f3
Actor: agent
```

## Verdicts

Each judgment of one claim in one repository, appended and never edited:

```text
# shop-ledger/verdicts.rec
%rec: Verdict

Claim: invoices-final@3f9a1c2
Repository: shop
Revision: 9e41c07
Value: satisfied
Evidence: src/billing/invoice.rs tests/invoices_final.rs
Words: Issued invoices are read-only; corrections go through credit_note().
At: 2026-11-04T09:30:12Z
```

## What boom sync writes

In each repository, on its one pull request. Nobody edits these files:
the next sync writes them again from the ledger.

```text
# shop/.boom/slice.rec, which boom check reads
# Written by boom sync from shop-ledger at 6b3e0f9. Edit the ledger, not this file.
%rec: Claim

Name: invoices-final
Version: 3f9a1c2
Kind: invariant
Statement: An issued invoice is never edited; a correction is a credit note.
Scenario: Given an issued invoice, when its lines or its total change,
+ then the change is refused and a credit note is offered instead.
Evidence: src/billing/invoice.rs tests/invoices_final.rs

Name: billing-owns-invoices
Version: 7d2e91a
Kind: invariant
Statement: Only billing writes invoices.
Scenario: Given a module outside src/billing, when it writes an invoice,
+ then the check fails.
Check: deny import src/billing/invoices from src/** except src/billing/**
```

```markdown
<!-- shop/docs/rules.md: written by boom sync from shop-ledger. Edit the ledger, not this file. -->
# Rules for shop

- **invoices-final**: An issued invoice is never edited; a correction is a credit note.
- **billing-owns-invoices**: Only billing writes invoices.
```

Code, tests and commits cite a claim by its name and version, so a
reader, and `boom check`, can see what a change says it builds:

```rust
// Claim: invoices-final@3f9a1c2
#[test]
fn an_issued_invoice_refuses_an_edit() { /* … */ }
```
