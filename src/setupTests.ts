// jest-dom adds DOM matchers such as `toBeInTheDocument` to Vitest's
// `expect`: https://github.com/testing-library/jest-dom#with-vitest
import '@testing-library/jest-dom/vitest'

import { mockOsColorScheme } from './testUtil/mockOsColorScheme'

vi.mock('./config')

window.HTMLElement.prototype.scrollIntoView = vi.fn()

// jsdom has no `matchMedia`, which `ThemeProvider` reads for the OS colour
// scheme. Every test starts with a light OS; tests about the scheme call
// `mockOsColorScheme` again to change it.
beforeEach(() => {
  mockOsColorScheme('light')
})
