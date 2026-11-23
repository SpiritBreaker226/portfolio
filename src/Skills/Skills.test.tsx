import { screen, within } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../testUtil'
import { ProjectObject, SkillGroup, Tag } from '../types'
import { Skills } from './Skills'

let mockSkillGroups: SkillGroup[] = []

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useSkills: () => mockSkillGroups,
}))

describe('Skills', () => {
  const setUp = (skillGroups: SkillGroup[], projects: ProjectObject = {}) => {
    mockSkillGroups = skillGroups

    render(
      <AppProvider state={{ ...initialState, projects }}>
        <Skills />
      </AppProvider>
    )
  }

  const card = (skillName: string) =>
    screen.getByRole('article', { name: skillName })

  describe('GIVEN skills in two categories', () => {
    describe('WHEN the page renders', () => {
      beforeEach(() => {
        setUp([
          {
            category: 'Languages',
            skills: [
              {
                name: 'Pablo Honey',
                category: 'Languages',
                years: 15,
                summary: 'OK Computer',
              },
            ],
          },
          {
            category: 'Testing',
            skills: [
              {
                name: 'The Bends',
                category: 'Testing',
                years: 2,
                summary: 'Kid A',
              },
            ],
          },
        ])
      })

      test.each([
        ['Languages', 'Pablo Honey'],
        ['Testing', 'The Bends'],
      ])(
        'THEN the %s section lists the "%s" card',
        (category, skillName) => {
          const section = screen.getByRole('region', { name: category })

          expect(
            within(section).getByRole('heading', { level: 3, name: skillName })
          ).toBeInTheDocument()
        }
      )

      test('THEN a card shows its years of use', () => {
        expect(screen.getByText('15+ years')).toBeInTheDocument()
      })

      test('THEN a card shows its summary', () => {
        expect(screen.getByText('OK Computer')).toBeInTheDocument()
      })
    })
  })

  describe('GIVEN only a project tagged SQL and SQL Server', () => {
    describe('WHEN the page renders', () => {
      beforeEach(() => {
        setUp(
          [
            {
              category: 'Databases',
              skills: [
                {
                  name: 'In Rainbows',
                  category: 'Databases',
                  years: 1,
                  summary: 'Hey Jude',
                  tags: [Tag.SQL, Tag.SQLServer],
                },
                {
                  name: 'The King of Limbs',
                  category: 'Databases',
                  years: 1,
                  summary: 'Let It Be',
                  tags: [Tag.SQL, Tag.PostgreSQL],
                },
                {
                  name: 'A Moon Shaped Pool',
                  category: 'Databases',
                  years: 1,
                  summary: 'Yesterday',
                  tags: [Tag.PHP],
                },
                {
                  name: 'Come Together',
                  category: 'Databases',
                  years: 1,
                  summary: 'Here Comes the Sun',
                },
              ],
            },
          ],
          {
            something: {
              ...project,
              id: 'something',
              name: 'Something',
              tags: new Set([Tag.SQL, Tag.SQLServer]),
            },
          }
        )
      })

      test('THEN "See projects" links to the projects for the language tag', () => {
        expect(
          within(card('In Rainbows')).getByRole('link', {
            name: 'See projects',
          })
        ).toHaveAttribute('href', '/portfolio?tag=SQL')
      })

      test('THEN a later tag links to the projects for that tag', () => {
        expect(
          within(card('In Rainbows')).getByRole('link', { name: 'SQL Server' })
        ).toHaveAttribute('href', '/portfolio?tag=SQL+Server')
      })

      test('THEN a later tag no project carries has no link', () => {
        expect(
          within(card('The King of Limbs')).queryByRole('link', {
            name: 'PostgreSQL',
          })
        ).not.toBeInTheDocument()
      })

      test.each(['A Moon Shaped Pool', 'Come Together'])(
        'THEN the "%s" card, with no tag any project carries, has no links',
        (skillName) => {
          expect(
            within(card(skillName)).queryByRole('link')
          ).not.toBeInTheDocument()
        }
      )
    })
  })
})
