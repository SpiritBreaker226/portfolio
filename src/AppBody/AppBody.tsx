import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { About } from '../About'
import { AppBodyContainer } from './AppBody.style'

export const AppBody: FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <AppBodyContainer>
          <About />
        </AppBodyContainer>
      }
    />
  </Routes>
)
