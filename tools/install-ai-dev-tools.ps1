#!/usr/bin/env pwsh
# Installs the AI-agent optimization toolchain used by this repo on Windows.
# See AI-TOOLING.md at the repo root for what each tool does and why.
#
# Usage:  irm file://install-ai-dev-tools.ps1 | iex   (or just run it locally)
#         pwsh -File tools/install-ai-dev-tools.ps1

$ErrorActionPreference = "Stop"

function Test-Command($name) {
    return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command "winget")) {
    Write-Error "winget not found. Install 'App Installer' from the Microsoft Store, then re-run."
    exit 1
}

Write-Host "== CLI search tools (via winget) ==" -ForegroundColor Cyan
winget install -e --id BurntSushi.ripgrep.MSVC   # rg
winget install -e --id sharkdp.fd                # fd
winget install -e --id dandavison.delta          # delta (diff pager)

Write-Host "== CodeGraph (github.com/colbymchenry/codegraph) ==" -ForegroundColor Cyan
irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex
# Wires the MCP server into agents it auto-detects (Claude Code, Cursor, Codex CLI,
# opencode, Hermes Agent). It does NOT support GitHub Copilot as an install target -
# this repo wires Copilot manually via .vscode/mcp.json instead.
codegraph install --target=auto --yes
# Per-project index (run again inside any project you want indexed):
#   cd <project>; codegraph init

Write-Host "== Caveman (github.com/juliusbrussee/caveman) ==" -ForegroundColor Cyan
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex

Write-Host "== Ponytail (VS Code extension) ==" -ForegroundColor Cyan
if (Test-Command "code") {
    Write-Host "Installing Ponytail VS Code extension..." -ForegroundColor Cyan
    code --install-extension Volvo-AntoniaCanizares.ponytail-vscode
} else {
    Write-Host "VS Code not found - you can install Ponytail manually from VS Code Marketplace." -ForegroundColor Yellow
    Write-Host "Visit: https://marketplace.visualstudio.com/items?itemName=Volvo-AntoniaCanizares.ponytail-vscode" -ForegroundColor Yellow
}
Write-Host "Note: Ponytail rules are also checked into .github/copilot-instructions.md and AGENTS.md" -ForegroundColor Yellow
Write-Host "in this repo and will be active even without the extension." -ForegroundColor Yellow

Write-Host "`nDone. Restart your editor/agent so MCP servers and instructions reload." -ForegroundColor Green
