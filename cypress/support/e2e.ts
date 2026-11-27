import { addCompareSnapshotCommand } from 'cypress-visual-regression/dist/command'

// Full-page screenshots must match their baseline pixel for pixel.
addCompareSnapshotCommand({ capture: 'fullPage', errorThreshold: 0 })

// Every test fails if the app logs a `console.error`. React reports errors it
// catches in an error boundary, and development-only warnings, through
// `console.error`, so a page can break without an uncaught exception.
let consoleErrors: string[] = []

beforeEach(() => {
  consoleErrors = []

  cy.on('window:before:load', (win) => {
    const consoleError = win.console.error

    win.console.error = (...args: unknown[]) => {
      consoleErrors.push(args.map(String).join(' '))
      consoleError.apply(win.console, args)
    }
  })
})

afterEach(() => {
  cy.wrap(consoleErrors).should('be.empty')
})
