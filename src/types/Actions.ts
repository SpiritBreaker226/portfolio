import { Project, Projects } from './Project'

export interface InitialState {
  projects: Projects
  selectedProject?: Project
}

export enum Types {
  AddProject = 'ADD_PROJECT',
  SelectedProject = 'SELECTED_PROJECT',
}

type ProjectPayload = {
  [Types.AddProject]: {
    projects: Project[]
  }
  [Types.SelectedProject]: {
    selectedProject: Project
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

export type Action = ProjectActions
