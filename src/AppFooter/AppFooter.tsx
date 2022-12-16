import { FC } from 'react'
import styled from 'styled-components'

import { SocialMediaLink } from './SocialMediaLink'

const Container = styled.footer`
  padding: 3rem;
  background-color: ${(props) => props.theme.colors.primary};
`

const Title = styled.h3`
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 2rem;
`

const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 3rem;
`

export const AppFooter: FC = () => (
  <Container>
    <Title>Find Me On Social Media</Title>

    <SocialMediaContainer>
      <SocialMediaLink type="twitter" link="https://twitter.com/JasonStats" />
      <SocialMediaLink type="dev" link="https://dev.to/jstats" />
      <SocialMediaLink
        type="linkedin"
        link="https://www.linkedin.com/in/jasonstathopulos"
      />
      <SocialMediaLink
        type="github"
        link="https://github.com/SpiritBreaker226"
      />
      <SocialMediaLink
        type="instagram"
        link="http://instagram.com/jasonstats"
      />
    </SocialMediaContainer>
  </Container>
)
