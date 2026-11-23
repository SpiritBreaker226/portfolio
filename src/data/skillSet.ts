import { Skill, Tag } from '../types'

export const skillSet: Skill[] = [
  {
    name: 'JavaScript',
    category: 'Languages',
    years: 15,
    summary:
      'The language of the browser, used for interactive interfaces, single-page apps and Node.js services.',
    tags: [Tag.JavaScript],
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    years: 10,
    summary:
      'JavaScript with static types, which catch mistakes before the code runs and make large codebases easier to change.',
    tags: [Tag.JavaScript],
  },
  {
    name: 'Ruby',
    category: 'Languages',
    years: 3,
    summary:
      'A dynamic language built for readable code, best known as the language behind Ruby on Rails.',
    tags: [Tag.Ruby],
  },
  {
    name: 'HTML',
    category: 'Languages',
    years: 15,
    summary:
      'The markup that gives a web page its structure and meaning, which also shapes how assistive technology reads it.',
    tags: [Tag.HTML],
  },
  {
    name: 'CSS',
    category: 'Languages',
    years: 15,
    summary:
      'The styling language of the web, used for layout, typography, theming and responsive design.',
    tags: [Tag.CSS],
  },
  {
    name: 'React',
    category: 'Frontend',
    years: 10,
    summary:
      'A library for building user interfaces from reusable components that update when their data changes.',
    tags: [Tag.JavaScript, Tag.ReactJS],
  },
  {
    name: 'Redux',
    category: 'Frontend',
    years: 5,
    summary:
      'A predictable state container that keeps app state in one store, updated only through actions.',
    tags: [Tag.ReactJS],
  },
  {
    name: 'Apollo',
    category: 'Frontend',
    years: 1,
    summary:
      'A GraphQL client that fetches, caches and updates data for React apps.',
  },
  {
    name: 'Storybook',
    category: 'Frontend',
    years: 1,
    summary:
      'A workshop for building and documenting UI components on their own, outside the app.',
  },
  {
    name: 'Webpack',
    category: 'Frontend',
    years: 2,
    summary:
      'A module bundler that turns source files and assets into optimised bundles for the browser.',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    years: 2,
    summary:
      'A JavaScript runtime outside the browser, used for servers, APIs, scripts and build tools.',
    tags: [Tag.JavaScript],
  },
  {
    name: 'Express',
    category: 'Backend',
    years: 2,
    summary:
      'A minimal Node.js web framework for routing requests and building APIs.',
    tags: [Tag.JavaScript],
  },
  {
    name: 'Ruby on Rails',
    category: 'Backend',
    years: 3,
    summary:
      'A full-stack Ruby framework that favours convention over configuration for database-backed web apps.',
    tags: [Tag.Ruby, Tag.Rails],
  },
  {
    name: 'GraphQL',
    category: 'Backend',
    years: 1,
    summary:
      'A query language for APIs that lets clients ask for exactly the data they need in one request.',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    years: 5,
    summary:
      'Resource-based HTTP APIs, the common way web and mobile clients talk to servers.',
  },
  {
    name: 'PostgreSQL',
    category: 'Databases',
    years: 3,
    summary:
      'An open-source relational database known for standards compliance, reliability and rich data types.',
    tags: [Tag.SQL, Tag.PostgreSQL],
  },
  {
    name: 'MySQL',
    category: 'Databases',
    years: 2,
    summary:
      'A widely used open-source relational database, common in web hosting and content sites.',
    tags: [Tag.SQL, Tag.mySQL],
  },
  {
    name: 'SQL Server',
    category: 'Databases',
    years: 3,
    summary:
      "Microsoft's relational database, common in business applications and the .NET ecosystem.",
    tags: [Tag.SQL, Tag.SQLServer],
  },
  {
    name: 'Jest',
    category: 'Testing',
    years: 5,
    summary:
      'A JavaScript test runner with built-in assertions, mocking and coverage.',
    tags: [Tag.JavaScript],
  },
  {
    name: 'React Testing Library',
    category: 'Testing',
    years: 6,
    summary:
      'Tests React components the way people use them, by finding elements through roles, labels and text.',
    tags: [Tag.JavaScript, Tag.ReactJS],
  },
  {
    name: 'RSpec',
    category: 'Testing',
    years: 3,
    summary:
      'A behaviour-driven testing framework for Ruby with readable, spec-style tests.',
    tags: [Tag.Ruby, Tag.Rails],
  },
  {
    name: 'Cypress',
    category: 'Testing',
    years: 3,
    summary:
      'An end-to-end testing tool that drives a real browser through user flows.',
  },
  {
    name: 'Mock Service Worker',
    category: 'Testing',
    years: 1,
    summary:
      'Mocks network requests at the network level, so tests and local development run without a real backend.',
  },
  {
    name: 'Docker',
    category: 'Cloud & DevOps',
    years: 3,
    summary:
      'Packages apps and their dependencies into containers that run the same way on every machine.',
  },
  {
    name: 'CircleCI',
    category: 'Cloud & DevOps',
    years: 2,
    summary:
      'A continuous integration service that builds, tests and deploys code on every push.',
  },
  {
    name: 'Git',
    category: 'Cloud & DevOps',
    years: 11,
    summary:
      'Distributed version control for tracking changes, branching and collaborating on code.',
    tags: [Tag.Git],
  },
  {
    name: 'Okta',
    category: 'Cloud & DevOps',
    years: 1,
    summary:
      'An identity platform for sign-in, single sign-on and access management.',
  },
  {
    name: 'Datadog',
    category: 'Observability',
    years: 1,
    summary:
      'A monitoring platform that brings metrics, logs and traces together in one place.',
  },
  {
    name: 'New Relic',
    category: 'Observability',
    years: 2,
    summary:
      'An application performance monitoring tool for tracing requests and spotting slow code.',
  },
  {
    name: 'Grafana',
    category: 'Observability',
    years: 2,
    summary:
      'Dashboards and alerts built on top of metrics and logs from many data sources.',
  },
  {
    name: 'Claude Code',
    category: 'AI Tooling',
    years: 1,
    summary:
      'An agentic coding tool that reads a codebase, edits files and runs commands from the terminal.',
  },
]
