import { useState } from 'react'

import { Waypoint } from '../Components'

type InfiniteScrollReturn<T> = {
  fetchMore: (pointToFetchMore: number) => JSX.Element | null
  items: T[]
}

/**
 * hook to do infinite scrolling without having the logic in the code directly
 * @param {T[]} items - Generalize type of the array to use
 * @param {number} limit - number of items to use per page
 * @param {number} defaultPage - which page to start the search
 *
 * @returns {object}
 */
export const useInfiniteScroll = <T,>(
  items: T[],
  limit = 24,
  defaultPage = 1
): InfiniteScrollReturn<T> => {
  const [page, setPage] = useState(defaultPage)
  const numberOfUsers = limit * page + 1

  const fetchMore = (pointToFetchMore: number) =>
    pointToFetchMore + 10 === limit * page ? (
      <Waypoint onEnter={() => setPage(page + 1)} />
    ) : null

  return {
    fetchMore,
    items: items.slice(0, numberOfUsers),
  }
}
