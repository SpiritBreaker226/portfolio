import { Skill } from '../types'
import { groupSkillsByCategory } from './groupSkillsByCategory'

describe('groupSkillsByCategory', () => {
  test('GIVEN skills out of category order WHEN grouping THEN groups follow the category order, keep skill order and leave out empty categories', () => {
    const pabloHoney: Skill = {
      name: 'Pablo Honey',
      category: 'Testing',
      years: 1,
      summary: 'The Bends',
    }
    const okComputer: Skill = {
      name: 'OK Computer',
      category: 'Languages',
      years: 2,
      summary: 'Kid A',
    }
    const amnesiac: Skill = {
      name: 'Amnesiac',
      category: 'Languages',
      years: 3,
      summary: 'Hail to the Thief',
    }

    expect(groupSkillsByCategory([pabloHoney, okComputer, amnesiac])).toEqual([
      { category: 'Languages', skills: [okComputer, amnesiac] },
      { category: 'Testing', skills: [pabloHoney] },
    ])
  })
})
