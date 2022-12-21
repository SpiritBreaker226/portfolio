import { Action, InitialState, Projects, Types } from '../types'

export const projectReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.AddProject:
      const projects = action.payload.projects.reduce(
        (prevProject: Projects, project) => {
          prevProject[project.id] = project

          return prevProject
        },
        {}
      )

      return {
        ...state,
        projects,
      }
    default:
      return state
  }
}
