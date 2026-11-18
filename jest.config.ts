import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/*.test.ts?(x)'],
  resetMocks: true,
}

export default config
