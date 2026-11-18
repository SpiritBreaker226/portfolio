# Personal Portfolio Site

This is my portfolio with some of the projects that I have done over the years.

Here are the different sections of the site

- Projects
- Code samples
- About me
- Links to other social media I have accounts on

## Development

Requires Node 24 (the exact version is in `.nvmrc`, so `nvm use` picks it up) and Yarn 1.

```sh
yarn install
```

| Command           | What it does                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| `yarn dev`        | Start the Vite dev server                                                     |
| `yarn build`      | Copy `.env.example` to `.env`, run the tests and `tsc`, then build to `dist/` |
| `yarn preview`    | Serve the `dist/` build locally                                               |
| `yarn test`       | Run the Jest test suites once                                                 |
| `yarn test:watch` | Run the Jest test suites in watch mode                                        |
