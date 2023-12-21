import { faker } from '@faker-js/faker'
import { screen } from '@testing-library/react'

import { render } from '../../testUtil'
import { Icon, IconProps } from '../Icon'

describe('Icon', () => {
  const defaultProps: IconProps = {
    src: faker.image.business(128, 128),
    name: faker.company.name(),
  }

  const setUp = (props: Partial<IconProps> = {}) => {
    render(<Icon {...defaultProps} {...props} />)
  }

  it('should show project icon', async () => {
    const name = faker.company.name()

    setUp({ name })

    await screen.findByAltText(name)
  })

  it('should show icon placeholder when no icon is provided', async () => {
    setUp({ src: undefined })

    await screen.findByAltText('placeholder icon')
  })
})
