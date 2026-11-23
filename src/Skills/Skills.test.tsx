import { screen, within } from '@testing-library/react'

import { render } from '../testUtil'
import { SkillGroup } from '../types'
import { Skills } from './Skills'

const mockSkillGroups: SkillGroup[] = [
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

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useSkills: () => mockSkillGroups,
}))

describe('Skills', () => {
  describe('GIVEN skills in two categories', () => {
    describe('WHEN the page renders', () => {
      beforeEach(() => {
        render(<Skills />)
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
})
