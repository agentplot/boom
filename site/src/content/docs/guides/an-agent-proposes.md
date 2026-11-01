---
title: An agent proposes, you accept
description: An agent proposes claims while it plans a feature, and a person reads them, notes one, accepts one and rejects one.
sidebar:
  order: 2
---

Ada asks her agent to plan refunds in `shop`. The agent runs in Claude
Code with boom's plugin installed, so it can reach the ledger through
`boom mcp`. While it plans, it writes down what the plan rests on, as
proposals. Ada decides which of them stand.

## 1. Ask for the plan

> Plan refunds: a buyer can get money back on a paid order.

## 2. The agent proposes as it plans

The plugin's planning skill asks the agent what must hold for the plan
to be right, and the agent proposes each answer in the ledger, in its own
words of that moment. Its session shows each call:

```text
boom · propose invariant refund-within-payment
       "A refund never exceeds what the order was paid."
       scenario: Given an order paid 40.00, when a refund of 45.00 is asked, then it is refused.
boom · propose assumption card-payments-only
       "Every payment is by card."
       scenario: Given any paid order, when it is refunded, then the money goes back to its card.
boom · propose narrative refunds-intent
       "Refunds: what a buyer asks for, what the shop gives back, and when."
```

The skill keeps a claim to what someone could observe in the running
shop and judge from the repository alone. It never names a file, a
colour, a setting or a step of a pipeline: a claim about a file is a
check rule.

## 3. Nothing binds yet

A proposed claim is visible, and nothing checks code against it. The
agent goes on with its plan. The proposals wait for Ada:

```console
$ boom query --status proposed
2 proposed claims, waiting on a person:
  refund-within-payment@5e8c210  invariant   A refund never exceeds what the order was paid.  agent, plans/refunds.md
  card-payments-only@0b77e3d     assumption  Every payment is by card.                        agent, plans/refunds.md
```

She can also read them in context, in the design book, where the
narrative and the claims it names sit in the chapter for `shop`:

```console
$ boom render book
wrote book/: SUMMARY.md, book.toml, 1 chapter, 4 claims anchored by name
ran mdbook build: book/book/index.html
```

## 4. A note, and a new version

The invariant is nearly right. A refund can come in parts, and the parts
must not add up to more than the payment either. Ada leaves a note on
that version:

```console
$ boom annotate refund-within-payment "Partial refunds too: their sum never exceeds the payment."
annotated refund-within-payment@5e8c210
recorded in shop-ledger at 3e7a9d4
```

The agent reads the note and proposes a new version of the same claim:

```text
boom · propose invariant refund-within-payment --amends
       "Refunds on an order never add up to more than it was paid."
       scenario: Given an order paid 40.00 and refunded 30.00, when 15.00 more is asked, then it is refused.
```

## 5. Accept one, reject the other

```console
$ boom accept refund-within-payment
accepted refund-within-payment@b61d07f: it stands
in scope for shop; boom sync writes it there
recorded in shop-ledger at 8a01c4e

$ boom reject card-payments-only --reason "We take bank transfers too."
rejected card-payments-only@0b77e3d
recorded in shop-ledger at 91cd3a2
```

The first version, `5e8c210`, and Ada's note on it stay in the history.

## 6. What the agent does next

The agent queries again and sees the invariant standing and the
assumption rejected, with Ada's reason. It plans refunds to a bank
account as well as to a card. Once `boom sync` lands in `shop`, every
change is checked against `refund-within-payment` at the merge.

An agent proposes and never accepts. In the design, an accept is a
person's alone; how boom tells a person's accept from an agent's is one
of its [open questions](/boom/roadmap/#open-questions).

## Next

[A change breaks a claim](/boom/guides/a-change-breaks-a-claim/): what
happens when code moves away from a claim that stands.
