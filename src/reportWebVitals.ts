import type { Metric } from 'web-vitals'

/**
 * Sends each Core Web Vital (CLS, INP, LCP) and the FCP and TTFB timings
 * to `onPerfEntry` as the browser measures them. `web-vitals` loads only
 * when a handler is given, so pages that don't report skip the download.
 *
 * @example
 * reportWebVitals(console.log)
 * // => logs a `Metric` such as { name: 'LCP', value: 1234, ... } for each
 */
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry)
      onINP(onPerfEntry)
      onFCP(onPerfEntry)
      onLCP(onPerfEntry)
      onTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
