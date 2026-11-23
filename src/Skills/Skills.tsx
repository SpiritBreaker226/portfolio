import { FC } from 'react'
import styled from 'styled-components'

import { useSkills } from '../hooks'
import { SkillSection } from './SkillSection'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const Intro = styled.p`
  max-width: 68ch;
  color: ${({ theme }) => theme.colors.muted};
`

export const Skills: FC = () => {
  const skillGroups = useSkills()

  return (
    <Page>
      <Intro>
        These Skills are a rough estimation of what I have been doing. Over the
        course of my career and free time, these are updated yearly.
      </Intro>

      {skillGroups.map((group) => (
        <SkillSection key={group.category} group={group} />
      ))}
    </Page>
  )
}
