import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
  text-align: center;
`

const Title = styled.h1`
  margin-bottom: 24px;
`

const Video = styled.iframe`
  width: 100%;
  max-width: 560px;
  height: auto;
  aspect-ratio: 16 / 9;
  margin: 2rem 0;
  border: 0;
`

export const PageNotFound: FC = () => (
  <Container>
    <Title>Error 404 Not Found</Title>
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
