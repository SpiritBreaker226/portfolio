import { faker } from '@faker-js/faker'

import {
  Action,
  ProjectObject,
  InitialState,
  Types,
  ProjectType,
  Platform,
  Tag,
} from '../../types'
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

  describe('when state filtered projects exist', () => {
    it('should return no results as if either project no longer has both criterions', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
        name: 'the fool',
        type: ProjectType['Close'],
      }
      projects['12343456'] = {
        ...project,
        id: '12343456',
        name: 'the world',
        type: ProjectType['Open'],
      }

      const state = setUp({
        state: {
          projects,
          filteredProjects: [{ ...projects['2483795'] }],
          searchCriteria: {
            ...initialState.searchCriteria,
            searchText: 'fool',
            type: ProjectType['Open'],
          },
        },
        action: {
          type: Types.Search,
          payload: {},
        },
      })

      expect(state.filteredProjects.length).toEqual(0)
    })

    it('should return results as if either project has both criterions', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
        name: 'the fool',
        type: ProjectType['Open'],
      }
      projects['12343456'] = {
        ...project,
        id: '12343456',
        name: 'the fool of the world',
        type: ProjectType['Open'],
      }

      const state = setUp({
        state: {
          projects,
          filteredProjects: [{ ...projects['2483795'] }],
          searchCriteria: {
            ...initialState.searchCriteria,
            searchText: 'fool',
            type: ProjectType['Open'],
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
          expect.objectContaining({ id: '12343456' }),
        ])
      )
    })

    it('should redo search if that search criteria changes', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
        name: 'the sun',
      }
      projects['12343456'] = {
        ...project,
        id: '12343456',
        name: 'the moon',
      }

      const state = setUp({
        state: {
          projects,
          filteredProjects: [{ ...projects['2483795'] }],
          searchCriteria: {
            ...initialState.searchCriteria,
            searchText: 'moon',
          },
        },
        action: {
          type: Types.Search,
          payload: {},
        },
      })

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '12343456' })])
      )
    })
  })

  describe('when searching for search text', () => {
    it('should search projects with "the fool" in name & description', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = { ...project, id: '2483795', name: 'The Fool' }
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

  describe('when searching for type', () => {
    it('should search projects with open type', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
        type: ProjectType['Open'],
      }
      projects['3658047'] = {
        ...project,
        id: '3658047',
        type: ProjectType['Close'],
      }

      const state = setUp({
        state: {
          projects,
          searchCriteria: {
            ...initialState.searchCriteria,
            type: ProjectType['Open'],
          },
        },
        action: {
          type: Types.Search,
          payload: {},
        },
      })

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })
  })

  describe('when searching for platform', () => {
    it('should search projects with mobile platform', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
        platforms: new Set([Platform['mobile']]),
      }
      projects['3658047'] = {
        ...project,
        id: '3658047',
        platforms: new Set([Platform['web']]),
      }

      const state = setUp({
        state: {
          projects,
          searchCriteria: {
            ...initialState.searchCriteria,
            platforms: new Set([Platform['mobile']]),
          },
        },
        action: {
          type: Types.Search,
          payload: {},
        },
      })

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })

    describe('and with two platforms', () => {
      it('should find project', () => {
        const projects: ProjectObject = {}

        projects['2483795'] = {
          ...project,
          id: '2483795',
          platforms: new Set([Platform['mobile'], Platform['game']]),
        }
        projects['3658047'] = {
          ...project,
          id: '3658047',
          platforms: new Set([Platform['web']]),
        }

        const state = setUp({
          state: {
            projects,
            searchCriteria: {
              ...initialState.searchCriteria,
              platforms: new Set([Platform['game']]),
            },
          },
          action: {
            type: Types.Search,
            payload: {},
          },
        })

        expect(state.filteredProjects.length).toEqual(1)
        expect(state.filteredProjects).toEqual(
          expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
        )
      })

      it('should find projects with two platforms selected', () => {
        const projects: ProjectObject = {}

        projects['2483795'] = {
          ...project,
          id: '2483795',
          platforms: new Set([Platform['mobile'], Platform['game']]),
        }
        projects['3658047'] = {
          ...project,
          id: '3658047',
          platforms: new Set([Platform['web']]),
        }
        projects['3456783'] = {
          ...project,
          id: '3456783',
          platforms: new Set([Platform['mobile']]),
        }

        const state = setUp({
          state: {
            projects,
            searchCriteria: {
              ...initialState.searchCriteria,
              platforms: new Set([Platform['game'], Platform['web']]),
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

  describe('when searching for tag', () => {
    it('should search projects with C++ tag', () => {
      const projects: ProjectObject = {}

      projects['2483795'] = {
        ...project,
        id: '2483795',
        tags: new Set([Tag['C++']]),
      }
      projects['3658047'] = {
        ...project,
        id: '3658047',
        tags: new Set([Tag['Ruby']]),
      }

      const state = setUp({
        state: {
          projects,
          searchCriteria: {
            ...initialState.searchCriteria,
            tags: new Set([Tag['C++']]),
          },
        },
        action: {
          type: Types.Search,
          payload: {},
        },
      })

      expect(state.filteredProjects.length).toEqual(1)
      expect(state.filteredProjects).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
      )
    })

    describe('and with two tags', () => {
      it('should find project', () => {
        const projects: ProjectObject = {}

        projects['2483795'] = {
          ...project,
          id: '2483795',
          tags: new Set([Tag['C++'], Tag['SQLServer']]),
        }
        projects['3658047'] = {
          ...project,
          id: '3658047',
          tags: new Set([Tag['Ruby']]),
        }

        const state = setUp({
          state: {
            projects,
            searchCriteria: {
              ...initialState.searchCriteria,
              tags: new Set([Tag['SQLServer']]),
            },
          },
          action: {
            type: Types.Search,
            payload: {},
          },
        })

        expect(state.filteredProjects.length).toEqual(1)
        expect(state.filteredProjects).toEqual(
          expect.arrayContaining([expect.objectContaining({ id: '2483795' })])
        )
      })

      it('should find projects with two tags selected', () => {
        const projects: ProjectObject = {}

        projects['2483795'] = {
          ...project,
          id: '2483795',
          tags: new Set([Tag['C++'], Tag['SQLServer']]),
        }
        projects['3658047'] = {
          ...project,
          id: '3658047',
          tags: new Set([Tag['Ruby']]),
        }
        projects['3456783'] = {
          ...project,
          id: '3456783',
          tags: new Set([Tag['C++']]),
        }

        const state = setUp({
          state: {
            projects,
            searchCriteria: {
              ...initialState.searchCriteria,
              tags: new Set([Tag['SQLServer'], Tag['Ruby']]),
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
})
