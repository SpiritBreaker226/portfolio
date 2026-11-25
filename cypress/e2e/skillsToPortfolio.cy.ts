import { projects } from '../../src/data'
import { Tag } from '../../src/types'

const sqlProjectCount = projects.filter(({ tags }) => tags.has(Tag.SQL)).length

describe('GIVEN a search on Portfolio', () => {
  it('WHEN a Skills "See projects" link is followed THEN every project with that tag is listed', () => {
    cy.visit('/portfolio')
    cy.get('#searchText').type('Kid A')

    cy.get('nav[aria-label="Main"]').contains('a', 'Skills').click()
    cy.get('article[aria-label="SQL Server"]')
      .contains('a', 'See projects')
      .click()

    cy.location('search').should('eq', '?tag=SQL')
    cy.get('article').should('have.length', sqlProjectCount)
  })
})
