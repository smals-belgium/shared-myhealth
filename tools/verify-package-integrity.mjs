/**
 * verify-package-integrity.mjs
 *
 * Verifies that a set of required files are present both in the local dist
 * directory and in the npm pack dry-run output before publishing.
 *
 * Usage (run from the package root):
 *   node ../../tools/verify-package-integrity.mjs \
 *     dist/theme.css \
 *     dist/LICENSE.md \
 *     dist/custom-elements.json
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const requiredFiles = process.argv.slice(2);

if (requiredFiles.length === 0) {
  console.error('Usage: verify-package-integrity.mjs <file1> [file2] ...');
  process.exit(1);
}

// ── 1. Check files exist in dist ────────────────────────────────────────────

const missingDistFiles = requiredFiles.filter(f => !existsSync(f));

if (missingDistFiles.length > 0) {
  console.error('Missing files in dist:');
  for (const f of missingDistFiles) console.error(`  - ${f}`);
  process.exit(1);
}

// ── 2. Check files are included in the npm pack artifact ────────────────────

const npmPackJson = execSync('npm pack --dry-run --json', {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});

const packResult = JSON.parse(npmPackJson);
const packedFiles = new Set((packResult[0]?.files ?? []).map(f => f.path));

const missingPackedFiles = requiredFiles.filter(f => !packedFiles.has(f));

if (missingPackedFiles.length > 0) {
  console.error('Missing files in npm pack output:');
  for (const f of missingPackedFiles) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `Package integrity check passed (${requiredFiles.length} file(s) verified).`,
);
