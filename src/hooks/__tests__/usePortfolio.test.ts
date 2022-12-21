import { renderHook } from '@testing-library/react'

import { projects } from '../../data'
import { usePortfolio } from '../usePortfolio'

describe('usePortfolio', () => {
  describe('getPortfolios', () => {
    it('should get portfolios', () => {
      const { result } = renderHook(() => usePortfolio())

      const portfolios = result.current.getPortfolios()

      expect(portfolios[0].id).toEqual(projects[0].id)
    })
  })
})
