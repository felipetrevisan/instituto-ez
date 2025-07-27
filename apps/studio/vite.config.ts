import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@ez/studio': path.resolve(__dirname, './src'),
    },
  },
})
