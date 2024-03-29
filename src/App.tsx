import { BrowserRouter as Router } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'
import { AppHeader } from './AppHeader'
import { AppBody } from './AppBody'
import { AppFooter } from './AppFooter'
import { AppProvider } from './context'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppProvider>
        <Router>
          <AppHeader />

          <AppBody />

          <AppFooter />
        </Router>

        <Analytics />
      </AppProvider>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
