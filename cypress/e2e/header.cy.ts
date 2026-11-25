const mainNav = 'nav[aria-label="Main"]'
const mobileNav = 'nav[aria-label="Mobile"]'
const openMenuButton = 'button[aria-label="Open menu"]'

describe('GIVEN the header', () => {
  describe('WHEN the window is phone width', () => {
    beforeEach(() => {
      cy.viewport(375, 812)
      cy.visit('/')
    })

    it('AND the page loads THEN the menu button shows instead of the Main nav', () => {
      cy.get(openMenuButton).should('be.visible')
      cy.get(mainNav).should('not.be.visible')
    })

    it('AND the menu button is clicked THEN the Mobile nav shows every page link', () => {
      cy.get(openMenuButton).click()

      cy.get(mobileNav)
        .should('be.visible')
        .find('a')
        .then((links) => [...links].map((link) => link.textContent))
        .should('deep.equal', ['About', 'Skills', 'Portfolio', 'Blog'])
    })

    it('AND the page outside the open menu is clicked THEN the menu closes', () => {
      cy.get(openMenuButton).click()

      cy.contains('h2', 'About me').click()

      cy.get(mobileNav).should('not.exist')
      cy.get(openMenuButton).should('have.attr', 'aria-expanded', 'false')
    })
  })

  for (const width of [768, 1280]) {
    it(`WHEN the window is ${width}px wide THEN the Main nav shows instead of the menu button`, () => {
      cy.viewport(width, 900)
      cy.visit('/')

      cy.get(mainNav).should('be.visible')
      cy.get(openMenuButton).should('not.be.visible')
    })
  }
})
