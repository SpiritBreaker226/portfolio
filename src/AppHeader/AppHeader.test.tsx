import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../testUtil'
import { AppHeader } from './AppHeader'

const openMenuLabel = 'Open menu'
const closeMenuLabel = 'Close menu'
const mobileMenuLabel = 'Mobile'

describe('GIVEN using AppHeader', () => {
  const setUp = async ({ openMenu = false } = {}) => {
    const user = userEvent.setup()
    render(<AppHeader />)

    if (openMenu) {
      await user.click(screen.getByRole('button', { name: openMenuLabel }))
    }

    return user
  }

  test('THEN the menu button offers to open the menu and the Mobile nav is hidden', async () => {
    await setUp()

    expect(
      screen.getByRole('button', { name: openMenuLabel })
    ).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('navigation', { name: mobileMenuLabel })
    ).not.toBeInTheDocument()
  })

  test('WHEN the menu button is clicked THEN the Mobile nav shows every page link and the button offers to close it', async () => {
    const user = await setUp()

    await user.click(screen.getByRole('button', { name: openMenuLabel }))

    expect(
      screen.getByRole('button', { name: closeMenuLabel })
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      within(screen.getByRole('navigation', { name: mobileMenuLabel }))
        .getAllByRole('link')
        .map((link) => link.textContent)
    ).toEqual(['About', 'Skills', 'Portfolio', 'Blog'])
  })

  describe('WHEN the menu is open', () => {
    test('AND a menu link is clicked THEN the menu closes', async () => {
      const user = await setUp({ openMenu: true })

      await user.click(
        within(
          screen.getByRole('navigation', { name: mobileMenuLabel })
        ).getByRole('link', { name: 'Skills' })
      )

      expect(
        screen.queryByRole('navigation', { name: mobileMenuLabel })
      ).not.toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: openMenuLabel })
      ).toHaveAttribute('aria-expanded', 'false')
    })

    test('AND Escape is pressed THEN the menu closes', async () => {
      const user = await setUp({ openMenu: true })

      await user.keyboard('{Escape}')

      expect(
        screen.queryByRole('navigation', { name: mobileMenuLabel })
      ).not.toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: openMenuLabel })
      ).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
