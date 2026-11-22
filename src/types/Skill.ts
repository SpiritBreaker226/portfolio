import { Tag } from './Project'

/** The Skills page categories, in the order the page lists them. */
export const skillCategories = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Testing',
  'Cloud & DevOps',
  'Observability',
  'AI Tooling',
] as const

export type SkillCategory = (typeof skillCategories)[number]

export type Skill = {
  name: string
  category: SkillCategory
  /** Years of use, shown as "N+ years". */
  years: number
  /** One or two general sentences on what the skill is used for. */
  summary: string
  /** Portfolio tag that lists the projects using this skill. */
  tag?: Tag
}

export type SkillGroup = {
  category: SkillCategory
  skills: Skill[]
}
