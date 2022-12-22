import { DisplayOption, Platform, Project, ProjectType } from './Project'

export enum Types {
  AddProject = 'ADD_PROJECT',
  Search = 'SEARCH',
  ResetSearchCriteria = 'REST_SEARCH_CRITERIA',
}

export enum UpdateSearchTypes {
  Text = 'UPDATE_SEARCH_TEXT',
  Type = 'UPDATE_SEARCH_TYPE',
  Platform = 'UPDATE_SEARCH_PLATFORM',
  Display = 'UPDATE_SEARCH_DISPLAY',
}

type ProjectPayload = {
  [Types.AddProject]: {
    projects: Project[]
  }
}

type SearchPayload = {
  [Types.Search]: {}
  [Types.ResetSearchCriteria]: {}
  [UpdateSearchTypes.Text]: {
    searchText: string
  }
  [UpdateSearchTypes.Type]: {
    type?: ProjectType
  }
  [UpdateSearchTypes.Platform]: {
    platforms?: Platform[]
  }
  [UpdateSearchTypes.Display]: {
    display: DisplayOption
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type ProjectActions =
  ActionMap<ProjectPayload>[keyof ActionMap<ProjectPayload>]

export type SearchActions =
  ActionMap<SearchPayload>[keyof ActionMap<SearchPayload>]

export type Action = ProjectActions | SearchActions
