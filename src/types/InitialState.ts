import { Project, ProjectObject, SearchCriteria } from './Project'

export type InitialState = {
  projects: ProjectObject
  filteredProjects: Project[]
  searchCriteria: SearchCriteria
}
