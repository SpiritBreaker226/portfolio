import styled from 'styled-components'

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
`

/*
  Wraps cards into as many 280px-wide columns as fit (3 on desktop, 2 on
  tablet, 1 on phone), growing each card to fill its row. `min-width: 0`
  lets long words wrap instead of widening a card past its column.
*/
export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  > * {
    flex: 1 1 280px;
    min-width: 0;
  }
`
