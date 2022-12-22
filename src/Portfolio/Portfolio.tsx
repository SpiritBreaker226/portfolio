import { FC, useCallback, useEffect } from 'react'

import { useApp } from '../context'
import { usePortfolio } from '../hooks'
import { Types } from '../types'
import { PortfolioForm } from './PortfolioForm'
import { ProjectList } from './ProjectList'

export const Portfolio: FC = () => {
  const {
    state: { filteredProjects },
    dispatch,
  } = useApp()

  const { getPortfolios } = usePortfolio()
  const dispatchProjects = useCallback(getPortfolios, [getPortfolios])
  const dataProjects = dispatchProjects()

  useEffect(() => {
    dispatch({
      type: Types.AddProject,
      payload: { projects: dataProjects },
    })

    // show only feature projects
    dispatch({
      type: Types.Search,
      payload: {},
    })
  }, [dispatch, dataProjects])

  return (
    <section>
      <PortfolioForm />
      <ProjectList projects={filteredProjects} />
    </section>
  )
}
