import { faker } from '@faker-js/faker'

import { Action, ProjectObject, InitialState, Types } from '../../types'
import { searchReducer } from '../searchReducer'
import { initialState, project } from '../../testUtil'

describe('searchReducer', () => {
  const setUp = ({
    action,
    state = {},
  }: {
    action: Action
    state?: Partial<InitialState>
  }) => searchReducer({ ...initialState, ...state }, action)

  it('should have no projects when state projects does not exist', () => {
    const state = setUp({
      state: {
        searchCriteria: {
          ...initialState.searchCriteria,
          searchText: 'no project',
        },
      },
      action: {
        type: Types.Search,
        payload: {},
      },
    })

    expect(state.filteredProjects.length).toEqual(0)
  })

  describe('when searching for search text', () => {
    it('should search projects with "the fool" in name & description', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = { ...project, id: '2483795', name: 'the fool' }
      projects['3658047'] = {
        ...project,
        id: '3658047',
        name: faker.company.name(),
        description: 'the fool',
      }
      projects['1430287'] = {
        ...project,
        id: '1430287',
        name: faker.company.name(),
      }
      projects['356047'] = {
        ...project,
        id: '356047',
        name: faker.company.name(),
      }

      const state = setUp({
        state: {
          projects,
          searchCriteria: {
            ...initialState.searchCriteria,
            searchText: 'fool',
          },
        },
        action: {
          type: Types.Search,
          payload: {},
        },
      })

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
