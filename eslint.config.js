import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parser,
    },
    plugins: {
      prettier,
      '@typescript-eslint': typescript,
      import: importPlugin,
    },
    rules: {
      ...prettier.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 80,
          arrowParens: 'avoid',
          bracketSpacing: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin'],
            ['external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/no-unresolved': 'error',
    },
  },
  {
    files: ['src/**/*.{ts, tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
