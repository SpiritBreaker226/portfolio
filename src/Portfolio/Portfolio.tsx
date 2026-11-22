import { FC, useEffect } from 'react'

import { useApp } from '../context'
import { Types } from '../types'
import { PortfolioForm } from './PortfolioForm'
import { Projects } from './Projects'

export const Portfolio: FC = () => {
  const {
    state: { filteredProjects },
    dispatch,
  } = useApp()

  useEffect(() => {
    // Fill the list from the loaded projects and the current search criteria.
    dispatch({
      type: Types.Search,
      payload: {},
    })
  }, [dispatch])

  return (
    <section>
      <PortfolioForm />
      <Projects projects={filteredProjects} />
    </section>
  )
}
