import { Platform, Tag, ProjectType } from './enum'

export type Project = {
  id: string
  name: string
  summary: string
  responsibilities: string[]
  tags: Tag[]
  teamSize: number
  platforms: Platform[]
  type: ProjectType
  isFeature: boolean
  url?: string
  sampleCodeUrl?: string
}
