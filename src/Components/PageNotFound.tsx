import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
  text-align: center;
`

const Video = styled.iframe`
  margin: 2rem 0;
`

export const PageNotFound: FC = () => (
  <Container>
    <h2>Error 404 Not Found</h2>
    <p>
      Well, this is awkward. We don't find your page. Here's a video to make it
      up.
    </p>

    <Video
      width="560"
      height="315"
      src="https://www.youtube.com/embed/lFcSrYw-ARY?start=2161"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Video>

    <footer>
      <Link to="/">Click here</Link> to return home
    </footer>
  </Container>
)
