import { FC } from 'react'
import { Outlet as Page, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { AppBodyContainer } from './AppBody.style'
import { titleCase } from './helpers'

export const Container = styled.div`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.secondary};
  padding: 3rem 3rem 2rem;
  margin: 2rem 3rem 0 0;
`

export const Banner: FC = () => {
  const { pathname } = useLocation()
  const title = titleCase(pathname) || 'Page Not Found'

  return (
    <>
      <Container>
        <h2>{title}</h2>
      </Container>

      <AppBodyContainer>
        <Page />
      </AppBodyContainer>
    </>
  )
}
