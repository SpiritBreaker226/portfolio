import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Navigation } from './Navigation'

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

export const AppHeader: FC = () => (
  <Container>
    <Title>
      <Link to="/">{process.env.REACT_APP_DEVELOPER_NAME}</Link>
    </Title>

    <Navigation />
  </Container>
)
