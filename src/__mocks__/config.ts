import { Config } from '../types'

/**
 * Fixed app settings for tests, so results don't depend on the local
 * `.env` that `src/config.ts` reads.
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
