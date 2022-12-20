import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Button, LinkButton } from '../../Components'
import { Project } from '../../types'
import { Icon } from '../Project.style'
import { projectSummary } from './helpers'

const fade = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const Container = styled.article`
  animation: ${fade} 2s linear;
  max-width: 20rem;
  text-align: center;
  margin-bottom: 2.5rem;
`

const Name = styled.p`
  margin-bottom: 1rem;
  font-weight: bold;
`

const Summary = styled.p`
  margin-bottom 1rem;
  min-height: 8rem;
`

export type ProjectItemProps = {
  project: Project
}

export const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  const navigate = useNavigate()

  const toProjectDetailsButton = useCallback(
    () => navigate(project.id),
    [navigate, project]
  )

  return (
    <Container aria-label={project.name}>
      <LinkButton onClick={toProjectDetailsButton}>
        <Icon src={`/image/project-icons/${project.icon}`} alt={project.name} />
      </LinkButton>

      <Name>{project.name}</Name>

      <Summary>{projectSummary(project.description)}</Summary>

      <Button onClick={toProjectDetailsButton}>View Details</Button>
    </Container>
  )
}
