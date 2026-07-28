# AI Dev Tooling

AI-agent optimization tools used in this repo, what they do, and how they're wired for **GitHub Copilot** (the primary agent for this workspace).

## The tools

| Tool                                                    | What it does                                                                                                                                                                                                                                                      | Source                  |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [ripgrep](https://github.com/BurntSushi/ripgrep) (`rg`) | Fast recursive text search, respects `.gitignore`                                                                                                                                                                                                                 | BurntSushi/ripgrep      |
| [fd](https://github.com/sharkdp/fd)                     | Fast, friendlier alternative to `find`                                                                                                                                                                                                                            | sharkdp/fd              |
| [delta](https://github.com/dandavison/delta)            | Syntax-highlighting pager for `git diff`/`git blame`                                                                                                                                                                                                              | dandavison/delta        |
| [CodeGraph](https://github.com/colbymchenry/codegraph)  | Local, pre-built knowledge graph (Rust kernel) of every symbol/call-edge in the repo. Exposes an MCP tool (`codegraph_explore`) so an agent can answer "how does X reach Y" in one call instead of grepping file-by-file. 100% local, no code leaves the machine. | colbymchenry/codegraph  |
| [Caveman](https://github.com/JuliusBrussee/caveman)     | Compresses what the agent _says_ (terse replies), not what it builds. Code/commands/errors stay byte-exact.                                                                                                                                                       | JuliusBrussee/caveman   |
| [Ponytail](https://github.com/DietrichGebert/ponytail)  | Compresses what the agent _builds_ (YAGNI ladder: reuse > stdlib > native feature > dependency > one-liner > minimum code). Complements Caveman, no overlap.                                                                                                      | DietrichGebert/ponytail |

`rg`/`fd`/`delta` are plain CLI binaries — install once, use from any terminal. CodeGraph, Caveman, and Ponytail are agent-facing: they change how the AI agent searches, talks, and writes code in _this_ repo.

## How each is wired for GitHub Copilot

GitHub Copilot Chat (VS Code) has no third-party plugin system, so Caveman/Ponytail load as **always-on instructions**, and CodeGraph loads as an **MCP server**:

- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** — Caveman's terse-reply rules + Ponytail's lazy-dev YAGNI ladder, loaded automatically by Copilot Chat every session.
- **[AGENTS.md](AGENTS.md)** — same Caveman/Ponytail rules plus the CodeGraph usage note, for any agent that reads `AGENTS.md` (Copilot CLI, Codex, Amp, Jules, etc.) instead of/in addition to the Copilot-specific file.
- **[.vscode/mcp.json](.vscode/mcp.json)** — registers the CodeGraph MCP server for VS Code (Copilot's own installer doesn't support Copilot as a target, so this is wired by hand).
- **[.agents/skills/](.agents/skills/)** — reusable Copilot skills (Nx workspace/generators, CI monitoring, etc.), unrelated to Caveman/Ponytail, which ship as instructions rather than skills.

CodeGraph only activates once a project is indexed:

```sh
cd <project>
codegraph init      # builds .codegraph/, auto-syncs on file changes after
```

## Toggling Caveman / Ponytail

- `/caveman [lite|full|ultra|wenyan]` — set terseness level, or say "stop caveman" / "normal mode" to disable.
- Ponytail has no toggle command in instruction-only mode (Copilot Chat) — it's always active via the checked-in ruleset. Remove the `<!-- PONYTAIL_START -->...<!-- PONYTAIL_END -->` block from `.github/copilot-instructions.md` / `AGENTS.md` to disable it.

## Installing on Windows

Run [tools/install-ai-dev-tools.ps1](tools/install-ai-dev-tools.ps1) in PowerShell — installs `rg`/`fd`/`delta` via `winget`, CodeGraph/Caveman from their official installers, and Ponytail as a VS Code extension:

```powershell
pwsh -File tools/install-ai-dev-tools.ps1
```

## Installing on macOS / Linux

Run [tools/install-ai-dev-tools.sh](tools/install-ai-dev-tools.sh) in bash/zsh — uses Homebrew to install `rg`/`fd`/`delta`, pulls CodeGraph/Caveman from their official installers, and installs Ponytail as a VS Code extension:

```sh
./tools/install-ai-dev-tools.sh
```

Requires: Homebrew (install from https://brew.sh) and VS Code CLI `code` command (optional; you can install Ponytail manually from the VS Code Marketplace if `code` isn't available).

**Note:** Ponytail rules are also always active via [.github/copilot-instructions.md](.github/copilot-instructions.md) and [AGENTS.md](AGENTS.md), so the extension is optional but recommended for the enhanced VS Code UI.

## A note on trust

CodeGraph, Caveman, and Ponytail all run local installers (`curl | sh` / `irm | iex`) and, in CodeGraph's case, an MCP server with access to this repo. All three are open-source, MIT-licensed, and were verified against their GitHub repos before being wired in here:

- CodeGraph: npm provenance attestations + signed SLSA build attestations on every release.
- Caveman: no telemetry, no network calls after install (documented in its `SECURITY.md`).
- Ponytail: prompt-only, no runtime component beyond two small Node lifecycle hooks (Claude Code/Codex only).

If you add or update any of these, re-verify the source before running installers with repo/MCP access.
