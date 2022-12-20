import { FC } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import styled from 'styled-components'

import { usePortfolio } from '../../hooks'

const Container = styled.section`
  display: flex;
`

const Details = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border};
  margin-left: 2rem;
  padding-left: 2rem;
`

const Content = styled.p`
  margin-bottom: 1rem;
`

const ContentType = styled.span`
  font-weight: bold;
`

const ResponsibilityContainer = styled.ul`
  margin-bottom: 1rem;
`

const Icon = styled.img`
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.border};
  height: 128px;
  width: 128px;
  margin-bottom 1rem;
`

export const ProjectDetails: FC = () => {
  const { id } = useParams()
  const { getPortfolio } = usePortfolio()

  const project = getPortfolio(id as string)

  if (!project) {
    return <Navigate replace to="/page-not-found" />
  }

  return (
    <Container>
      <aside>
        <Icon src={`/image/project-icons/${project.icon}`} alt={project.name} />
        <Content>{project.name}</Content>
        <Content>
          <ContentType>Type:</ContentType> {project.type}
        </Content>
        <Content>
          <ContentType>Platforms:</ContentType> {project.platforms.join(', ')}
        </Content>
        <Content>
          <ContentType>Team Size:</ContentType> {project.teamSize}
        </Content>
      </aside>
      <Details>
        <Content>{project.description}</Content>

        <Content>
          <ContentType>Responsibilities:</ContentType>
        </Content>
        <ResponsibilityContainer>
          {project.responsibilities.map((responsibility) => (
            <li key={`${responsibility}`}>{responsibility}</li>
          ))}
        </ResponsibilityContainer>

        <Content>
          <ContentType>Tags:</ContentType>
        </Content>
        {project.tags.map((tag) => (
          <div key={`${tag}`}>{tag}</div>
        ))}
      </Details>
    </Container>
  )
}
