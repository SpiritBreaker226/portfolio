import { Post } from './Blog'
import { Project, ProjectObject, SearchCriteria } from './Project'

export type InitialState = {
  posts: Post[]
  projects: ProjectObject
  filteredProjects: Project[]
  searchCriteria: SearchCriteria
}
