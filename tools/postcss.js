const fs = require('fs').promises;

const postcss = require('postcss');
const cssImport = require('postcss-import');

const files = [{ from: 'src/theme.css', to: 'dist/theme.css' }];

Promise.all(
  files.map(({ from, to }) =>
    fs
      .readFile(from, 'utf8')
      .then(css => postcss().use(cssImport()).process(css, { from }))
      .then(result => fs.writeFile(to, result.css)),
  ),
).catch(console.error);
