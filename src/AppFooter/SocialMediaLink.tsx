import {
  findIconDefinition,
  IconDefinition,
  IconLookup,
  IconName,
  library,
} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import styled from 'styled-components'

const Link = styled.a`
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.secondary};

  &:active,
  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.secondary};
  }
`

// needs to be here so that it can load the fontawesome icons
library.add(fab)

export type SocialMediaLinkProps = {
  link: string
  type: IconName
}

export const SocialMediaLink: FC<SocialMediaLinkProps> = ({ type, link }) => {
  const iconLookup: IconLookup = { prefix: 'fab', iconName: type }
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup)

  return (
    <Link
      href={link}
      title={`See ${
        process.env.REACT_APP_DEVELOPER_NAME
      } account on ${type[0].toUpperCase()}${type.slice(1).toLowerCase()}`}
      target="_blank"
      rel="noreferrer">
      <FontAwesomeIcon icon={iconDefinition} size="4x" />
    </Link>
  )
}
