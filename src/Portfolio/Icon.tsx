import { FC } from 'react'
import styled from 'styled-components'

export const IconImage = styled.img`
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.border};
  height: 128px;
  width: 128px;
  margin-bottom 1rem;
`

const IconPlaceHolder = styled.p`
  margin-bottom: 1rem;
  height: 128px;
`

export type IconProps = {
  src?: string
  name?: string
}

export const Icon: FC<IconProps> = ({ src, name }) => (
  <>
    {src ? (
      <IconImage src={`/image/project-icons/${src}`} alt={name} />
    ) : (
      <IconPlaceHolder>
        <IconImage
          src={'/image/project-icons/iconMySite.png'}
          alt="placeholder icon"
        />
      </IconPlaceHolder>
    )}
  </>
)
