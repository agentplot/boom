---
title: A change breaks a claim
description: A change violates a standing claim, boom check blocks the merge in sluice, and the agent either fixes the code or proposes a claim to replace it, which waits on a person.
sidebar:
  order: 3
---

`shop` lands its changes through sluice, a merge queue that tests each
change as merged before it lands. Among its checks is `boom check`, a
moon task in the layer `main` requires:

```yaml
# shop/moon.yml
tasks:
  claims:
    command: 'boom check --base main'
    tags: [check-fast]
```

One of the claims that stand in `shop` carries a rule:

```text
Name: billing-owns-invoices
Statement: Only billing writes invoices.
Check: deny import src/billing/invoices from src/** except src/billing/**
```

## 1. An agent writes refunds

Ada's agent builds refunds. Its new `src/refunds/credit.rs` writes each
credit note straight into the invoice tables, importing
`src/billing/invoices` to do it.

## 2. It checks before it hands off

boom's Claude Code plugin runs `boom check` before the agent hands its
work off:

```console
$ boom check --base main
3 standing claims in scope of 4 changed files
  billing-owns-invoices  violated  its rule: src/refunds/credit.rs imports src/billing/invoices
  invoices-final         holds     a credit note is a new invoice; no issued invoice is edited
  money-has-currency     holds     every new amount is a Money
violated: 1 claim. Fix the code, or propose a claim to replace it: boom supersede billing-owns-invoices
```

Scope found three claims among the twelve that stand. The rule settled
the first at once, and a reviewer model read the diff against the other
two.

## 3. At the merge, the gate says the same

Had the agent submitted anyway, sluice would have run the same check on
the change as merged, and landed nothing:

```console
$ sluice submit main
submission 31 to main · nothing queued ahead
testing main + #31 · 2 tasks to run, 14 replayed
failed: shop:claims
  on main + #31 (d1f0a3c)
  log of shop:claims: .git/sluice/.logs/main/d1/shop:claims.log
the agent working in refunds fixes it there and submits again
```

The agent has two ways forward.

## 4. Fix the code

The claim is right: credit notes belong to billing. The agent has
refunds call billing's `issue_credit_note()` and drops the import:

```console
$ boom check --base main
3 standing claims in scope of 4 changed files
  billing-owns-invoices  holds  its rule: no import of src/billing/invoices outside src/billing
  invoices-final         holds  a credit note is a new invoice; no issued invoice is edited
  money-has-currency     holds  every new amount is a Money
holds: 3 claims

$ sluice submit main
submission 32 to main · nothing queued ahead
testing main + #32 · 2 tasks to run, 14 replayed
passed · landed as 7c3b1e0
```

## 5. Or propose that the claim change

Or the agent judges that refunds should write their own credit notes. It
cannot change the claim to let its work through. It proposes a claim to
replace it, and the proposal waits on a person:

```console
$ boom supersede billing-owns-invoices invoice-writers \
    "Only billing and refunds write invoices; refunds writes only credit notes." \
    --scenario "Given src/refunds, when it writes a credit note, then the check holds." \
    --reason "Refunds issue their own credit notes, so a refund and its note land together."
proposed invoice-writers@a93f6d2, an invariant that supersedes billing-owns-invoices
billing-owns-invoices stands until a person accepts: boom accept invoice-writers
recorded in shop-ledger at 4c2e7b0
```

Until a person decides, `billing-owns-invoices` stands, and the gate
still fails the change. Ada reads the proposal and its reason.

**If she accepts**, the old claim is superseded, and the new one reaches
`shop` with the next sync:

```console
$ boom accept invoice-writers
accepted invoice-writers@a93f6d2: it stands
superseded billing-owns-invoices@7d2e91a
in scope for shop; boom sync writes it there
recorded in shop-ledger at e5d82a1

$ boom sync
shop: .boom/slice.rec and docs/rules.md changed
shop: updated the pull request on boom/sync
```

Once that pull request lands, the gate reads `invoice-writers`, and the
agent's change holds and lands.

**If she rejects it**, with a reason, the agent fixes the code as in
step 4.

## What this keeps

- Code that breaks a standing claim never lands.
- Only a person changes what the project claims: an agent's proposal
  waits, however sure the agent is.
- The ledger keeps both claims, the reason, and who accepted the change,
  so a reader next year sees why refunds write credit notes.
