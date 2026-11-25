import { FC } from 'react'
import { Outlet as Page, useLocation } from 'react-router'
import styled from 'styled-components'

import { AppBodyContainer } from './AppBody.style'
import { titleCase } from './helpers'

const Title = styled.h1`
  margin-bottom: 24px;
`

export const PageHeader: FC = () => {
  const { pathname } = useLocation()
  const title = titleCase(pathname) || 'Page Not Found'

  return (
    <AppBodyContainer>
      <Title>{title}</Title>

      <Page />
    </AppBodyContainer>
  )
}
