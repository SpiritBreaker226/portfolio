import { Config } from '../types'

/**
 * Fixed app settings for Jest, which cannot parse the `import.meta.env`
 * reads in `src/config.ts`.
 *
 * @example
 * config.mode
 * // => 'test'
 */
export const config: Config = {
  developerName: 'Jason Stathopulos',
  blogUsername: 'jstats',
  blogServerUrl: '',
  sentryDsn: '',
  mode: 'test',
  isProduction: false,
}
