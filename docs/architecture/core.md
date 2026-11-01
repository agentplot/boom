# boom rules

The rules that bind wherever a change is made in this repository,
written so a reviewer can point at a diff and say which rule it breaks.
boom keeps a ledger of what a project has claimed about itself and
computes every view of it. There are no area pages yet; a rule that
binds only one part of the tree moves to an area page when that part
exists.

## Rules

### The ledger

- **[core.1]** A record's status is read from its events, never stored on the record, and an event is appended, never changed or removed.
- **[core.2]** A view, a scope's rules, a decision record, a design book or a context map, is computed from the ledger and never stored as the truth.

### Secrets and records

- **[core.3]** No token, key or credential is in the repository: none is committed, none is a default in code, configuration or tests.
- **[core.4]** Nothing commercial, no pricing, tier, customer or hosted service, appears in this repository.

### The gate

- **[core.5]** Every file the tree tracks is owned by a formatter the gate runs, or is excluded by name with its reason; every crate, and the site, is a moon project of its own, listed in `.moon/workspace.yml` with its language declared, whose check-fast tasks format, lint, type-check and test it, one task per check.
- **[core.6]** Every tool a gate task runs is the version the tree pins, on every host that runs the gate.

## Details

- **core.1** Rules out: a status field on a claim; an event edited or deleted to change a status; a supersession that rewrites the claim it replaces. Not ruled out: a new event that supersedes, rejects or annotates. Source: record 0001.
- **core.2** Rules out: a rendered constitution, design book or context map committed and read back as input. Not ruled out: a view written to a build directory or published. Source: record 0001.
- **core.3** Rules out: a credential in a tracked file, a fixture or a commit message; a credential printed in output. Not ruled out: the name of the variable or file a credential is read from. Source: record 0001.
- **core.4** Rules out: pricing, a tier, a customer or a hosted plan named in code, docs, the site or commits. Source: record 0001.
- **core.5** Rules out: a file type treefmt neither formats nor excludes; an exclude with no comment saying why; a crate or the site with no project of its own; one task bundling several checks. Source: record 0001; flume's core.21, the pattern this repository copies.
- **core.6** Rules out: a tool a task finds outside its pin; a pinned toolchain without a component a task runs; two files pinning one tool with no check that fails when they differ. Source: flume's core.22.
