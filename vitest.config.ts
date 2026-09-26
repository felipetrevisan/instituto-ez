import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@ez/web': resolve(__dirname, 'apps/web/src'),
    },
  },
  test: {
    environment: 'node',
    exclude: ['**/.next/**', '**/node_modules/**'],
    include: ['apps/**/*.test.ts'],
  },
})
