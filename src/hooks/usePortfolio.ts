import { projects } from '../data'

export const usePortfolio = () => {
  const getPortfolios = () => projects

  return { getPortfolios }
}
