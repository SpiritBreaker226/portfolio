import { FC } from 'react'
import styled, { keyframes } from 'styled-components'

import { Project } from '../../types'
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

const Icon = styled.img`
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.border};
  height: 128px;
  width: 128px;
  margin-bottom 1rem;
`

const Name = styled.p`
  margin-bottom: 1rem;
  font-weight: bold;
`

const Summary = styled.p`
  margin-bottom 1rem;
`

export type ProjectItemProps = {
  project: Project
}

export const ProjectItem: FC<ProjectItemProps> = ({ project }) => (
  <Container aria-label={project.name}>
    <Icon src={`/image/project-icons/${project.icon}`} alt={project.name} />

    <Name>{project.name}</Name>

    <Summary>{projectSummary(project.description)}</Summary>
  </Container>
)
