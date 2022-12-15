import { BrowserRouter as Router } from 'react-router-dom'

import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'
import { AppHeader } from './AppHeader'
import { About } from './About'
import { AppFooter } from './AppFooter'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Router>
        <AppHeader />

        <About />

        <AppFooter />
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
