import { Project } from '../types'
import { projects } from '../data'

export const usePortfolio = () => {
  const getPortfolios = () => projects
  const getPortfolio = (id: Project['id']) =>
    projects.find((project) => project.id === id)

  return { getPortfolios, getPortfolio }
}
