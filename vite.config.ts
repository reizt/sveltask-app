/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
  },
  server: {
    port: 6300,
  },
  resolve: {
    alias: {
      '%c/*': resolve(__dirname, './src/client'),
      '%d/*': resolve(__dirname, './src/defs'),
      '%u/*': resolve(__dirname, './src/utils'),
    },
  },
});
