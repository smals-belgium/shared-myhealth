import path from 'node:path';

export default function (config) {
  const workspaceRoot = path.join(import.meta.dirname, '..', '..');
  const componentsDist = path.join(
    workspaceRoot,
    'packages',
    'design-kit',
    'dist',
  );

  config.addPassthroughCopy({ [componentsDist]: 'assets/design-kit' });
  config.addPassthroughCopy('src/styles');
  config.addPassthroughCopy('src/scripts');

  // design-kit's dist build treats `lit` (and its sub-packages) as an
  // external dependency, so its bare `import 'lit'` specifiers only resolve
  // in a bundler-based consumer (Vite, Angular, ...). Docs is a plain static
  // site with no bundler, so we vendor lit's own package folders here and
  // resolve the bare specifiers via an import map (see layout.njk).
  for (const pkg of [
    'lit',
    'lit-html',
    'lit-element',
    '@lit/reactive-element',
  ]) {
    config.addPassthroughCopy({
      [path.join(workspaceRoot, 'node_modules', pkg)]: `assets/vendor/${pkg}`,
    });
  }

  // Rebuild the docs when the design-kit build output (including its custom
  // elements manifest and CSS) changes, so a running `serve` reflects
  // design-kit edits.
  config.addWatchTarget(componentsDist);

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
