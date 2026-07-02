import nx from '@nx/eslint-plugin';

import { importPluginConfig } from './tools/eslint-rules/import.mjs';
import { jsTsConfig } from './tools/eslint-rules/js-ts.mjs';
import { jsTsTestConfig } from './tools/eslint-rules/js-ts-test.mjs';
import { typedConfig } from './tools/eslint-rules/typed.mjs';

export default [
  {
    ignores: [
      '**/*.config.mjs',
      '**/dist',
      '**/out-tsc',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
  ...jsTsConfig,
  ...jsTsTestConfig,
  ...typedConfig,
  ...importPluginConfig,
];
