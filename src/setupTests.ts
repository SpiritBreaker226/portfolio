// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { mockOsColorScheme } from './testUtil/mockOsColorScheme'

jest.mock('./config')

window.HTMLElement.prototype.scrollIntoView = jest.fn()

// jsdom has no `matchMedia`, which `ThemeProvider` reads for the OS colour
// scheme. Every test starts with a light OS; tests about the scheme call
// `mockOsColorScheme` again to change it.
beforeEach(() => {
  mockOsColorScheme('light')
})
