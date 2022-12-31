import { faker } from '@faker-js/faker'

import { Contact } from '../../types'

export const contact: Contact = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number('+# ###-###-####'),
  question: faker.hacker.abbreviation(),
}
