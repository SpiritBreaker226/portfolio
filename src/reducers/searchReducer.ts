import { initialState } from '../context'
import {
  Action,
  InitialState,
  Project,
  Types,
  UpdateSearchTypes,
} from '../types'

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.Search:
      // TODO look into making the search more effective
      const { searchText, type, display, platforms, tags } =
        state.searchCriteria
      let filteredProjects: Project[] =
        display === 'feature'
          ? Object.values(state.projects).filter((project) => project.isFeature)
          : Object.values(state.projects)

      if (searchText) {
        filteredProjects = filteredProjects.filter(
          (project) =>
            project.name.toLowerCase().includes(searchText.toLowerCase()) ||
            project.description.toLowerCase().includes(searchText.toLowerCase())
        )
      }

      if (type) {
        filteredProjects = filteredProjects.filter(
          (project) => project.type === type
        )
      }

      if (platforms.size) {
        filteredProjects = filteredProjects.filter((project) =>
          Array.from(platforms).some((platform) =>
            project.platforms.has(platform)
          )
        )
      }

      if (tags.size) {
        filteredProjects = filteredProjects.filter((project) =>
          Array.from(tags).some((tag) => project.tags.has(tag))
        )
      }

      return {
        ...state,
        filteredProjects,
      }
    case Types.ResetSearchCriteria:
      return {
        ...state,
        searchCriteria: {
          ...initialState.searchCriteria,
        },
      }
    case UpdateSearchTypes.Text:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          searchText: action.payload.searchText,
        },
      }
    case UpdateSearchTypes.Type:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          type: action.payload.type,
        },
      }
    case UpdateSearchTypes.Platform:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          platforms: action.payload.platforms,
        },
      }
    case UpdateSearchTypes.Tag:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          tags: action.payload.tags,
        },
      }
    case UpdateSearchTypes.Display:
      return {
        ...state,
        searchCriteria: {
          ...state.searchCriteria,
          display: action.payload.display,
        },
      }
    default:
      return state
  }
}
