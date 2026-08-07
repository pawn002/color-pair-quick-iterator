/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2022',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  test: {
    include: ['src/**/*.spec.ts'],
    // Component specs need a DOM to define and upgrade custom elements. The
    // service specs are pure and don't care either way.
    environment: 'jsdom',
    // Fills a jsdom gap that Candor's form-associated controls trip over.
    setupFiles: ['src/test-setup.ts'],
    // A run that collects no tests is a broken suite, not a passing one — this
    // is how the Angular-era specs sat dead after the Lit migration without
    // anyone noticing.
    passWithNoTests: false,
  },
});
