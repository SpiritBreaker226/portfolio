import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'
import { AppFooter } from './AppFooter'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppFooter />
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
