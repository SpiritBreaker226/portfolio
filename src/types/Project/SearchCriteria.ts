import { DisplayOption } from './DisplayOption'
import { Platform, ProjectType } from './enum'

export type SearchCriteria = {
  searchText?: string
  type?: ProjectType
  platforms?: Platform[]
  display: DisplayOption
}
