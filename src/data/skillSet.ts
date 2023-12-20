import { Tag } from '../types'

type SkillSet = { [k in Tag]: number }

export const skillSet: Partial<SkillSet> = {
  'Ruby on Rails': 6.5,
  Ruby: 5.5,
  'C++': 5,
  JavaScript: 8.5,
  ReactJS: 8,
  HTML: 7.5,
  CSS: 6,
  SQL: 6,
  'SQL Server': 6,
  PostgreSQL: 6,
  mySQL: 5,
  Git: 9,
}
