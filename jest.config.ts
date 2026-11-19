import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/*.test.ts?(x)'],
  resetMocks: true,
  // Jest ignores the `browser` field in `package.json`, so it would load
  // styled-components' Node build, where `createGlobalStyle` never injects
  // into the DOM. Vite ships the browser build, so tests use it too.
  moduleNameMapper: {
    '^styled-components$':
      '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js',
  },
}

export default config
