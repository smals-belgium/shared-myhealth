/**
 * copy-dist-assets.mjs
 *
 * Copies LICENSE.md from the workspace root and all *.md files from the
 * package root into the package's dist folder.
 *
 * Usage (run from the package root):
 *   node ../../tools/copy-dist-assets.mjs
 */

import { copyFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const workspaceRoot = new URL('../../', import.meta.url).pathname.replace(
  /^\/([A-Z]:)/,
  '$1',
);
const packageRoot = process.cwd();
const distDir = join(packageRoot, 'dist');

// Copy workspace LICENSE.md
copyFileSync(join(workspaceRoot, 'LICENSE.md'), join(distDir, 'LICENSE.md'));

// Copy all *.md files from the package root
for (const file of readdirSync(packageRoot)) {
  if (file.endsWith('.md')) {
    copyFileSync(join(packageRoot, file), join(distDir, file));
  }
}

console.log('dist assets copied.');
