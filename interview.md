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

### What the material settles

From the change's record on the check, rulings Q4 and Q5:

- **`check-asks-direction`** (requirement). The check asks whether a
  change moves the repository away from a standing claim the change
  touches, never whether the repository satisfies a claim; a claim the
  change leaves alone holds, so the gate blocks regressions and never
  the backlog.
- **`three-layers-cheapest-first`** (requirement). Scope, then rules,
  then prose; a claim an earlier layer settles reaches no later one, and
  the reviewer gets the diff and the claims still to settle, and nothing
  else. The map's free rule fails a new dependency between contexts that
  no relationship allows, and a marker naming no standing claim fails.
- **`what-blocks`** (requirement). Violated blocks the merge; unclear
  fails until a person answers for that change, and the answer is never
  a verdict; a check writes no verdict and moves none.
- **`check-reads-its-tree`** (requirement). The check reads its claims
  from the slice committed in the change's own tree, so a claim is
  checked once its sync lands, and a gate that caches by content
  replays an unchanged check.

### Asked

**How does boom start its reviewer and its judge, and what if the model
cannot be reached, as in a gate that allows only localhost?** The user:
an agent program's command, and not run when unreachable.

- **`reviewer-is-an-agent-command`** (requirement). The reviewer and the
  judge are an agent program's command, with its exact model, named in
  the ledger's settings (`ledger-settings-owner-signed`) and carried
  into each repository by its slice; each is given the closed inputs on
  standard input and answers JSON on standard output. The model is an
  input of the check, so a new model runs the check again. boom holds no
  model credential (core.3). Rules out: a model key read or stored by
  boom; "latest" or an unpinned model name; a change choosing its own
  reviewer. Not ruled out: different programs for the judge and the
  reviewer. Source: the user, 2026-11-01.
- **`unreached-is-not-run`** (requirement). A claim the check could not
  have reviewed, its reviewer unreachable, has no outcome: `boom check`
  exits the not-run code the gate's policy names (sluice 114), so the
  gate records no outcome, and it never passes the claim. An answer not
  of the reviewer's form reads unclear. Rules out: a prose claim passed
  because its review failed. Not ruled out: a gate policy that allows
  the model's endpoint. Source: the user, 2026-11-01; sluice's statement,
  83, 84 and 114.

**Where is a person's answer to an unclear claim kept?** The user:
signed, in the change's own tree.

- **`answers-signed-in-the-tree`** (requirement). `boom check --answer`
  writes the person's signed statement, presence required, into the
  change's own tree under `.boom/answers/`, naming the claim at its
  version and the digest of the change it answers: the diff of the files
  in that claim's scope, answers left out. The check reads it there, and
  an answer whose digest no longer matches the change is void. Rules
  out: an answer an agent wrote; an answer carried to a later, different
  change; an answer read as a verdict. Not ruled out: the answer landing
  with the change, as the record of who answered; the same person
  answering again after the change moves. Source: the user, 2026-11-01.
  This settles the change's question of where an answer is kept.

**What stops a change from editing the slice it is checked against?**
The user: only what the ledger gives.

- **`slice-only-as-the-ledger-gives`** (requirement). A change that
  touches the slice fails the check unless its new slice is exactly what
  the ledger, at the commit the slice names, gives for this repository,
  and that commit is on the ledger's branch and no older than the one
  the replaced slice names. That check reads the ledger at a named
  commit, so its outcome still caches by content; where the gate cannot
  read the ledger, it is not run, never passed. Rules out: a claim
  deleted from the slice by hand; a slice naming a ledger commit it was
  not written from; a slice rolled back to an older one, from before the
  claim a change breaks was accepted; a change that edits code and the
  slice at once. Not ruled out: boom's own sync change changing it.
  Source: the user, 2026-11-01; the clause on the ledger only moving
  forward follows from the answer. This settles the change's question of
  what keeps a change from editing its slice.

## Reconciliation across repositories

### What the material settles

From decision 40, the change's records on reconciling and on scope, and
rulings Q1, Q3 and Q6:

- **`judged-per-repository-at-its-head`** (requirement). boom
  reconciles and judges one repository at its shared head, on a host
  where it is checked out, with no other service; a landing that cites a
  claim makes its cell due; a repository first homed is judged once, as
  a baseline.
- **`repeat-writes-nothing`** (requirement). `boom reconcile` and `boom
  judge` each ask the status first, so either, run again with nothing
  changed, writes nothing, and any trigger may run them.
- **`scope-crosses-by-homes`** (requirement). A claim reaches a
  repository only through the homes of what it attaches to: a
  relationship's claim has a cell in each end's repository, a system
  claim one in every repository the map homes anything in, each with
  its own verdict.

### Asked

**Where do the ledger's settings live: the repositories it describes,
each one's remote and planner, and the reviewer and judge?** Asked once
it was seen that a change could swap its own reviewer were it set in the
repository's tree. The user: in the ledger, signed by an owner.

- **`ledger-settings-owner-signed`** (requirement). The repositories a
  ledger describes, each one's remote and planner, and the reviewer's
  and the judge's commands and models are ledger settings, changed only
  by an event an owner signs. The check takes its reviewer from the
  slice, which only the ledger gives (`slice-only-as-the-ledger-gives`);
  a repository's `.config/boom.toml` names its ledger and nothing the
  check trusts. Rules out: a change that edits its own reviewer; an
  agent setting a repository's planner; a settings file on the ledger's
  branch edited by hand. Not ruled out: where a repository is checked
  out, in each host's own settings (`boom-state-by-layer`). Source: the
  user, 2026-11-01.

**Two hosts both judge the same cell: what keeps the ledger right?** The
user: the check at the tip, with no lease.

- **`no-lease-recheck-at-the-tip`** (requirement). boom holds no lease
  or claim on a cell; every verdict and due event is checked again
  against the status at the tip it is applied to, and one for a cell no
  longer to judge is dropped and reported, never appended. A second
  model session spent on a cell another host judged first is the
  accepted cost. Rules out: two verdicts on one cell for one cause; a
  lock or lease file on the ledger's branch; a host waiting on another.
  Not ruled out: a trigger arranged so one host judges a repository.
  Source: the user, 2026-11-01.

**How does `boom sync` hand a repository its files?** The user: a forge
pull request, with the note "We just need to make sure this is
compatible with how we use sluice. I believe that in a default sluice
setup, the pull request would automatically get merged by sluice
anyway." It is: sluice's pull-request profile finds a request it did
not open as one opened by hand, submits it once it is out of draft and
the branch's conditions hold, and lands it; a new head withdraws the
entry and the request waits for its conditions on that head (sluice,
the pull-request row of its Part C, 118, 120, 136). With `reviews = 0`,
a sync request lands once the gate passes.

- **`sync-by-one-pull-request`** (requirement). `boom sync` writes a
  repository's files only on its own branch there, `boom/sync`, as one
  commit from the ledger, and opens or updates one pull request for it
  through the forge's own command line, marked ready, never a draft, so
  a merge path that takes pull requests lands it as it lands any other;
  with output unchanged it pushes nothing and leaves the request alone.
  boom never merges it itself. Rules out: boom pushing to a repository's
  main; boom running sluice, flume or millpond; a second sync request
  open at once. Not ruled out: the repository's gate checking it like
  any change; sluice landing it under its pull-request profile; a branch
  only, where the forge has no pull requests. Source: the user,
  2026-11-01; sluice's statement.

### Open

- **`open-sync-without-pull-requests`**. Where a repository's merge path
  takes no pull requests (sluice landing a branch from local or pushed
  refs), the sync branch waits for whoever lands work there to submit
  it, since boom runs no other tool. Whether that is enough, or such a
  repository needs a planner or a hook to submit it, is not settled.

## The command line, its JSON and its exit codes

### What the material settles

- **`one-engine-every-command-json`** (requirement). boom is one engine,
  a library and the `boom` command, with thin wrappers around it; every
  command takes `--json`. Source: the design's surfaces, the change's
  section on the surfaces (C.8).

### Asked

**Which exit codes?** The user: 0, 1, 2 and 3.

- **`exit-codes`** (requirement). Every command exits 0 when it did what
  was asked, or the check found every claim holds; 1 on a finding, the
  check finding a claim violated or unclear; 2 when it refuses, as for
  an agent's accept, a name already taken, an amendment on a base no
  longer standing or an unknown name; 3 when it could not run, as when
  the reviewer or judge is unreachable, the ledger's push is refused
  past its bound or the ledger is unreadable. On 2 and 3 nothing is
  written. 3 is the code a gate's policy names as not run. Rules out: a
  refusal and an outage sharing a code; a write half done on 2 or 3; any
  other code. Source: the user, 2026-11-01.

**What does boom promise about its JSON?** The user: versioned and
additive.

- **`json-versioned-additive`** (requirement). With `--json` a command
  prints exactly one JSON object on standard output, naming its format
  and major version (`"format": "boom-backlog/1"`); within a major a
  field is only added, never renamed, removed or given a new meaning; a
  refusal or a not-run is an object with its reason, in the shape
  flume's answers use; with `--json`, every word for a person goes to
  standard error. Rules out: a log line on standard output under
  `--json`; a field renamed in a minor release; a caller left to parse
  words. Not ruled out: a new major served beside the old for a release.
  Source: the user, 2026-11-01; the storage convention's rule 4.

**Does a command run from its arguments alone, and is a repeated write
harmless?** The user: no prompts, and a repeat adds nothing.

- **`no-prompts-repeats-add-nothing`** (requirement). Every command runs
  from its arguments, its settings and the ledger, and never reads an
  answer from its terminal; a write run again with the same arguments
  (the same name at the same version proposed, the same signal
  challenging the same claim) adds nothing and answers as the first
  did. Rules out: a confirmation prompt; a second identical event in the
  ledger; an agent stuck on a prompt it cannot answer. Not ruled out: a
  hardware key's touch or a biometric prompt for a person's signature,
  which is the key's and not boom's; `--dry-run` on any write. Source:
  the user, 2026-11-01.

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
