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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};

  &:hover,
  &:active,
  &:focus-visible {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      border-color 150ms ease,
      color 150ms ease;
  }
`

// needs to be here so that it can load the fontawesome icons
library.add(fab)

export type SocialMediaLinkProps = {
  link: string
  type: IconName
  label: string
}

export const SocialMediaLink: FC<SocialMediaLinkProps> = ({
  type,
  label,
  link,
}) => {
  const iconLookup: IconLookup = { prefix: 'fab', iconName: type }
  const iconDefinition: IconDefinition = findIconDefinition(iconLookup)

  return (
    <Link href={link} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={iconDefinition} aria-hidden="true" widthAuto />
      {label}
    </Link>
  )
}
