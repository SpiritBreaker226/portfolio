import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../testUtil'
import { ThemeToggle } from './ThemeToggle'

const toDarkLabel = 'Switch to dark mode'
const toLightLabel = 'Switch to light mode'

describe('GIVEN using ThemeToggle in light mode', () => {
  const setUp = () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    return user
  }

  afterEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.removeAttribute('style')
  })

  test('THEN it offers dark mode', () => {
    setUp()

    expect(screen.getByRole('button', { name: toDarkLabel })).toBeInTheDocument()
  })

  test('WHEN it is clicked THEN it offers light mode', async () => {
    const user = setUp()

    await user.click(screen.getByRole('button', { name: toDarkLabel }))

    expect(screen.getByRole('button', { name: toLightLabel })).toBeInTheDocument()
  })

  test.each([
    ['Enter', '{Enter}'],
    ['Space', ' '],
  ])(
    'WHEN it is focused with Tab and %s is pressed THEN it offers light mode',
    async (_keyName, key) => {
      const user = setUp()

      await user.tab()
      await user.keyboard(key)

      expect(
        screen.getByRole('button', { name: toLightLabel })
      ).toBeInTheDocument()
    }
  )
})
