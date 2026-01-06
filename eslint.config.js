import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// standard-with-typescript は従来形式の shareable config なので FlatCompat 経由で取り込み
const compat = new FlatCompat({ baseDirectory: __dirname });

const tsFiles = ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs,svelte}'];

export default [
  // ignorePatterns:
  {
    ignores: [
      '.DS_Store',
      'node_modules',
      '/build',
      '/.svelte-kit',
      '/package',
      '.env',
      '.env.*',
      '!.env.example',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
      'tmp',
      'playwright.config.ts',
      'vite.config.ts',
    ],
  },

  // extends: eslint:recommended
  js.configs.recommended,

  // 共通（env/browser+node+es2022, parserOptions 等）
  {
    files: tsFiles,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // eslint
      semi: 'off',
      camelcase: 'off',

      // @typescript-eslint
      '@typescript-eslint/array-type': ['error', { default: 'array', readonly: 'array' }],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: false,
          allowRegExp: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/confusing-void-expression': 'off',
    },
  },

  // Svelte: plugin:svelte/recommended 相当 + prettier 相当
  // （eslint-plugin-svelte は flat config を提供）
  ...(Array.isArray(eslintPluginSvelte.configs.recommended)
    ? eslintPluginSvelte.configs.recommended
    : [eslintPluginSvelte.configs.recommended]
  ).map((cfg) => ({
    ...cfg,
    files: ['**/*.svelte'],
  })),
  ...(Array.isArray(eslintPluginSvelte.configs.prettier)
    ? eslintPluginSvelte.configs.prettier
    : [eslintPluginSvelte.configs.prettier]
  ).map((cfg) => ({
    ...cfg,
    files: ['**/*.svelte'],
  })),

  // Svelte parser（v8 overrides の移植）
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
  },

  // Tailwind: eslint-plugin-better-tailwindcss
  {
    files: ['**/*.{svelte,ts,tsx,js,jsx}'],
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      // v8 tailwindcss/no-custom-classname の whitelist 相当
      'better-tailwindcss/no-unregistered-classes': ['warn', { ignore: ['material-icons', '_.*'] }],

      // v8 の tailwindcss/enforces-negative-arbitrary-values: off
      // better-tailwindcss 側に同名ルールはないため、ここでは移植対象なし（必要なら該当ルール名に合わせて追加してください）
    },
    settings: {
      'better-tailwindcss': {
        // Tailwind のエントリ CSS を指定（プロジェクトに合わせて変更）
        // 例: SvelteKit なら "src/app.css" が多いです
        entryPoint: 'src/app.css',
      },
    },
  },

  // extends: eslint-config-prettier（最後に置いて競合ルールを無効化）
  eslintConfigPrettier,
];
