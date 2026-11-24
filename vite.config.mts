/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    mockReset: true,
    // Vitest ignores the `browser` field in `package.json`, so it would
    // load styled-components' server build, where `createGlobalStyle`
    // never injects into the DOM. Vite ships the browser build, so tests
    // use it too.
    alias: [
      {
        find: /^styled-components$/,
        replacement: 'styled-components/dist/styled-components.browser.cjs.js',
      },
    ],
  },
})
