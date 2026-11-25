import { FC } from 'react'
import { Link } from 'react-router'
import styled, { keyframes } from 'styled-components'

import { Card } from '../../Components'
import { Project } from '../../types'
import { Icon } from '../Icon'
import { projectSummary } from './helpers'
import { ProjectTags } from './ProjectTags'

const fade = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const Container = styled(Card)`
  flex: 1;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fade} 600ms ease;
  }
`

const IconLink = styled(Link)`
  align-self: flex-start;
  display: inline-flex;
  border-radius: 50%;
`

const Summary = styled.p`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.muted};
`

const DetailsLink = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 6px;
  min-height: 44px;
`

export type ProjectItemProps = {
  project: Project
}

export const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  const detailsPath = `/portfolio/${project.id}`

  return (
    <Container aria-label={project.name}>
      <IconLink to={detailsPath} tabIndex={-1} aria-hidden="true">
        <Icon src={project.icon} name={project.name} />
      </IconLink>

      <h3>{project.name}</h3>

      <Summary>{projectSummary(project.description)}</Summary>

      <ProjectTags tags={project.tags} />

      <DetailsLink to={detailsPath}>
        View Details <span aria-hidden="true">→</span>
      </DetailsLink>
    </Container>
  )
}
