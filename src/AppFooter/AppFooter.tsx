import { FC } from 'react'
import styled from 'styled-components'

import { config } from '../config'
import { containerStyle } from '../theme'
import { SocialMediaLink } from './SocialMediaLink'

const Container = styled.footer`
  background: ${(props) => props.theme.colors.surface};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`

const Row = styled.div`
  ${containerStyle}
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-block: 24px;
`

const Copyright = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.muted};
`

const SocialLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const AppFooter: FC = () => (
  <Container>
    <Row>
      <Copyright>
        © {new Date().getFullYear()} {config.developerName}
      </Copyright>

      <SocialLinks aria-label="Social">
        <SocialMediaLink
          type="github"
          label="GitHub"
          link="https://github.com/SpiritBreaker226"
        />
        <SocialMediaLink
          type="linkedin"
          label="LinkedIn"
          link="https://www.linkedin.com/in/jasonstathopulos"
        />
        <SocialMediaLink
          type="dev"
          label="DEV"
          link="https://dev.to/jstats"
        />
      </SocialLinks>
    </Row>
  </Container>
)
