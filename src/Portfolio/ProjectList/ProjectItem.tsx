import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Button } from '../../Components'
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

  return (
    <Container aria-label={project.name}>
      <Icon src={`/image/project-icons/${project.icon}`} alt={project.name} />

      <Name>{project.name}</Name>

      <Summary>{projectSummary(project.description)}</Summary>

      <Button onClick={() => navigate(project.id)}>View Details</Button>
    </Container>
  )
}
