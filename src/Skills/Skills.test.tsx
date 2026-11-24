import { screen, within } from '@testing-library/react'

import { AppProvider, initialState, project, render } from '../testUtil'
import { ProjectObject, SkillGroup, Tag } from '../types'
import { Skills } from './Skills'

let mockSkillGroups: SkillGroup[] = []

vi.mock('../hooks', async () => ({
  ...(await vi.importActual('../hooks')),
  useSkills: () => mockSkillGroups,
}))

const twoCategories: SkillGroup[] = [
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
      { name: 'The Bends', category: 'Testing', years: 2, summary: 'Kid A' },
    ],
  },
]

const databaseSkills: SkillGroup[] = [
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
]

const sqlServerProject: ProjectObject = {
  something: {
    ...project,
    id: 'something',
    name: 'Something',
    tags: new Set([Tag.SQL, Tag.SQLServer]),
  },
}

describe('GIVEN using Skills', () => {
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

  describe('WHEN there are skills in two categories', () => {
    test.each([
      ['Languages', 'Pablo Honey'],
      ['Testing', 'The Bends'],
    ])('THEN the %s section lists the "%s" card', (category, skillName) => {
      setUp(twoCategories)

      const section = screen.getByRole('region', { name: category })

      expect(
        within(section).getByRole('heading', { level: 3, name: skillName })
      ).toBeInTheDocument()
    })

    test('THEN a card shows its years of use', () => {
      setUp(twoCategories)

      expect(screen.getByText('15+ years')).toBeInTheDocument()
    })

    test('THEN a card shows its summary', () => {
      setUp(twoCategories)

      expect(screen.getByText('OK Computer')).toBeInTheDocument()
    })
  })

  describe('WHEN the only project is tagged SQL and SQL Server', () => {
    test('THEN "See projects" links to the projects for the language tag', () => {
      setUp(databaseSkills, sqlServerProject)

      expect(
        within(card('In Rainbows')).getByRole('link', {
          name: 'See projects',
        })
      ).toHaveAttribute('href', '/portfolio?tag=SQL')
    })

    test('THEN a later tag links to the projects for that tag', () => {
      setUp(databaseSkills, sqlServerProject)

      expect(
        within(card('In Rainbows')).getByRole('link', { name: 'SQL Server' })
      ).toHaveAttribute('href', '/portfolio?tag=SQL+Server')
    })

    test('THEN a later tag no project carries has no link', () => {
      setUp(databaseSkills, sqlServerProject)

      expect(
        within(card('The King of Limbs')).queryByRole('link', {
          name: 'PostgreSQL',
        })
      ).not.toBeInTheDocument()
    })

    test.each(['A Moon Shaped Pool', 'Come Together'])(
      'THEN the "%s" card, with no tag any project carries, has no links',
      (skillName) => {
        setUp(databaseSkills, sqlServerProject)

        expect(
          within(card(skillName)).queryByRole('link')
        ).not.toBeInTheDocument()
      }
    )
  })
})
