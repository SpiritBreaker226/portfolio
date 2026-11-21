import { FC } from 'react'
import styled from 'styled-components'

import { CardGrid } from '../../Components'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { Project } from '../../types'
import { ProjectItem } from './ProjectItem'

const Cell = styled.div`
  display: flex;
  flex-direction: column;
`

export type ProjectsProps = {
  projects: Project[]
}

export const Projects: FC<ProjectsProps> = ({ projects }) => {
  const { fetchMore, items: currentProjects } = useInfiniteScroll<Project>(
    Object.values(projects)
  )

  return (
    <CardGrid aria-live="polite">
      {currentProjects.map((project, index) => (
        <Cell key={project.id}>
          <ProjectItem project={project} />

          {fetchMore(index)}
        </Cell>
      ))}
    </CardGrid>
  )
}
