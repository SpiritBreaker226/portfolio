import { FC, useMemo } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Card, chipStyle } from '../Components'
import { useApp } from '../context'
import { Skill, Tag } from '../types'

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 500;
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: auto;
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TagLink = styled(Link)`
  ${chipStyle}
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`

const ProjectsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

/**
 * Builds the Portfolio path filtered by one tag, encoding spaces and
 * symbols so tags such as `SQL Server` and `C#` survive the URL.
 *
 * @example
 * portfolioPath(Tag.SQLServer)
 * // => '/portfolio?tag=SQL+Server'
 */
const portfolioPath = (tag: Tag) =>
  `/portfolio?${createSearchParams({ tag })}`

export type SkillCardProps = {
  skill: Skill
}

export const SkillCard: FC<SkillCardProps> = ({ skill }) => {
  const {
    state: { projects },
  } = useApp()

  const linkedTags = useMemo(() => {
    const projectTags = new Set(
      Object.values(projects).flatMap((project) => Array.from(project.tags))
    )

    return (skill.tags ?? []).filter((tag) => projectTags.has(tag))
  }, [projects, skill.tags])

  const [languageTag] = skill.tags ?? []
  const chipTags = linkedTags.filter((tag) => tag !== languageTag)

  return (
    <Card aria-label={skill.name}>
      <h3>{skill.name}</h3>
      <Meta>{skill.years}+ years</Meta>
      <p>{skill.summary}</p>

      {linkedTags.length > 0 && (
        <Footer>
          {chipTags.length > 0 && (
            <Chips>
              {chipTags.map((tag) => (
                <TagLink key={tag} to={portfolioPath(tag)}>
                  {tag}
                </TagLink>
              ))}
            </Chips>
          )}

          {linkedTags.includes(languageTag) && (
            <ProjectsLink to={portfolioPath(languageTag)}>
              See projects <span aria-hidden="true">→</span>
            </ProjectsLink>
          )}
        </Footer>
      )}
    </Card>
  )
}
