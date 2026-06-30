import path from 'node:path';

export default function (config) {
  const componentsDist = path.join(
    import.meta.dirname,
    '..',
    '..',
    'packages',
    'design-kit',
    'dist',
  );

  config.addPassthroughCopy({ [componentsDist]: 'assets/design-kit' });
  config.addPassthroughCopy('src/styles');
  config.addPassthroughCopy('src/scripts');

  // Rebuild the docs when the design-kit build output or its custom elements
  // manifest changes, so a running `serve` reflects design-kit edits.
  config.addWatchTarget(componentsDist);
  config.addWatchTarget(
    path.join(
      import.meta.dirname,
      '..',
      '..',
      'packages',
      'design-kit',
      'custom-elements.json',
    ),
  );

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
