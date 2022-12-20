import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { About } from '../About'
import { PageNotFound } from '../Components'
import { Portfolio } from '../Portfolio'
import { Skills } from '../Skills'
import { AppBodyContainer } from './AppBody.style'
import { Banner } from './Banner'

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

    <Route element={<Banner />}>
      <Route path="skills" element={<Skills />} />
      <Route path="portfolio" element={<Portfolio />} />
    </Route>

    <Route
      path="*"
      element={
        <AppBodyContainer>
          <PageNotFound />
        </AppBodyContainer>
      }
    />
  </Routes>
)
