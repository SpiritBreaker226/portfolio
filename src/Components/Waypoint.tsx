import { FC, useEffect } from 'react'

export type WaypointProps = { onEnter: () => void }

/**
 * The Waypoint component is a component that can work in an if statement since
 * a hook cannot be used in an if statement. An idea to use the fact that we are
 * using a component, we could use the div and display a loading indicator.
 * However, in this case, it is not needed, and the data is loading locally.
 * Furthermore, time is running out; this will be left out for now.
 * @param {() => void} onEnter - callback once waypoint has been entered
 */
export const Waypoint: FC<WaypointProps> = ({ onEnter }) => {
  useEffect(() => {
    const onScroll = function () {
      if (
        window.innerHeight + window.scrollY + 1024 >=
        document.body.offsetHeight
      ) {
        onEnter()
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onEnter])

  return <div />
}
