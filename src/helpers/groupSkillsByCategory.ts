import { Skill, SkillGroup, skillCategories } from '../types'

/**
 * Groups skills under their category so the Skills page can render one
 * section per category. Groups follow the `skillCategories` order rather
 * than the order skills appear in, so the page layout stays fixed as the
 * list changes. Skills keep their order within a group, and categories
 * with no skills are left out so no empty section renders.
 *
 * @example
 * groupSkillsByCategory([
 *   { name: 'Jest', category: 'Testing', years: 5, summary: '…' },
 *   { name: 'Ruby', category: 'Languages', years: 3, summary: '…' },
 * ])
 * // => [{ category: 'Languages', skills: [Ruby] }, { category: 'Testing', skills: [Jest] }]
 */
export const groupSkillsByCategory = (skills: Skill[]): SkillGroup[] =>
  skillCategories
    .map((category) => ({
      category,
      skills: skills.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.skills.length > 0)
