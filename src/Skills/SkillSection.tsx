import { FC, useId } from 'react'
import styled from 'styled-components'

import { CardGrid } from '../Components'
import { SkillGroup } from '../types'
import { SkillCard } from './SkillCard'

const Heading = styled.h2`
  margin-bottom: 20px;
`

export type SkillSectionProps = {
  group: SkillGroup
}

export const SkillSection: FC<SkillSectionProps> = ({ group }) => {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId}>
      <Heading id={headingId}>{group.category}</Heading>

      <CardGrid>
        {group.skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </CardGrid>
    </section>
  )
}
