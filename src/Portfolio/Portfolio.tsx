import { FC, useCallback, useEffect } from 'react'

import { useApp } from '../context'
import { usePortfolio } from '../hooks'
import { Types } from '../types'
import { ProjectList } from './ProjectList'

export const Portfolio: FC = () => {
  const {
    state: { projects },
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
  }, [dispatch, dataProjects])

  return (
    <section>
      <ProjectList projects={Object.values(projects)} />
    </section>
  )
}
