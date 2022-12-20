import { FC } from 'react'

import { usePortfolio } from '../hooks'
import { ProjectList } from './ProjectList'

export const Portfolio: FC = () => {
  const { getPortfolios } = usePortfolio()

  return (
    <section>
      <ProjectList projects={getPortfolios()} />
    </section>
  )
}
