import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { config } from './config'

Sentry.init({
  dsn: config.sentryDsn,
  environment: config.mode,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: config.isProduction ? 0.1 : 1.0,
  // Session Replay
  replaysSessionSampleRate: config.isProduction ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  enabled: false,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
