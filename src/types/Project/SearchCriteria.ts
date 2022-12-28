import { DisplayOption } from './DisplayOption'
import { Platform, ProjectType, Tag } from './enum'

export type SearchCriteria = {
  searchText: string
  platforms: Set<Platform>
  tags: Set<Tag>
  display: DisplayOption
  type?: ProjectType
}
