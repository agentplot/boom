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

### What the material settles

- The ledger is plain-text recfiles in git, written by boom directly,
  and a rejected push is applied again and retried (decision 24 of the
  design's log; record 0001: the format is open so a project trusts that
  it owns its history).
- Order is the ledger's history, one line, and no status depends on a
  clock (the change's record on events, ruling Q2).
- The family's storage convention (flywheel-next,
  `design/storage/storage.md`): five layers (host, worktree, clone,
  shared branch, content), a piece of state in the lowest layer that
  holds every reader it has; one protocol for writing a shared branch
  (its 5.2); recutils at rest on a shared branch, each record naming
  `format: <tool>-<record>/<n>`, JSON only in flight; a repository's
  declaration in `.config/<tool>.toml`; and its rule 2, that a tool's
  records about one repository stay with that repository.

### Asked

**Where does a ledger live, and where may an event be written?** The
user: "As long as this is grounded in the storage rules we established
for the flywheel tools, I believe. This is under Flywheel Next design I
think." boom was then set against that convention, and the user kept it.

- **`ledger-on-a-shared-branch`** (requirement). A ledger is layer 4 of
  the family's storage convention: a branch the operator names, in a
  repository the operator names, under boom's own prefix `boom/`. A
  project of one repository may name a branch of that repository; a
  ledger may share a state branch with another tool's state, such as
  millpond's `inbox/`, each under its own prefix. Rules out: ledger
  files on a working branch, landed with the code; a merge commit on the
  ledger's branch; boom writing to a gated main. Source: the user,
  2026-11-01; the storage convention, layer 4 and its decision 5.
- **`ledger-written-by-the-family-protocol`** (requirement). boom writes
  its branch by the convention's 5.2 protocol: fetch the tip into
  `$XDG_CACHE_HOME/boom/git/`; apply the write to that tip and check it
  with `recfix` and boom's own rules (a name now taken, an amendment's
  base no longer standing, an actor's role); commit it as one commit
  through a temporary index, touching no working tree; push without
  force from the tip that was read; when refused, apply it again to the
  new tip, a bounded number of times, then report. A branch with no
  remote takes the same steps with an `update-ref`. The history stays
  one line, and a clash between two writers is caught by the check at
  the new tip, which refuses the second. Rules out: a forced push; a
  write that touches a working tree; a merge; a lock standing in for the
  push. Source: the storage convention, 5.2.
- **`records-name-their-format`** (requirement). Every record at rest
  is recutils and names its format and major version, `format:
  boom-claim/1`; JSON travels only in flight; boom reads every earlier
  version of a record as it stands. Source: the storage convention, rule
  4 and decision 14.
- **`boom-state-by-layer`** (requirement). Where each repository is
  checked out on a host, and the host's other settings, are layer 1,
  under `$XDG_CONFIG_HOME/boom/`; caches under `$XDG_CACHE_HOME/boom/`.
  A repository declares itself to boom in `.config/boom.toml`, read at
  the branch's revision. What boom puts in a repository it describes,
  the slice among it, is layer 5 and lands as that repository's other
  work does. Rules out: a checkout path in a committed file; boom
  committing straight into a repository it describes. Source: the
  storage convention, layers 1 and 5, decisions 2 and 15.

**Hand edits: someone edits the recfiles, or an agent appends an
`accepted` event itself.** The user: validated on read.

- **`validated-on-read`** (requirement). boom holds every event it reads
  to the checks it holds a write to (its form, its actor's role, its
  signature); an event that fails counts for nothing, and a commit that
  changes or removes a line already written is reported as tampering,
  naming the commit. Rules out: a status read from an event boom would
  have refused to write; an agent's hand-written accept standing; an
  edited event read as its new text. Not ruled out: reading the files
  with `recsel`, with no boom; a keeper reverting the bad commit.
  Source: the user, 2026-11-01.

**May boom keep an index or cache beside the ledger?** The user: derived
only.

- **`caches-derived-only`** (requirement). Anything boom keeps besides
  the ledger is computed from it, kept outside it, and never read as the
  truth: deleting it changes no answer, and a cache built from an older
  head is rebuilt before it answers. Rules out: a status, a queue or a
  version stored and read back; a cache committed to the ledger; an
  answer from a cache older than the head. Not ruled out: an index
  under `$XDG_CACHE_HOME/boom/`; no cache at all. Source: the user,
  2026-11-01; core.2.

**The convention's rule 2 keeps a tool's records about one repository
with that repository; decision 39 keeps verdicts beside the claims.
Which holds?** The user: beside the claims.

- **`verdicts-beside-the-claims`** (requirement). Verdicts and due
  events are appended on the ledger's branch, beside the claims, a named
  departure from the storage convention's rule 2: a verdict names a
  claim's version, which is the ledger's history, and anyone holding the
  ledger computes every cell's status from it alone. Rules out: a
  verdict under `refs/boom/` in the judged repository; a status that
  needs every repository's refs fetched first. Not ruled out: a verdict
  naming the revision it judged; each host appending only to files of
  its own, so writers never meet. Source: the user, 2026-11-01; decision
  39.

## Who may propose, accept, reject and supersede, and how a person's word is proven

### What the material settles

- **`accept-by-role-never-agent-never-author`** (requirement). A
  proposed version of any record stands only by the accept of a person
  whose role carries the permission; an accept by an agent, by the actor
  of that version's `proposed` event, or by a person without the role is
  refused, says why and records nothing; the accept that supersedes a
  claim is held to the same. Source: decision 41; the change's record on
  who may accept.
- **`reject-is-a-persons`** (requirement). Only a person rejects, never
  an agent. Source: the same.
- **`agents-propose`** (requirement). An agent proposes, annotates, and
  proposes amendments and supersessions, and never gets a change through
  on its own. A person working alone accepts what an agent proposed, and
  a version they proposed themselves waits on another person. Source:
  the same.
- **`mcp-offers-no-accept`** (requirement). `boom mcp`, which serves an
  agent, offers no accept and no reject. Source: the same.

### Asked

**What proves an accept or a reject was the person's act, when an agent
on the same host runs as the same user?** The user: signed, with the
person present.

- **`persons-acts-signed-with-presence`** (requirement). An event whose
  actor is a person carries that person's signature over the event, by a
  key the ledger registers to them that signs only with the person
  present (a hardware key's touch, a passkey or a biometric prompt);
  boom verifies it before it writes the event and again whenever it
  reads it (`validated-on-read`). An agent's event is unsigned and names
  its session or run as provenance. Rules out: an accept with no
  signature, or signed by a key the ledger does not register to its
  actor; a key that signs unattended, a plain key file or a forwarded
  agent with no prompt; an agent's event naming a person as its actor.
  Not ruled out: verifying a signature with the format's own tools and
  no boom. Source: the user, 2026-11-01.

**Is "keeper" the right word?** The user asked whether a better term was
needed, and took **owner**.

- **`owner-is-the-word`** (requirement, vocabulary). The person or
  people who grant roles and register keys in a ledger are its
  **owners**; "operator" keeps the family's meaning, the person who runs
  a host. The change's "keeper" becomes "owner" everywhere. Source: the
  user, 2026-11-01.

**How do roles, grants and keys change, and who holds that power
first?** The user: "Presumably for open source use, the user would be
able to define self-sign or something without having the verified
owner, I believe, right?" Asked which reading was meant, the user took
the self-registered owner.

- **`self-registered-first-owner`** (requirement). The ledger's first
  commit registers its maker's own key as owner, verified by nobody
  else; after it, a role, a grant of a role or a registered key changes
  only by an event an owner signs, with the owner present. boom proves
  that each person's act was signed by the key registered to them with
  the person present, and never claims to prove who that person is in
  the world. Rules out: roles or keys changed by a commit to a file,
  `.config/boom.toml` among them; an agent registering a key or granting
  a role. Not ruled out: several owners; an owner revoking a key, the
  events it signed before staying valid; an outside authority added
  later beside the self-registered key. Source: the user, 2026-11-01.

**Which acts besides accepting a version need a person's accept?** The
user: all three asked about.

- **`retire-attach-and-rules-need-a-person`** (requirement). Retiring a
  claim with nothing in its place, moving what a claim attaches to, and
  adding or changing its check rule are each proposed, by anyone, and
  take effect only on a person's accept under
  `accept-by-role-never-agent-never-author`; none changes the claim's
  version. Rules out: an agent adding a check rule that passes, so its
  violation never reaches the reviewer; an agent detaching a claim from
  the context its change breaks; a claim withdrawn by a file edit.
  Source: the user, 2026-11-01. This settles the change's question of
  how a claim is withdrawn and how an attachment moves: by proposals a
  person accepts.

### Open

- **`open-signature-format`**. The format of a person's signature: the
  family's attestation format (an in-toto statement in a DSSE envelope),
  or git's SSH signatures, or another, so that a reader can verify it
  with no boom.

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
