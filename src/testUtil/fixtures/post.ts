import { faker } from '@faker-js/faker'

import { Post, Tag } from '../../types'

export const post: Post = {
  type_of: 'article',
  id: faker.datatype.number(8),
  title: faker.company.catchPhrase(),
  description: faker.lorem.sentence(),
  readable_publish_date: faker.date.past().toString(),
  slug: faker.lorem.slug(),
  path: faker.internet.url(),
  url: faker.internet.url(),
  comments_count: faker.datatype.number(8),
  public_reactions_count: faker.datatype.number(8),
  collection_id: faker.helpers.arrayElement([faker.datatype.number(8), null]),
  published_timestamp: faker.datatype.datetime().toDateString(),
  positive_reactions_count: faker.datatype.number(8),
  cover_image: faker.image.nightlife(),
  social_image: faker.image.nightlife(),
  canonical_url: faker.internet.url(),
  created_at: faker.date.past().toString(),
  edited_at: faker.date.past().toString(),
  crossposted_at: faker.helpers.arrayElement([
    faker.date.past().toString(),
    null,
  ]),
  published_at: faker.date.past().toString(),
  last_comment_at: faker.date.past().toString(),
  reading_time_minutes: faker.datatype.number(8),
  tag_list: faker.helpers.arrayElements([
    Tag['C#'],
    Tag['JavaScript'],
    Tag['CSS'],
    Tag['HTML'],
    Tag['SQLServer'],
    Tag['Phonegap'],
  ]),
  tags: faker.helpers
    .arrayElements([
      Tag['C#'],
      Tag['JavaScript'],
      Tag['CSS'],
      Tag['HTML'],
      Tag['SQLServer'],
      Tag['Phonegap'],
    ])
    .join(', '),
  user: {
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    twitter_username: faker.internet.userName(),
    github_username: faker.internet.userName(),
    user_id: faker.datatype.number(8),
    website_url: faker.internet.url(),
    profile_image: faker.image.avatar(),
    profile_image_90: faker.image.avatar(),
  },
}
