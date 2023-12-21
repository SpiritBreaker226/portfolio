import { Platform, ProjectType, Tag } from './enum'

export type SearchCriteria = {
  searchText: string
  platforms: Set<Platform>
  tags: Set<Tag>
  type?: ProjectType
}
