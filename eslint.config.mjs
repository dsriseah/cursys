import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

const URSYS_STYLE = {
  'spaced-comment': 'off',
  'camelcase': 'off',
  'comma-dangle': ['error', 'never'],
  'no-underscore-dangle': 'off',
  'lines-between-class-members': 'off',
  'no-bitwise': 'off',
  'import/prefer-default-export': 'off',
  'object-shorthand': 'off'
};
const BROWSER_DEBUG = {
  'no-console': 'off',
  'no-debugger': 'warn',
  'no-alert': 'warn',
  'no-restricted-syntax': 'off'
};
const HELP_TSJS = {
  'no-undef': 'off',
  'no-unused-vars': 'off',
  'no-shadow': 'off',
  'no-param-reassign': 'off',
  'object-curly-newline': 'off',
  'react/jsx-props-no-spreading': 'off',
  'arrow-body-style': 'off',
  'no-plusplus': 'off',
  'prefer-const': 'off',
  'prefer-destructuring': 'off',
  'class-methods-use-this': 'off',
  'jsx-a11y/label-has-associated-control': 'off'
};
const YUCK_PRETTIER = {
  'arrow-parens': 'off'
};
const RULES = {
  ...URSYS_STYLE,
  ...BROWSER_DEBUG,
  ...HELP_TSJS,
  ...YUCK_PRETTIER
};

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin
    },
    rules: RULES,
    ignores: ['**/_dist/*', '**/_out/*', '**/node_modules/*'],
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
