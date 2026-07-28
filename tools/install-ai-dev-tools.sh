#!/bin/bash
# Install AI development tools for Linux/macOS using Homebrew
# Installs: ripgrep, fd, delta, codegraph, caveman
# Ponytail is VS Code Copilot Chat plugin only

set -e

echo "=== AI Dev Tools Installer (macOS/Linux) ==="
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
  echo "❌ Homebrew not found. Install from https://brew.sh"
  exit 1
fi

echo "✓ Homebrew found"
echo ""

# Ripgrep
echo "Installing ripgrep (rg)..."
if brew list ripgrep &>/dev/null; then
  echo "  → Already installed"
else
  brew install ripgrep
fi

# fd
echo "Installing fd..."
if brew list fd &>/dev/null; then
  echo "  → Already installed"
else
  brew install fd
fi

# delta
echo "Installing delta..."
if brew list delta &>/dev/null; then
  echo "  → Already installed"
else
  brew install delta
fi

echo ""
echo "Installing CodeGraph..."
if command -v codegraph &> /dev/null; then
  echo "  → Already installed"
else
  echo "  Downloading CodeGraph installer..."
  bash <(curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh)
fi

echo ""
echo "Installing Caveman..."
if command -v caveman &> /dev/null; then
  echo "  → Already installed"
else
  echo "  Downloading Caveman installer..."
  bash <(curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh)
fi

echo ""
echo "Installing Ponytail (VS Code extension)..."
if command -v code &> /dev/null; then
  code --install-extension Volvo-AntoniaCanizares.ponytail-vscode
else
  echo "  ⚠ VS Code not found in PATH — install manually from VS Code Marketplace"
  echo "    Visit: https://marketplace.visualstudio.com/items?itemName=Volvo-AntoniaCanizares.ponytail-vscode"
fi

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Installed tools:"
echo "  ✓ ripgrep (rg)      — Fast recursive search"
echo "  ✓ fd                — Find alternative"
echo "  ✓ delta             — Syntax-highlighting diff pager"
echo "  ✓ codegraph         — Code-to-code exploration (MCP server)"
echo "  ✓ caveman           — Token-efficient output compression"
echo "  ✓ ponytail          — VS Code extension for lazy-dev mode"
echo ""
echo "Next steps:"
echo "  1. Run 'codegraph init' in your project root"
echo "  2. Reload VS Code (codegraph MCP will auto-detect .vscode/mcp.json)"
echo "  3. Ponytail rules are already active via .github/copilot-instructions.md"
echo ""
