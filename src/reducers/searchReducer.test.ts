import { faker } from '@faker-js/faker'

import {
  InitialState,
  Platform,
  ProjectObject,
  ProjectType,
  SearchCriteria,
  Tag,
  Types,
} from '../types'
import { searchReducer } from './searchReducer'
import { initialState, project } from '../testUtil'

describe('GIVEN using searchReducer to search', () => {
  const setUp = (
    searchCriteria: Partial<SearchCriteria>,
    state: Partial<InitialState> = {}
  ) =>
    searchReducer(
      {
        ...initialState,
        ...state,
        searchCriteria: { ...initialState.searchCriteria, ...searchCriteria },
      },
      { type: Types.Search, payload: {} }
    )

  test('WHEN there are no projects THEN nothing is found', () => {
    const state = setUp({ searchText: 'no project' })

    expect(state.filteredProjects.length).toEqual(0)
  })

  describe('WHEN a search has already filtered the projects', () => {
    test('AND neither project matches both the text and the type THEN nothing is found', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          name: 'the fool',
          type: ProjectType['Close'],
        },
        '12343456': {
          ...project,
          id: '12343456',
          name: 'the world',
          type: ProjectType['Open'],
        },
      }

      const state = setUp(
        { searchText: 'fool', type: ProjectType['Open'] },
        { projects, filteredProjects: [{ ...projects['2483795'] }] }
      )

      expect(state.filteredProjects.length).toEqual(0)
    })

    test('AND both projects match the text and the type THEN both are found', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          name: 'the fool',
          type: ProjectType['Open'],
        },
        '12343456': {
          ...project,
          id: '12343456',
          name: 'the fool of the world',
          type: ProjectType['Open'],
        },
      }

      const state = setUp(
        { searchText: 'fool', type: ProjectType['Open'] },
        { projects, filteredProjects: [{ ...projects['2483795'] }] }
      )

      expect(state.filteredProjects.length).toEqual(2)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '2483795' }),
          expect.objectContaining({ id: '12343456' }),
        ])
      )
    })

    test('AND the search text changes THEN the search runs again', () => {
      const projects: ProjectObject = {
        '2483795': { ...project, id: '2483795', name: 'the sun' },
        '12343456': { ...project, id: '12343456', name: 'the moon' },
      }

      const state = setUp(
        { searchText: 'moon' },
        { projects, filteredProjects: [{ ...projects['2483795'] }] }
      )

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '12343456' })])
      )
    })
  })

  test('WHEN searching by text THEN it matches names and descriptions', () => {
    const projects: ProjectObject = {
      '2483795': { ...project, id: '2483795', name: 'The Fool' },
      '3658047': {
        ...project,
        id: '3658047',
        name: faker.company.name(),
        description: 'the fool',
      },
      '1430287': { ...project, id: '1430287', name: faker.company.name() },
      '356047': { ...project, id: '356047', name: faker.company.name() },
    }

    const state = setUp({ searchText: 'fool' }, { projects })

    expect(state.filteredProjects.length).toEqual(2)
    expect(state.filteredProjects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '2483795' }),
        expect.objectContaining({ id: '3658047' }),
      ])
    )
  })

  test('WHEN searching by type THEN only projects of that type are found', () => {
    const projects: ProjectObject = {
      '2483795': { ...project, id: '2483795', type: ProjectType['Open'] },
      '3658047': { ...project, id: '3658047', type: ProjectType['Close'] },
    }

    const state = setUp({ type: ProjectType['Open'] }, { projects })

    expect(state.filteredProjects.length).toEqual(1)
    expect(state.filteredProjects).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
    )
  })

  describe('WHEN searching by platform', () => {
    test('AND one platform is picked THEN only projects on it are found', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          platforms: new Set([Platform['mobile']]),
        },
        '3658047': {
          ...project,
          id: '3658047',
          platforms: new Set([Platform['web']]),
        },
      }

      const state = setUp(
        { platforms: new Set([Platform['mobile']]) },
        { projects }
      )

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })

    test('AND a project has two platforms THEN either one finds it', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          platforms: new Set([Platform['mobile'], Platform['game']]),
        },
        '3658047': {
          ...project,
          id: '3658047',
          platforms: new Set([Platform['web']]),
        },
      }

      const state = setUp(
        { platforms: new Set([Platform['game']]) },
        { projects }
      )

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })

    test('AND two platforms are picked THEN projects on either are found', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          platforms: new Set([Platform['mobile'], Platform['game']]),
        },
        '3658047': {
          ...project,
          id: '3658047',
          platforms: new Set([Platform['web']]),
        },
        '3456783': {
          ...project,
          id: '3456783',
          platforms: new Set([Platform['mobile']]),
        },
      }

      const state = setUp(
        { platforms: new Set([Platform['game'], Platform['web']]) },
        { projects }
      )

      expect(state.filteredProjects.length).toEqual(2)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '2483795' }),
          expect.objectContaining({ id: '3658047' }),
        ])
      )
    })
  })

  describe('WHEN searching by tag', () => {
    test('AND one tag is picked THEN only projects with it are found', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          tags: new Set([Tag['C++']]),
        },
        '3658047': {
          ...project,
          id: '3658047',
          tags: new Set([Tag['Ruby']]),
        },
      }

      const state = setUp({ tags: new Set([Tag['C++']]) }, { projects })

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })

    test('AND a project has two tags THEN either one finds it', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          tags: new Set([Tag['C++'], Tag['SQLServer']]),
        },
        '3658047': {
          ...project,
          id: '3658047',
          tags: new Set([Tag['Ruby']]),
        },
      }

      const state = setUp({ tags: new Set([Tag['SQLServer']]) }, { projects })

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })

    test('AND two tags are picked THEN projects with either are found', () => {
      const projects: ProjectObject = {
        '2483795': {
          ...project,
          id: '2483795',
          tags: new Set([Tag['C++'], Tag['SQLServer']]),
        },
        '3658047': {
          ...project,
          id: '3658047',
          tags: new Set([Tag['Ruby']]),
        },
        '3456783': {
          ...project,
          id: '3456783',
          tags: new Set([Tag['C++']]),
        },
      }

      const state = setUp(
        { tags: new Set([Tag['SQLServer'], Tag['Ruby']]) },
        { projects }
      )

      expect(state.filteredProjects.length).toEqual(2)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '2483795' }),
          expect.objectContaining({ id: '3658047' }),
        ])
      )
    })
  })
})
