import path from 'node:path';

export default function (config) {
  const componentsDist = path.join(
    import.meta.dirname,
    '..',
    '..',
    'packages',
    'vitals',
    'components',
    'dist',
  );
  const tokensSrc = path.join(
    import.meta.dirname,
    '..',
    '..',
    'packages',
    'vitals',
    'tokens',
    'src',
  );

  config.addPassthroughCopy({
    [componentsDist]: 'assets/vitals',
    [path.join(tokensSrc, 'vitals.css')]: 'assets/vitals/vitals.css',
    [path.join(tokensSrc, 'theme')]: 'assets/vitals/theme',
  });
  config.addPassthroughCopy('src/styles');
  config.addPassthroughCopy('src/scripts');

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
