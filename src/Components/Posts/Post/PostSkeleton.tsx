import { FC } from 'react'
import styled, { css } from 'styled-components'

import { loadingStyle } from '../../../theme'
import { PostContainer, PostText, PostFooterText } from './Post.style'

const SkeletonText = css`
  height: 1rem;
`

const Title = styled(PostText)`
  ${loadingStyle}
  ${SkeletonText}
  max-width: 512px;
`

const Text = styled(PostText)`
  ${loadingStyle}
  ${SkeletonText}
  max-width: 560px;
`

const FooterTextSkeleton = styled(PostFooterText)`
  ${loadingStyle}
  ${SkeletonText}
  max-width: 256px;
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
  <div role="tablist">
    {['a', 'b', 'c'].map((letter) => (
      <PostContainer key={`postSkeleton${letter}`}>
        <Title />

        <Text />

        <footer>
          <FooterTextSkeleton />
        </footer>
      </PostContainer>
    ))}
  </div>
)
