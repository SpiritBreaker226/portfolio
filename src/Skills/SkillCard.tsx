import { FC } from 'react'
import styled from 'styled-components'

import { Card } from '../Components'
import { Skill } from '../types'

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 500;
`

export type SkillCardProps = {
  skill: Skill
}

export const SkillCard: FC<SkillCardProps> = ({ skill }) => (
  <Card>
    <h3>{skill.name}</h3>
    <Meta>{skill.years}+ years</Meta>
    <p>{skill.summary}</p>
  </Card>
)
