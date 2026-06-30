import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import { angularConfig } from '../../tools/eslint-rules/angular.mjs';

export default [
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  ...baseConfig,
  ...angularConfig,
  {
    files: ['**/*.ts'],
    rules: {
      // it's a playground; we can use the console alright
      'no-console': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
