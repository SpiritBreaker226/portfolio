import { BrowserRouter as Router } from 'react-router-dom'

import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'
import { AppFooter } from './AppFooter'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Router>
        <AppFooter />
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
