/** App settings read from the `VITE_*` environment variables. */
export type Config = {
  developerName: string
  blogUsername: string
  blogServerUrl: string
  sentryDsn: string
  mode: string
  isProduction: boolean
}
