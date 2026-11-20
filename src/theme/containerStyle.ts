import { css } from 'styled-components'

const contentWidth = '1120px'

/**
 * Centres a block at the site's content width (1120px) with the page side
 * padding for each breakpoint (20px phone, 32px tablet, 48px desktop). The
 * padding sits outside the 1120px, so content lines up across the header,
 * page and footer at every width. It sets `width: 100%` because the block
 * can be a flex item, which auto margins would otherwise shrink to its
 * content.
 *
 * @example
 * const Row = styled.div`${containerStyle}`
 * // => <Row> has a content box of at most 1120px, centred, with 20/32/48px side padding
 */
export const containerStyle = css`
  width: 100%;
  max-width: calc(${contentWidth} + 2 * 20px);
  margin-inline: auto;
  padding-inline: 20px;

  ${({ theme }) => theme.media.tablet} {
    max-width: calc(${contentWidth} + 2 * 32px);
    padding-inline: 32px;
  }

  ${({ theme }) => theme.media.desktop} {
    max-width: calc(${contentWidth} + 2 * 48px);
    padding-inline: 48px;
  }
`
