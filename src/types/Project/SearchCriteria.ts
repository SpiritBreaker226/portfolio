import { Platform, ProjectType } from './enum'

export type SearchCriteria = {
  searchText?: string
  type?: ProjectType
  platforms?: Platform[]
  display: DisplayOption
}

export type DisplayOption = 'feature' | 'all'
