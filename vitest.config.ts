import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { defineConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@ez/shared': resolve(__dirname, 'packages/shared/src'),
      '@ez/web': resolve(__dirname, 'apps/web/src'),
      '@ez/studio': resolve(__dirname, 'apps/studio/src'),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['**/.next/**', '**/dist/**', '**/node_modules/**'],
    globals: true,
    include: ['apps/**/*.test.{ts,tsx}', 'packages/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
