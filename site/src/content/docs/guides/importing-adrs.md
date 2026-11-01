---
title: Importing your ADRs
description: A project that already keeps MADR decision records imports them into the ledger once, and boom writes them from then on.
sidebar:
  order: 4
---

`shop` has kept its decisions as MADR files for a year, written with an
ADR tool. Ada wants them in the ledger, beside the invariants, with the
history they already carry.

## 1. What is there

```console
$ ls shop/docs/adr
0001-record-architecture-decisions.md
0002-amounts-as-floats.md
0003-amounts-in-cents.md
0004-one-database.md

$ head -6 shop/docs/adr/0002-amounts-as-floats.md
---
status: superseded by 0003
date: 2025-03-02
decision-makers: Ada
---
# Amounts are stored as floats
```

## 2. Import them

With the state repository made as in [Your first
claims](/boom/guides/first-claims/#1-make-the-ledgers-repository), she
imports the folder once:

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

Each file became a decision claim:

| In the MADR file | In the ledger |
|---|---|
| the title | the claim's statement |
| context, options, outcome, consequences | the claim's body |
| the number, `0002` | kept, so the file keeps its name |
| `status` and `date` | the claim's events |
| `superseded by 0003` | a supersession: `amounts-in-cents` replaces `amounts-as-floats` |

```console
$ boom query --kind decision
3 standing decisions:
  record-architecture-decisions@2c81f04  decision  Record architecture decisions.
  amounts-in-cents@8b04d2c               decision  Amounts are stored as whole cents.
  one-database@6fd3b9e                   decision  One database serves the whole shop.
```

A MADR file has no scenario, and every claim needs one. How an import
fills that gap is one of the [open
questions](/boom/roadmap/#open-questions).

## 3. From now on, boom writes them

Ada stops writing ADRs with the old tool. A new decision is proposed and
accepted like any claim, and `boom sync` writes the MADR files into
`docs/adr`, numbered after the last:

```console
$ boom propose decision money-has-currency "Every amount carries its currency." \
    --scenario "Given an order in two currencies, when it is totalled, then each total names its currency." \
    --body currency.md
$ boom accept money-has-currency
$ boom sync
shop: .boom/slice.rec and docs/adr/0005-money-has-currency.md changed
shop: opened a pull request on boom/sync
```

## Why import, and not read the files where they are

If the ADR tool kept writing and boom only read its files, the project
would have two sources for its decisions and no record of who accepted
each one. After the import the ledger holds every decision and every
acceptance, and the MADR files are one view of it, computed again on each
sync.
