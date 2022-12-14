import ErrorBoundary from './Components/ErrorBoundary'
import { ThemeProvider } from './theme'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>Testing</ThemeProvider>
  </ErrorBoundary>
)

export default App
