// @ts-check

import globals from 'globals';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import cypress from 'eslint-plugin-cypress/flat';
// jhipster-needle-eslint-add-import - JHipster will add additional import here

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  { ignores: ['src/main/docker/'] },
  { ignores: ['target/classes/static/', 'target/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended.map(config =>
    config.name === 'typescript-eslint/base' ? config : { ...config, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] },
  ),
  {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: '@typescript-eslint/parser' },
      globals: { ...globals.browser },
    },
  },
  {
    files: ['src/main/webapp/**/*.vue', 'src/main/webapp/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/no-v-text-v-html-on-component': ['error', { allow: ['router-link', 'b-alert', 'b-badge', 'b-button', 'b-link'] }],
      'vue/no-reserved-component-names': 'off',
      'vue/attributes-order': 'off',
    },
  },
  {
    files: ['src/main/webapp/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    files: ['src/test/javascript/cypress/**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked, cypress.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: ['./src/test/javascript/cypress/tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  // jhipster-needle-eslint-add-config - JHipster will add additional config here
  prettier,
);
