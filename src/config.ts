import type { Config } from './types'

/**
 * App settings read from the `VITE_*` environment variables at build time.
 *
 * This is the only module that reads `import.meta.env`, because Jest
 * cannot parse `import.meta`. Tests replace it with
 * `src/__mocks__/config.ts`.
 *
 * @example
 * config.developerName
 * // => 'Jason Stathopulos'
 */
export const config: Config = {
  developerName: import.meta.env.VITE_DEVELOPER_NAME,
  blogUsername: import.meta.env.VITE_BLOG_USERNAME,
  blogServerUrl: import.meta.env.VITE_BLOG_SERVER_URL,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  mode: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
}
