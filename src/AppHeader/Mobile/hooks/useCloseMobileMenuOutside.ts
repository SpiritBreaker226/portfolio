import { RefObject, useCallback, useEffect } from 'react'

export const useCloseMobileMenuOutside = (
  ref: RefObject<HTMLDivElement>,
  callback: (event: MouseEvent) => void
) => {
  const handleMousedown = useCallback(
    (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as HTMLInputElement)) {
        callback(e)
      }
    },
    [callback, ref]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleMousedown)

    return () => {
      document.removeEventListener('mousedown', handleMousedown)
    }
  }, [handleMousedown])
}
