import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'

import { render } from '../testUtil'
import { Icon, IconProps } from './Icon'

describe('GIVEN using Icon', () => {
  const defaultProps: IconProps = {
    src: faker.image.url({ width: 128, height: 128 }),
    name: faker.company.name(),
  }

  const setUp = (props: Partial<IconProps> = {}) => {
    render(<Icon {...defaultProps} {...props} />)
  }

  test('WHEN given a project name THEN the icon is named after the project', async () => {
    const name = faker.company.name()

    setUp({ name })

    expect(await screen.findByAltText(name)).toBeInTheDocument()
  })

  test('WHEN no icon is given THEN it shows the placeholder icon', async () => {
    setUp({ src: undefined })

    expect(await screen.findByAltText('placeholder icon')).toBeInTheDocument()
  })
})
