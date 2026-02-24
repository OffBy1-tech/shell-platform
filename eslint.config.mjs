// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**']
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/max-len': ['error', { code: 80 }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'never']
    }
  },
  {
    files: ['src/**/*.json', 'src/**/*.md'],
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/max-len': ['error', { code: 80 }],
      '@stylistic/indent': ['error', 2]
    }
  }
);
