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
  Lays cards out in as many equal columns of at least 280px as fit (3 on
  desktop, 2 on tablet, 1 on phone). A card alone on the last row keeps its
  column width instead of stretching across the row. `min(280px, 100%)` stops
  a column overflowing a container narrower than 280px, and `min-width: 0`
  lets long words wrap instead of widening a card past its column.
*/
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 20px;

  > * {
    min-width: 0;
  }
`
