import { projects } from '../../src/data'

const [firstProject] = projects

const firstPostTitle = 'Pablo Honey'

// `shows` is text that appears only once the page's content has loaded,
// so the screenshot never catches a loading skeleton.
const pages = [
  { name: 'about', path: '/', shows: firstPostTitle },
  { name: 'skills', path: '/skills', shows: 'SQL Server' },
  { name: 'portfolio', path: '/portfolio', shows: firstProject.name },
  {
    name: 'project',
    path: `/portfolio/${firstProject.id}`,
    shows: firstProject.name,
  },
  { name: 'blog', path: '/blog', shows: firstPostTitle },
]
const themes = ['light', 'dark']
const widths = [375, 768, 1280]

describe('GIVEN every page on the dev server', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://dev.to/api/articles*', {
      fixture: 'posts.json',
    })
  })

  for (const { name, path, shows } of pages) {
    for (const theme of themes) {
      for (const width of widths) {
        it(`WHEN ${name} is shown in ${theme} at ${width}px THEN it matches its screenshot`, () => {
          cy.viewport(width, 900)
          cy.visit(path, {
            onBeforeLoad: (win) => win.localStorage.setItem('theme', theme),
          })

          cy.contains(shows).should('be.visible')
          cy.document().its('fonts.status').should('eq', 'loaded')
          cy.window().should((win) => {
            expect(
              Array.from(win.document.images).every((image) => image.complete)
            ).to.equal(true)
          })

          cy.compareSnapshot(`${name}-${theme}-${width}`)
        })
      }
    }
  }
})
