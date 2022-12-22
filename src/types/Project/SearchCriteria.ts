import { DisplayOption } from './DisplayOption'
import { Platform, ProjectType } from './enum'

export type SearchCriteria = {
  searchText: string
  platforms: Set<Platform>
  display: DisplayOption
  type?: ProjectType
}
