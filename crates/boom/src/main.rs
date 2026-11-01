//! `boom`, the claims ledger. For now it answers `--version`
//! and nothing else.

use std::process::ExitCode;

/// What `boom --version` prints.
fn version() -> String {
    format!("boom {}", env!("CARGO_PKG_VERSION"))
}

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    match args
        .iter()
        .map(String::as_str)
        .collect::<Vec<_>>()
        .as_slice()
    {
        ["--version"] | ["-V"] => {
            println!("{}", version());
            ExitCode::SUCCESS
        }
        _ => {
            eprintln!("usage: boom --version");
            ExitCode::from(2)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::version;

    #[test]
    fn version_names_the_binary_and_the_crate_version() {
        assert_eq!(version(), format!("boom {}", env!("CARGO_PKG_VERSION")));
    }
}
