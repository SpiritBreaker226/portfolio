import { FC } from 'react'
import styled from 'styled-components'

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { Project } from '../../types'
import { ProjectItem } from './ProjectItem'

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
`

export type ProjectsProps = {
  projects: Project[]
}

export const Projects: FC<ProjectsProps> = ({ projects }) => {
  const { fetchMore, items: currentProjects } = useInfiniteScroll<Project>(
    Object.values(projects)
  )

  return (
    <Container aria-live="polite">
      {currentProjects.map((project, index) => (
        <span key={project.id}>
          <ProjectItem project={project} />

          {fetchMore(index)}
        </span>
      ))}
    </Container>
  )
}
