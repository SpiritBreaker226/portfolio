import { BrowserRouter as Router } from 'react-router-dom'

import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Router>
        <AppHeader />

        <AppFooter />
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
