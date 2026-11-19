import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Navigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'
import { config } from '../config'

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const Title = styled.h1`
  font-family: 'Sacramento', cursive;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  /* On phone the burger is absolutely positioned at the right edge, so
     keep the toggle clear of it. */
  @media (max-width: ${({ theme }) => theme.mobile.turnOnAt}) {
    margin-right: 3.75rem;
  }
`

export const AppHeader: FC = () => (
  <Container>
    <Title>
      <Link to="/">{config.developerName}</Link>
    </Title>

    <Actions>
      <Navigation />
      <ThemeToggle />
    </Actions>
  </Container>
)
