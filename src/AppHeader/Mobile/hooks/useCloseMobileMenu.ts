import { RefObject, useEffect } from 'react'

/**
 * Calls `close` when the visitor dismisses the mobile menu: a mousedown
 * anywhere outside `ref`'s element, or the Escape key. `ref` should hold
 * both the menu button and the menu, so clicking either one doesn't count
 * as outside.
 *
 * @example
 * useCloseMobileMenu(headerRef, () => setIsMenuOpen(false))
 * // => a mousedown outside the header, or Escape, calls setIsMenuOpen(false)
 */
export const useCloseMobileMenu = (
  ref: RefObject<HTMLElement>,
  close: () => void
) => {
  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close()
      }
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('mousedown', handleMousedown)
    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('mousedown', handleMousedown)
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [close, ref])
}
