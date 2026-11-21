import { FC } from 'react'
import styled from 'styled-components'

export const IconImage = styled.img`
  width: 96px;
  height: 96px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  object-fit: contain;
  background: ${({ theme }) => theme.colors.iconBg};
`

export type IconProps = {
  src?: string
  name?: string
}

export const Icon: FC<IconProps> = ({ src, name }) =>
  src ? (
    <IconImage src={`/image/project-icons/${src}`} alt={name} />
  ) : (
    <IconImage
      src={'/image/project-icons/iconMySite.png'}
      alt="placeholder icon"
    />
  )
