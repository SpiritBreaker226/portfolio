import { skillSet } from '../data'
import { groupSkillsByCategory } from '../helpers'

/**
 * Returns the skills grouped by category for the Skills page. It sits
 * behind a hook so components and tests swap the data in one place.
 *
 * @example
 * useSkills()
 * // => [{ category: 'Languages', skills: [...] }, { category: 'Frontend', skills: [...] }, ...]
 */
export const useSkills = () => groupSkillsByCategory(skillSet)
