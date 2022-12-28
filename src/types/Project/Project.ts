import { Platform, Tag, ProjectType } from './enum'

export type Project = {
  id: string
  name: string
  description: string
  responsibilities: string[]
  tags: Set<Tag>
  teamSize: number
  platforms: Set<Platform>
  type: ProjectType
  icon: string
  isFeature: boolean
  url?: string
  sampleCodeUrl?: string
}

export type ProjectObject = { [key: string]: Project }
