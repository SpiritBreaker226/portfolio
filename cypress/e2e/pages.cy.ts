import { projects, skillSet } from '../../src/data'

const [firstProject] = projects

describe('GIVEN the site on the dev server', () => {
  it('WHEN About is visited THEN it shows the About section', () => {
    cy.visit('/')

    cy.contains('h2', 'About me').should('be.visible')
  })

  it('WHEN Skills is visited THEN it lists every skill', () => {
    cy.visit('/skills')

    cy.contains('h1', 'Skills').should('be.visible')
    cy.get('article').should('have.length', skillSet.length)
  })

  it('WHEN Portfolio is visited THEN it shows the filters and every project', () => {
    cy.visit('/portfolio')

    for (const label of ['Type', 'Platforms', 'Tags']) {
      cy.contains('span', new RegExp(`^${label}$`))
        .invoke('attr', 'id')
        .then((id) => {
          cy.get(`[role="combobox"][aria-labelledby="${id}"]`).should(
            'be.visible'
          )
        })
    }
    cy.get('article').should('have.length', projects.length)
  })

  it('WHEN a project is visited directly THEN it shows that project', () => {
    cy.visit(`/portfolio/${firstProject.id}`)

    cy.contains(firstProject.name).should('be.visible')
  })

  it('WHEN Blog is visited THEN it shows the Blog page', () => {
    cy.visit('/blog')

    cy.contains('h1', 'Blog').should('be.visible')
  })
})
