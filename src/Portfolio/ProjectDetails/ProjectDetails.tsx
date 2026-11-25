import { FC, useCallback } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router'
import styled from 'styled-components'

import { chipStyle, LinkButton } from '../../Components'
import { useApp } from '../../context'
import { Icon } from '../Icon'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    gap: 32px;
  }
`

const Header = styled.div`
  margin-bottom: 24px;
`

const Summary = styled.aside`
  ${({ theme }) => theme.media.tablet} {
    flex: 0 0 220px;
  }
`

const Details = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.tablet} {
    padding-top: 0;
    padding-left: 32px;
    border-top: 0;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`

const Content = styled.p`
  margin-bottom: 1rem;
`

const ContentType = styled.span`
  font-weight: 600;
`

const ResponsibilityContainer = styled.ul`
  margin-bottom: 1rem;
  padding-left: 1.25rem;
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.span`
  ${chipStyle}
  color: ${({ theme }) => theme.colors.primary};
`

const ButtonContainer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px 24px;
  margin-top: 32px;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
`

export const ProjectDetails: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    state: { projects },
  } = useApp()

  const project = projects[id as string]
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
          <Summary>
            <Icon src={project.icon} name={project.name} />

            <Content>{project.name}</Content>

            <Content>
              <ContentType>Type:</ContentType> {project.type}
            </Content>

            <Content>
              <ContentType>Platforms:</ContentType>{' '}
              {Array.from(project.platforms).join(', ')}
            </Content>

            <Content>
              <ContentType>Team Size:</ContentType> {project.teamSize}
            </Content>
          </Summary>

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

            <TagContainer>
              {Array.from(project.tags).map((tag) => (
                <Tag key={`${tag}`}>{tag}</Tag>
              ))}
            </TagContainer>
          </Details>
        </Body>

        {(project.sampleCodeUrl || project.url) && (
          <ButtonContainer>
            {project.sampleCodeUrl && (
              <a href={project.sampleCodeUrl} target="_blank" rel="noreferrer">
                View Sample Code
              </a>
            )}

            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer">
                View {project.name}
              </a>
            )}
          </ButtonContainer>
        )}
      </section>
    </>
  )
}
