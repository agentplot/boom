---
name: the-rename-to-boomdrive
title: Flywheel is renamed Boomdrive, and its unit of work a drive
status: proposed
date: 2026-11-04
decision-makers:
- Chuck Swanberg
---

# Flywheel is renamed Boomdrive, and its unit of work a drive

Status: proposed. The decision is the user's, in their words below; the
record waits on their yes.

Deciders: the user, as the rename's brief of 2026-11-04 gives their
words.

## Context and problem statement

boom belongs to a family of tools under one umbrella name, Flywheel,
and that name is changing in every repository of the family at once.
What is each name now, and what stays?

The user: "the ecosystem, the org, the branding, the cloud and the
opensource runner tool are all boomdrive. There is also a "boom" open
source tool that does the claim reconciliation."

## Considered options

1. Keep Flywheel.
2. Rename Flywheel, its products and its words, as the mapping below
   has it, in every repository at once.

## Decision outcome

Option 2, the user's decision. The names:

- **Boomdrive** is one word, a capital B in prose, and `boomdrive` in
  code, commands, packages, paths and repository names, with
  `Boomdrive` where the code's case needs a capital; never `Boom Drive`,
  `BoomDrive`, `boom_drive` or `boom-drive`.
- Flywheel, the product, the brand and the ecosystem, and the family of
  open tools on their sites (sluice, flume, timber, weir and the rest),
  are Boomdrive.
- Flywheel Cloud, the control plane, is Boomdrive Cloud, in
  agentplot/boomdrive-cloud, formerly flywheel-cloud.
- The runner is Boomdrive, in agentplot/boomdrive, formerly
  flywheel-runner: its command `boomdrive`, its crates `boomdrive` and
  `boomdrive-hosted`.
- flywheel-web is agentplot/boomdrive-web.
- tailrace is timber, in agentplot/timber: its crate, command, site and
  records.
- The unit of work, a Flywheel, is a **drive**, plural drives, and
  `Drive` in code, one word in the interface and the code alike.
- crew's word for a partition's state branch follows the unit: the
  drive's branch. The mark the runner puts on its launches is
  `boomdrive:<partition>/<n>`.
- agentplot/flywheel, the original, is archived; a mention of it as
  history names it as archived.
- boom keeps its name, and so does anything third-party that happens to
  say flywheel.
- The family spells enroll, enrolls, enrolled, enrolling and
  enrollment, never enrol or enrolment.

A record's or a rule's names change and its decision does not; an
archived change, and the history in a record's own words, keep their
text. A link to a renamed repository names its new address.

### Consequences

- boom's own tree named Flywheel once, in the constitution interview's
  quotation of the user on the storage convention. The quotation now
  reads "[Boomdrive]", in the brackets the interview puts around its
  other edits to a quotation.
- The site takes the family's bar and footer from
  `@agentplot/site-theme`. It pins v0.1.3, the release with the new
  names, so its bar and footer say Boomdrive and timber and link to
  their new addresses. The site passes the theme no member id the
  rename changed.
- This record names Boomdrive Cloud, which core.4's words "hosted
  service" keep out. The user ruled in the constitution interview of
  2026-11-01 that the umbrella and its products may be named
  (`core.no-commercial-strategy`, rewording core.4, yet to reach
  `core.md`). The record says nothing of pricing, a tier or a customer.
- This record has a name and no number, as `boom-names-everything-now`
  has it; `check-adrs.sh` reads numbered records only.
