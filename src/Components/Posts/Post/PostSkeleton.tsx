import { FC } from 'react'
import styled from 'styled-components'

import { loadingStyle } from '../../../theme'
import { CardGrid } from '../../Card'
import { PostContainer } from './Post.style'

const Line = styled.div`
  ${loadingStyle}
  overflow: hidden;
  height: 14px;
  border-radius: 6px;
`

const DateLine = styled(Line)`
  width: 35%;
`

const TitleLine = styled(Line)`
  width: 85%;
  height: 20px;
`

const TextLine = styled(Line)`
  width: 100%;
`

const ShortTextLine = styled(Line)`
  width: 70%;
`

const LinkLine = styled(Line)`
  width: 40%;
  margin-top: 14px;
`

/*
  The reason for the letters is to make the key prop unique so that React can
  keep track of those components in memory; thus, React can take those items
  and update them accordingly when the component re-renders. Otherwise, React
  could update the wrong row and display the incorrect data to the user even tho
  the array is correct.
  Also, the `array.map` index should not be used as it will cause the same bug
  since React does not know which row was updated since the index can change on
  different renders; a more consistent key prop should be used.
*/
export const PostSkeleton: FC = () => (
  <CardGrid role="tablist">
    {['a', 'b', 'c'].map((letter) => (
      <PostContainer key={`postSkeleton${letter}`}>
        <DateLine />
        <TitleLine />
        <TextLine />
        <ShortTextLine />
        <LinkLine />
      </PostContainer>
    ))}
  </CardGrid>
)
