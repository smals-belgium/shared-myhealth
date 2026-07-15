const fs = require('fs').promises;

const postcss = require('postcss');
const cssImport = require('postcss-import');

// Rewrite source-relative font URLs to dist-relative ones after inlining.
// In source, fonts.css references '../../assets/fonts/...' (correct relative
// to src/theme/fonts.css). After postcss-import inlines everything into
// dist/theme.css the path must become './assets/fonts/...'.
const rewriteFontUrls = {
  postcssPlugin: 'rewrite-font-urls',
  Declaration(decl) {
    if (decl.prop === 'src' && decl.value.includes('assets/fonts/')) {
      decl.value = decl.value.replace(
        /url\(['"]?(?:\.\.\/)*assets\/fonts\//g,
        "url('./assets/fonts/",
      );
    }
  },
};

const files = [{ from: 'src/theme.css', to: 'dist/theme.css' }];

Promise.all(
  files.map(({ from, to }) =>
    fs
      .readFile(from, 'utf8')
      .then(css =>
        postcss().use(cssImport()).use(rewriteFontUrls).process(css, { from }),
      )
      .then(result => fs.writeFile(to, result.css)),
  ),
).catch(console.error);
