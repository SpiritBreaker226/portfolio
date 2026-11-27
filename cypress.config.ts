import { defineConfig } from 'cypress'
import { configureVisualRegression } from 'cypress-visual-regression'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on) {
      configureVisualRegression(on)
    },
  },
})
