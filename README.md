# boom

A ledger of what a project has claimed about itself: its invariants,
its decisions and its assumptions, each recorded with who proposed it,
who accepted it and what it replaced. Its rules for a scope, its
decision records, its design book and its context map are views
computed from the ledger, and `boom check` reads the work against the
claims that hold.

boom is being designed, not built. For now its binary prints its
version:

    devenv shell -- cargo run -p boom -- --version

The rules every change keeps are `docs/architecture/core.md`; the
decisions behind them are `docs/adr/`. The checks are moon tasks, run
in the devenv shell: `devenv shell -- moon run :#check-fast`.
