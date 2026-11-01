{ pkgs, ... }:
let
  # treefmt's rustfmt: rustup's proxy, which runs the toolchain
  # rust-toolchain.toml names, the version .prototools pins, and installs
  # its rustfmt where a host's toolchain lacks it, so treefmt and the
  # crate's format task run one rustfmt (core.5, core.6).
  rustfmt = pkgs.writeShellApplication {
    name = "rustfmt";
    runtimeInputs = [ pkgs.rustup ];
    text = ''exec rustfmt "$@"'';
  };
in
{
  # A tracked file no formatter claims and no exclude names fails the check
  # (core.5): a new file type is decided in the change that adds it.
  settings.on-unmatched = "fatal";

  # What no formatter owns, each with its reason (core.5).
  settings.excludes = [
    # Prose: the docs, the records, the README and the site's pages, which
    # Vale checks (site:prose); no formatter here rewraps prose.
    "*.md"
    "*.mdx"
    # Written by cargo, devenv and bun in their own layouts.
    "*.lock"
    # Drawn marks and the README's diagram, which site:test holds to what
    # the site draws; no formatter keeps an SVG stable.
    "*.svg"
    # Vale's own configuration and word list, which no formatter reads.
    ".vale.ini"
    "styles/config/vocabularies/**"
    # Lists in gitignore syntax.
    ".gitignore"
    # The site's components: Biome formats only an .astro file's
    # frontmatter, and only experimentally; astro check reads them
    # (site:typecheck).
    "site/**/*.astro"
    # Empty markers that keep OpenSpec's empty directories in the tree.
    "**/.gitkeep"
    # Build outputs and caches.
    "target/**"
    ".devenv/**"
    ".moon/cache/**"
    "site/node_modules/**"
    "site/dist/**"
    "site/.astro/**"
    "site/shots/**"
  ];

  programs.rustfmt.enable = true;
  programs.rustfmt.edition = "2021";
  programs.rustfmt.package = rustfmt;

  programs.deadnix.enable = true;
  programs.nixfmt.enable = true;
  settings.formatter.deadnix.pipeline = "nix";
  settings.formatter.deadnix.priority = 1;
  settings.formatter.nixfmt.pipeline = "nix";
  settings.formatter.nixfmt.priority = 2;

  # shellcheck lints the shell scripts, then shfmt lays them out.
  programs.shellcheck.enable = true;
  programs.shfmt.enable = true;
  programs.shfmt.indent_size = 2;
  settings.formatter.shellcheck.pipeline = "shell";
  settings.formatter.shellcheck.priority = 1;
  settings.formatter.shfmt.pipeline = "shell";
  settings.formatter.shfmt.priority = 2;

  # .prototools is TOML under a name with no extension.
  # Biome lays out the site's TypeScript, JavaScript, CSS and JSON by the
  # settings biome.json holds, the ones site:format checks and site:lint
  # lints by, so the two never differ. Biome is the package devenv.nix puts
  # in the shell.
  settings.formatter.biome = {
    command = "${pkgs.biome}/bin/biome";
    options = [
      "format"
      "--write"
      "--no-errors-on-unmatched"
    ];
    # treefmt's * crosses directories: each names every such file under
    # site/, its dependencies and outputs excluded above.
    includes = [
      "biome.json"
      "site/*.ts"
      "site/*.mjs"
      "site/*.css"
      "site/*.json"
    ];
  };

  programs.taplo.enable = true;
  settings.formatter.taplo.includes = [ ".prototools" ];
  programs.yamlfmt.enable = true;
  programs.yamlfmt.settings.formatter = {
    type = "basic";
    retain_line_breaks_single = true;
  };
}
