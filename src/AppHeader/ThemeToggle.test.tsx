import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../testUtil'
import { ThemeToggle } from './ThemeToggle'

const toDarkLabel = 'Switch to dark mode'
const toLightLabel = 'Switch to light mode'

describe('ThemeToggle', () => {
  afterEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.removeAttribute('style')
  })

  test('GIVEN light mode WHEN the toggle renders THEN it offers dark mode', () => {
    render(<ThemeToggle />)

    expect(screen.getByRole('button', { name: toDarkLabel })).toBeInTheDocument()
  })

  test('GIVEN light mode WHEN the toggle is clicked THEN it offers light mode', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: toDarkLabel }))

    expect(screen.getByRole('button', { name: toLightLabel })).toBeInTheDocument()
  })

  test.each([
    ['Enter', '{Enter}'],
    ['Space', ' '],
  ])(
    'GIVEN light mode WHEN the toggle is focused with Tab and %s is pressed THEN it offers light mode',
    async (_keyName, key) => {
      const user = userEvent.setup()
      render(<ThemeToggle />)

      await user.tab()
      await user.keyboard(key)

      expect(
        screen.getByRole('button', { name: toLightLabel })
      ).toBeInTheDocument()
    }
  )
})
