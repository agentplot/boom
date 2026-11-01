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
  repository and cited here only by date and words
  (`core.private-sources-by-words`): the design
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
- **`number-given-at-acceptance`** (requirement). A number a reader
  sees, a decision record's 0007 or a clause's 12, is given from the
  order of first acceptance on the ledger's one-line history, never
  taken on a branch, never changed once given, and never used as an id
  or in a citation, so a landing beside another renumbers nothing. boom
  writes a decision record's file as `NNNN-<name>.md`, MADR's naming,
  with the number it gave (`decision-files-numbered-at-acceptance`).
  Source: the user, 2026-11-01, (3), and the import topic below.
- **`legacy-number-alias`** (requirement). A decision record imported
  from another tool keeps its old number, cited only as legacy
  (`legacy-numbers-kept-count-goes-on`). Source: the user, 2026-11-01,
  (3), and the import topic below.
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

- **`ordinal-per-kind-ledger-wide`** (requirement). A record's number is
  its place among the records of its kind, by first acceptance on the
  ledger's branch, counted on from the highest number the ledger holds,
  and it never changes once given. Rules out: a number that shifts when
  a claim is re-attached or a view is filtered; a number for a proposed
  or rejected record; a superseded record losing its number; an
  amendment taking a new one. Not ruled out: gaps in a view of one
  scope; a view that shows no number. Source: the user, 2026-11-01.

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
  or two items of the statement share a name. Record 0001 keeps its file
  and core.1 to core.6 their ids, as legacy aliases cited only as
  legacy. Once boom keeps these records, it writes them as any project's
  (`decision-files-numbered-at-acceptance`). Rules out: the `adrs`
  command line's next number taken on a branch; a number in a new
  record's filename, a frontmatter field, an id or a citation while
  records are still made on branches; a check that holds records to
  unique numbers. Source: the user, 2026-11-01, here and in the import
  topic.

**The rule for `core.md`.** The user kept it, in the wording settled with
the import topic.

- **`core.names-not-numbers`** (rule, for `core.md`). A record, a rule,
  a clause, an invariant or a scenario is identified by a name fixed
  when it is written and unique in its repository, and every citation
  names it; a number is given only from the order things were accepted
  or landed on a line never rewritten, never taken on a branch, never
  changed once given, and never used as an id or a citation. Rules out:
  a branch's records numbered "after the last" and renumbered when main
  moves, as another repository's interview renumbered 22 records and 75
  rules twice, rewriting every citation; the `adrs` command line's next
  number taken on a branch; `core.12` as a new rule's id; a citation by
  number. Not ruled out: record 0001 and core.1 to core.6, cited only as
  legacy; a number on a page, computed from main's order; boom writing
  `0007-<name>.md` with the number it gave at acceptance. Source: the
  user, 2026-11-01.

## The ledger's storage and merge behaviour

### What the material settles

- The ledger is plain-text recfiles in git, written by boom directly,
  and a rejected push is applied again and retried (decision 24 of the
  design's log; record 0001: the format is open so a project trusts that
  it owns its history).
- Order is the ledger's history, one line, and no status depends on a
  clock (the change's record on events, ruling Q2).
- The family's storage convention, kept in a private repository and
  cited here by its words alone (`core.private-sources-by-words`): five
  layers (host, worktree, clone, shared branch, content), a piece of state in the lowest layer that
  holds every reader it has; one protocol for writing a shared branch
  (its 5.2); recutils at rest on a shared branch, each record naming
  `format: <tool>-<record>/<n>`, JSON only in flight; a repository's
  declaration in `.config/<tool>.toml`; and its rule 2, that a tool's
  records about one repository stay with that repository.

### Asked

**Where does a ledger live, and where may an event be written?** The
user: "As long as this is grounded in the storage rules we established
for the flywheel tools, I believe. This is under [a private
repository's] design I think." boom was then set against that
convention, and the user kept it.

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
  with `recsel`, with no boom; an owner reverting the bad commit.
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

### What the material settles

- **`mcp-is-the-commands`** (requirement). `boom mcp` is an MCP server
  on standard input and output that an agent's harness starts; its
  tools are boom's commands, each taking the command's arguments and
  returning its `--json` object. Source: the design's surfaces; the
  site's integrations page.
- **`claude-code-plugin-three-moments`** (requirement). The Claude Code
  plugin is `boom mcp` and the three moments an agent meets the ledger:
  drawing out claims and narratives while it plans, at the destination's
  grain (a claim survives a rewrite of the code, names what someone
  could observe, can be judged from the repository alone, and never
  names a file, a colour, a setting or a step of a pipeline); looking up
  what applies before it edits; running `boom check` before it hands
  off. Source: the same; the change's record on the records.

### Asked

**Does `boom mcp` leave out every act only a person may do, and does it
serve judge, reconcile and sync?** The user: no person's act at all.

- **`mcp-serves-no-persons-act`** (requirement). Each of `boom mcp`'s
  tools is one of boom's commands, run by the same code and answering
  the same JSON, and no tool exists without its command; no tool
  performs an act that needs a person's signature. Served: propose,
  supersede, annotate, challenge, query, check, backlog, render, judge,
  reconcile, sync. Absent: accept, reject, `check --answer`, and every
  owner's act. Rules out: a tool that sets off a person's key prompt for
  an agent's call; logic in the MCP layer that its command lacks. Not
  ruled out: a tool answering, as text, that a person must accept and
  with which command. Source: the user, 2026-11-01.

**Are the plugin's three moments skills or hooks?** The user: skills,
and a hook before edits.

- **`hook-before-each-edit`** (requirement). Before an agent edits a
  file, the Claude Code plugin's hook gives it the standing claims whose
  scope holds that file, by `boom query`, with no model; drawing out
  claims and running `boom check` before hand-off are skills. Rules out:
  an edit to a file in a claim's scope with no claim shown to the
  agent; the hook calling a model or writing the ledger. Not ruled out:
  the hook staying silent where no claim applies; flume also putting the
  claims in the task at launch. Source: the user, 2026-11-01.

**What does the herdr plugin show, and do its keys act?** The user: what
waits on the person and what applies.

- **`herdr-shows-what-waits-and-applies`** (requirement). The herdr
  plugin shows, for each agent pane, the claims in scope of its last
  edit and its last check's outcome, and for the workspace, the
  proposals waiting on the person and the unclear checks to answer; its
  one acting key opens the waiting list in the person's own pane, where
  `boom accept` runs and the key's presence prompt signs it. It reads
  boom only by `boom ... --json`. Rules out: a key that accepts from an
  agent's pane; herdr reading the ledger's files. Not ruled out: an
  agent seeing the same counts. Source: the user, 2026-11-01. This
  settles the change's question of what the herdr plugin shows.

**Where do the plugins live?** The user: in this repository.

- **`plugins-in-this-repository`** (rule). The Claude Code plugin and
  the herdr plugin live in this repository, each under `plugins/<name>`
  as a moon project of its own with its language declared and a format,
  lint, type check and test task each (core.5); each calls boom by its
  command line or `boom mcp`, never its code, names the boom release it
  needs and ships with that release. Rules out: a plugin with no project
  of its own; a plugin linking boom's library. Not ruled out: a
  marketplace entry that points here. Source: the user, 2026-11-01.

## sluice, flume and millpond, by boom's command line

### What the material settles

From the user's ruling of 2026-11-01 on millpond (both directions, the
backlog only where no other planner plans), decisions 40 and 42, and the
change's profiles:

- **`tools-call-commands`** (requirement). boom reads no other tool's
  files, and every exchange with another tool is a command and its
  output; boom runs none of sluice, flume or millpond.
- **`sluice-gates-with-check`** (requirement, profile). sluice runs
  `boom check --base main` as a moon task in a layer the branch
  requires, the slice among its inputs, so moon replays an unchanged
  check; in sluice's verdict it is one row.
- **`flume-asks-what-applies`** (requirement, profile). Before work,
  flume asks `boom query <paths> --json` and puts the standing claims and
  the rules for that scope in the agent's task; claims proposed during a
  run reach the ledger by `boom propose` with the run as provenance.
- **`millpond-both-ways`** (requirement, profile). A millpond signal
  that bears on a claim reaches boom as `boom challenge <name> --signal
  <key>` or as `boom propose` with the signal as provenance; millpond
  takes `boom backlog --planner millpond --json` in as items, each entry
  once by its key, only for the repositories whose planner setting names
  it; a repository naming another planner has none of its backlog taken
  in by millpond; proposals awaiting a person show as millpond signals
  where millpond is the planner.

### Asked

**Who runs `boom reconcile` and `boom judge` in the family?** The user:
both, after each landing.

- **`reconcile-and-judge-after-each-landing`** (requirement, profile).
  After each landing on a repository's main, what runs after a landing
  there runs `boom reconcile` and then `boom judge` for that
  repository, in the background, a failure reported beside the landing
  and never making it not landed (sluice 122); a host's schedule runs
  both for every repository it holds, so a quiet one converges. Rules
  out: a landing citing a claim whose cell waits on a person to run the
  judge; the judge run inside the gate, since a check writes no verdict.
  Not ruled out: a person, millpond or flume running either by its
  command line. Source: the user, 2026-11-01.

**How does the claim a backlog entry names reach the commits of the
work that serves it?** The user first asked: "I'm not sure I understand
this one. How is flume going to know about the citation?" It would not:
the claim reaches flume only as words in a brief. Asked again with the
ways it could travel, the user took a field of the launch.

- **`claims-travel-in-the-launch`** (requirement, profile). A launch
  may name the claims its work serves, each at its version; flume puts
  `Claim: <name>@<version>` on every commit the place lands; millpond's
  send fills it from the backlog entry. boom is unchanged by it: a
  landing citing a claim makes its cell due, and the judge clears the
  entry. Rules out: the citation resting on an agent copying a line from
  a brief; boom reading flume's or millpond's files. Not ruled out: an
  agent citing a claim on its own; any other launcher doing the same.
  Source: the user, 2026-11-01. This needs a launch field in flume's
  statement and millpond's send filling it, which are their own changes.

**How does each caller know the boom it calls answers as it expects?**
The user: pin and refuse.

- **`callers-pin-boom`** (rule, across the family). A tool that calls
  boom pins boom's release where it pins its other tools (core.6, across
  tools) and refuses, naming both, an answer whose format major it was
  not built for. Rules out: a caller running whatever boom is on the
  path; a caller reading a newer major as if it were its own. Not ruled
  out: a caller accepting fields it does not know within its major.
  Source: the user, 2026-11-01.

### Open

- **`open-after-landing-step`**. sluice's statement reports work after a
  landing (a release, a notification) apart from the outcome (122), but
  names no general step that runs a repository's command after a
  landing; whether sluice offers one, or a host's watcher runs boom on
  each landing it sees, is sluice's to settle.

## Importing existing decision records

### What the material settles

- **`import-once`** (requirement). `boom import adr <dir>` reads a
  folder of MADR files once: each file's title becomes a decision's
  statement, its sections the body, its status and date its history,
  and a "superseded by" link a supersession; afterwards boom writes the
  records and the old tool writes none. Source: decision 33 of the
  design's log; the site's import walkthrough.
- **`import-names-from-files`** (requirement). An imported decision's
  name is its file's title part (`amounts-as-floats` from
  `0002-amounts-as-floats.md`), held to `one-name-space`: an import that
  would bring a name the ledger already holds is refused, naming it, for
  the importer to name it otherwise. Source: `one-name-space`.

### Asked

**Whose accept does an import record?** The user: the import proposes,
and a person accepts.

- **`import-proposes-a-person-accepts`** (requirement). An import
  proposes and accepts nothing. Each imported decision is proposed with
  the file's own status, date, deciders and path as its provenance, and
  stands only by a person's signed accept under
  `accept-by-role-never-agent-never-author`; one command may accept the
  batch, one signed event each. A file the old tool marked superseded
  comes in as history only, named by its successor, and never stands.
  Rules out: an unsigned accept written by the import; the importer
  accepting what they imported. Not ruled out: an agent running the
  import for a person to accept. Source: the user, 2026-11-01. This
  settles the change's question of whose accept an import records.

**What scenario does an imported decision get?** The user: one drafted,
and read on accept.

- **`import-drafts-scenarios`** (requirement). An imported decision is
  proposed with at least one scenario an agent drafted from its outcome
  and consequences, marked as drafted at import; the person who accepts
  it reads it with the rest. Rules out: a claim with no scenario; an
  exception in the status function for imports. Not ruled out: a person
  rewriting the scenario later, as an amendment; a superseded file,
  history only, with none. Source: the user, 2026-11-01. This settles the
  change's question of an imported decision's scenario.

**What are decision records' files called?** Asked first about the
legacy files, the user said: "I thought the numbering was part of how
MADR did it." Asked again with MADR's naming laid out, the user said:
"I'm confused. I thought an ADR was supposed to have a number because
we're creating them with the CLI tool now and they're all getting
numbered." The words the change was sent back with were quoted back:
"(3) any number a reader sees (an ADR's 0007, a clause's 12) is a
display ordinal derived on render from the order of acceptance on the
default branch, never written into a filename, a citation or a record,
so a landing beside another never renumbers anything". The collision
comes from a number taken on a branch, as the `adrs` command line takes
the next one, and boom, which gives a number at acceptance on a line
never rewritten, need not take one there. Asked again on that footing,
the user took numbered files for boom, names in this repository until
boom keeps it, the legacy numbers kept, and the rewording of
`core.names-not-numbers` above.

- **`decision-files-numbered-at-acceptance`** (requirement). A decision's
  number is given when it is first accepted, from the ledger's one-line
  history, and never changes; `boom sync` writes the decision as
  `NNNN-<name>.md`, MADR's naming, with MADR's frontmatter and sections;
  citations name the record (`money-has-currency`), never its number.
  Rules out: a number taken on a branch, "next after the last"; a number
  changed once given; a citation by number. Not ruled out: the number
  shown in views and on pages. Source: the user, 2026-11-01.
- **`legacy-numbers-kept-count-goes-on`** (requirement). An imported
  decision keeps its old number as its number, and its file its name;
  boom's count goes on from the highest number the ledger holds, so in
  the usual case of one repository imported, 0001 to 0004 keep theirs
  and the next decision accepted is 0005. An import whose old numbers
  the ledger has already given is refused, naming them, unless the
  importer has them numbered on from the count, their old numbers kept
  as aliases. Rules out: two decisions with one number in a ledger; an
  imported number silently changed; a number taken on a branch. Not
  ruled out: citing a legacy number, as legacy. Source: the user,
  2026-11-01.
- This repository, meanwhile: names now and numbers on the site, as
  `boom-names-everything-now` has it, record 0001 keeping its file. The
  user, 2026-11-01.

## What stays out of this repository

These are rules for this repository, the public one that holds boom,
and not rules boom applies to the repositories it describes.

### What the material settles

- core.4: "Nothing commercial, no pricing, tier, customer or hosted
  service, appears in this repository." The change's brief kept out
  more: a hosted service, the cloud, the paid product and its planning,
  pricing, tiers, an audit business and the family's umbrella name.
- The change's design cites the private sources by date and words
  ("the design session of 2026-10-31", "decision 40 of the design's
  log"), never by a path, and adds no word list to the tree, since one
  would name what it forbids.

### Asked

The first questions were too terse; the user asked whether they were
about the repository holding boom or about boom's rules for other
repositories, and they were put again with their context: all four are
about this repository.

**Should core.4 name, by kind, everything the brief kept out?** The
user: "Maybe a little but no. It's dumb not to mention the umbrella name
or paid product names, like we're going to have this site as part of
the whole family. The things that should be kept out would be strategy
for paid tiers or how things we do in Boom might limit or get people to
a paid product."

- **`core.no-commercial-strategy`** (rule, for `core.md`, rewording
  core.4). No commercial strategy appears in this repository: no
  pricing, no plan for a paid tier, no customer, and nothing saying how
  boom's design limits what it does alone or leads its users to a paid
  product. The family's umbrella name and its products, paid ones among
  them, may be named, since the site is part of the family's. Rules
  out: a tier's price or what a tier holds; a design choice explained by
  what it sells; a customer named. Not ruled out: naming the umbrella or
  a paid product; saying that a paid product works with boom by boom's
  command line, as any caller does. Source: the user, 2026-11-01; record
  0001. Core.4 keeps its id as a legacy alias.

**How may a record, the statement or a page cite a private source?** The
user: "fine", to citing by date and words.

- **`core.private-sources-by-words`** (rule, for `core.md`). A source
  kept in a private repository is cited by its date and its words, and
  any number it gives, never by a path, a repository's name or a link a
  reader cannot open. Rules out: `~/Code/...` or a private repository's
  name in a record, a page or a commit; a link a reader cannot open. Not
  ruled out: "the design session of 2026-10-31"; a public repository's
  path and clause, such as sluice's statement, 122. Source: the user,
  2026-11-01.

**Should the gate check any of this?** The user: "we don't need a check
yet." Review holds `core.no-commercial-strategy` and
`core.private-sources-by-words` for now.

**This branch's earlier commits held a private repository's path; if
the notes land, how?** The user: "i'm not worried." Nothing is done to
the branch's history.

## What the change must take in

For the change `boom-is-designed-in-its-own-records`, so its construct
can be run again with what this interview settled. Each line names the
items above it rests on.

### Its brief

- Replace the brief's list of what to keep out (no hosted service,
  cloud, paid product, umbrella name and so on) with
  `core.no-commercial-strategy`: the umbrella name and the family's
  products, paid ones among them, may be named; what stays out is
  pricing, a paid tier's plan, customers, and anything saying how boom's
  design limits what it does alone or leads its users to a paid
  product. Private sources are cited by date and words
  (`core.private-sources-by-words`), as the design already does.
- "keeper" becomes "owner" in every file it writes (`owner-is-the-word`).

### Names, not numbers, in this repository (its D1, D3, D4, D5 and both specs)

- Records are `docs/adr/<name>.md`, each name short and kebab, chosen
  when the record is written; the frontmatter names the record and
  holds no number; a record cites another as `record <name>`; record
  0001 keeps its file, cited only as legacy (`boom-names-everything-now`).
- The statement's clauses, invariants and scenarios each open with a
  name and are anchored by it; a citation names them, `(status-from-events,
  record five-records)`; no number is written into the file.
- New rules in `core.md` are `core.<name>`; core.1 to core.6 keep their
  ids as legacy aliases.
- `root:adrs` and `root:statement` hold names unique (two records, two
  rules or two items of the statement under one name fail `check-fast`
  on the candidate) and citations resolving to names; nothing holds a
  number unique. The fixtures and the `design-statement` spec change to
  match; records stop being made with the `adrs` command line's next
  number.
- The site shows numbers ("Record 0002", "Clause 12") computed at build
  from the order each item landed on main, and anchors each item by its
  name (`#status-from-events`); the `design-pages` spec changes to match.
- `CLAUDE.md`'s line sending a rule to `core.md` "with an id, the next
  free number in its area" sends it with a name.
- `core.md` gains `core.names-not-numbers`, in the wording above, as the
  send-back asked. `core.no-commercial-strategy` (rewording core.4),
  `core.private-sources-by-words`, `plugins-in-this-repository` and
  `callers-pin-boom` go to `core.md` with them, or in the separate step
  that draws `core.md` from the records, as the user chooses.

### The records it writes

Changes to the nine it plans:

- **The records** (its 0002): `one-name-space`; `identity-fixed-at-proposal`;
  `ordinal-per-kind-ledger-wide` and `number-given-at-acceptance`.
- **The events** (its 0003): `amend-names-its-base`;
  `retire-attach-and-rules-need-a-person`, which settles withdrawing a
  claim and moving an attachment, and adds a check rule's change to
  what a person accepts; `validated-on-read`.
- **Verdicts** (its 0004): `verdicts-beside-the-claims`, as a named
  departure from the storage convention's rule 2.
- **Reconciling and judging** (its 0005): `no-lease-recheck-at-the-tip`;
  `reviewer-is-an-agent-command` for the judge;
  `reconcile-and-judge-after-each-landing` as the family's profile.
- **The check** (its 0006): `reviewer-is-an-agent-command`,
  `unreached-is-not-run`, `answers-signed-in-the-tree`,
  `slice-only-as-the-ledger-gives`.
- **Who accepts** (its 0008): `persons-acts-signed-with-presence`,
  `self-registered-first-owner`, `owner-is-the-word`,
  `mcp-serves-no-persons-act` (every act needing a person's signature
  absent, not only accept and reject).
- **millpond** (its 0009) and **its planner setting** (its D8): the
  planner is a ledger setting an owner signs
  (`ledger-settings-owner-signed`), not a line of a `.config/boom.toml`;
  `claims-travel-in-the-launch` in the loop's description.

New records for decisions the nine do not hold, each accepted by the
user on 2026-11-01:

- **`names-not-numbers`**: identity and numbering, from the first topic
  and the import topic.
- **`the-ledger-on-a-shared-branch`**: `ledger-on-a-shared-branch`,
  `ledger-written-by-the-family-protocol`, `records-name-their-format`,
  `boom-state-by-layer`, `caches-derived-only`.
- **`a-persons-act-is-signed`**: the proof, owners and the first owner,
  and `ledger-settings-owner-signed`.
- **`the-command-line-contract`**: `exit-codes`, `json-versioned-additive`,
  `no-prompts-repeats-add-nothing`, `callers-pin-boom`.
- **`the-surfaces`**: `mcp-serves-no-persons-act`, `hook-before-each-edit`,
  `herdr-shows-what-waits-and-applies`, `plugins-in-this-repository`.
- **`sync-by-one-pull-request`**, with sluice's pull-request profile.
- **`import-proposes-for-a-person`**: `import-proposes-a-person-accepts`,
  `import-drafts-scenarios`, `import-names-from-files`,
  `decision-files-numbered-at-acceptance`,
  `legacy-numbers-kept-count-goes-on`.
- **`no-commercial-strategy-here`**: `core.no-commercial-strategy` and
  `core.private-sources-by-words`.

### The statement

- Vocabulary: **owner** for the change's keeper; **operator** as the
  family's word.
- Part A gains a clause for each requirement above that is boom's own,
  citing its record by name.
- Part B: B.1 the store takes the shared-branch protocol's guarantee; B.5
  the actor binds to `persons-acts-signed-with-presence`; B.6 and B.8
  take `slice-only-as-the-ledger-gives` and `unreached-is-not-run`.
- Part C: C.1 the store, the family's shared branch under `boom/`; C.4
  the actor, a key registered to each person that signs with them
  present, its format open; C.5 the gate, exit 3 as the policy's
  not-run; C.6 reconcile and judge after each landing, and claims
  travelling in the launch; C.8 the surfaces as `the-surfaces` has them.
- Section 10 loses the questions this interview settled: where the
  ledger lives for one repository (a branch of it); how boom tells a
  person's act from an agent's; how a claim is withdrawn and an
  attachment moved; which model judges and reviews (an owner's setting);
  where an answer to an unclear check is kept; what keeps a change from
  editing its slice; an imported decision's scenario and whose accept
  an import records; what the herdr plugin shows. It keeps: the layout of
  boom's files under `boom/`; `open-signature-format`;
  `open-sync-without-pull-requests`; `open-after-landing-step`; whether
  the map needs parts finer than a context; what a check rule looks
  like; what a proposal spanning repositories with different planners
  shows where; the name.

### The site

- **Commands**: exits 0 to 3; each `--json` answer naming its format, a
  refusal as an object; `boom accept` signed with the person present;
  `boom check --answer` writing a signed answer under `.boom/answers/`;
  `boom mcp`'s tools as `mcp-serves-no-persons-act` lists them; `boom
  sync` opening one ready pull request; `boom import adr` proposing, with
  drafted scenarios and its numbers kept.
- **Configuration**: the ledger as a branch under `boom/` with each
  record naming its format; the ledger's settings (repositories,
  remotes, planners, reviewer and judge) as owner-signed events, not a
  `[repositories]` table; host settings under `$XDG_CONFIG_HOME/boom/`;
  a repository's `.config/boom.toml` naming only its ledger.
- **Integrations**: the hook before each edit; herdr's view and key;
  reconcile and judge after each landing; claims in the launch.
- **The import walkthrough**: the agent proposes the import, Ada
  accepts, the scenarios drafted; 0001 to 0004 keep their numbers and
  the next decision is 0005, written `0005-money-has-currency.md`.
- **The roadmap**: section 10's questions as above.

### Outside this change

- flume: a launch field naming the claims its work serves, and the
  `Claim:` trailer on the place's commits (`claims-travel-in-the-launch`).
- millpond: its send filling that field from a backlog entry.
- sluice: a step that runs a repository's command after each landing,
  or a host's watcher doing it (`open-after-landing-step`).
