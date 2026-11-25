import { FC } from 'react'
import { Route, Routes } from 'react-router'

import { About } from '../About'
import { Blog } from '../Blog'
import { PageNotFound, Posts } from '../Components'
import { Portfolio, ProjectDetails } from '../Portfolio'
import { Skills } from '../Skills'
import { AppBodyContainer, HomeContainer } from './AppBody.style'
import { PageHeader } from './PageHeader'

export const AppBody: FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <HomeContainer>
          <About />
        </HomeContainer>
      }
    />

    <Route element={<PageHeader />}>
      <Route path="skills" element={<Skills />} />

      <Route path="portfolio">
        <Route index element={<Portfolio />} />
        <Route path=":id" element={<ProjectDetails />} />
      </Route>

      <Route
        path="blog"
        element={
          <Blog>
            <Posts />
          </Blog>
        }
      />
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
