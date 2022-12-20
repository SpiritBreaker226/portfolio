import { FC, useCallback } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { LinkButton } from '../../Components'
import { usePortfolio } from '../../hooks'

const Body = styled.div`
  display: flex;
`

const Header = styled.div`
  text-align: left;
  margin-bottom: 2rem;
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
  const navigate = useNavigate()

  const { getPortfolio } = usePortfolio()

  const project = getPortfolio(id as string)
  const backButton = useCallback(() => navigate(-1), [navigate])

  if (!project) {
    return <Navigate replace to="/page-not-found" />
  }

  return (
    <>
      <section>
        <Header>
          <LinkButton onClick={backButton}>Back</LinkButton>
        </Header>
        <Body>
          <aside>
            <Icon
              src={`/image/project-icons/${project.icon}`}
              alt={project.name}
            />
            <Content>{project.name}</Content>
            <Content>
              <ContentType>Type:</ContentType> {project.type}
            </Content>
            <Content>
              <ContentType>Platforms:</ContentType>{' '}
              {project.platforms.join(', ')}
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
        </Body>
      </section>
    </>
  )
}
