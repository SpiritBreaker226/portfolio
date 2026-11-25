import { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { useApp } from '../context'
import { Tag, Types, UpdateSearchTypes } from '../types'
import { PortfolioForm } from './PortfolioForm'
import { Projects } from './Projects'

/**
 * Checks that a URL value names a real `Tag`, so a mistyped or outdated
 * `?tag=` link lists every project instead of none.
 *
 * @example
 * isTag('SQL Server')
 * // => true
 */
const isTag = (value: string | null): value is Tag =>
  Object.values(Tag).includes(value as Tag)

export const Portfolio: FC = () => {
  const {
    state: { filteredProjects },
    dispatch,
  } = useApp()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const tag = searchParams.get('tag')

    if (isTag(tag)) {
      // A tag link starts a new search, so an earlier search on this page
      // can't hide the tag's projects.
      dispatch({ type: Types.ResetSearchCriteria, payload: {} })
      dispatch({
        type: UpdateSearchTypes.Tag,
        payload: { tags: new Set<Tag>([tag]) },
      })
    }

    // Fill the list from the loaded projects and the current search criteria.
    dispatch({
      type: Types.Search,
      payload: {},
    })
    // The URL tag applies once on arrival, so later filter changes are kept.
  }, [dispatch])

  return (
    <section>
      <PortfolioForm />
      <Projects projects={filteredProjects} />
    </section>
  )
}
