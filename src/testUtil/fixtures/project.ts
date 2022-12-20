import { faker } from '@faker-js/faker'

import { Platform, Project, ProjectType, Tag } from '../../types'

export const project: Project = {
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.hacker.phrase(),
  responsibilities: faker.helpers.arrayElements([
    faker.lorem.sentence(7),
    faker.lorem.sentence(6),
    faker.lorem.sentence(5),
  ]),
  tags: faker.helpers.arrayElements([
    Tag['C#'],
    Tag['JavaScript'],
    Tag['CSS'],
    Tag['HTML'],
    Tag['SQLServer'],
    Tag['Phonegap'],
  ]),
  teamSize: Number(faker.random.numeric()),
  platforms: faker.helpers.arrayElements([
    Platform['mobile'],
    Platform['web'],
    Platform['game'],
  ]),
  type: faker.helpers.arrayElement([ProjectType['Close'], ProjectType['Open']]),
  url: faker.helpers.arrayElement([faker.internet.url(), '']),
  icon: faker.image.business(128, 128),
  sampleCodeUrl: faker.helpers.arrayElement([faker.internet.url(), '']),
  isFeature: faker.datatype.boolean(),
}
