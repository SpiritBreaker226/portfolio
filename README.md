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

| Command             | What it does                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| `yarn dev`          | Start the Vite dev server                                                                                     |
| `yarn build`        | Copy `.env.example` to `.env`, run the tests, type-check the app and the Cypress specs, then build to `dist/` |
| `yarn preview`      | Serve the `dist/` build locally                                                                               |
| `yarn test`         | Run the Vitest suites in watch mode                                                                           |
| `yarn test:run`     | Run the Vitest suites once                                                                                    |
| `yarn test:e2e`     | Start `yarn dev` and run the Cypress specs headless in Chrome                                                 |
| `yarn cypress:open` | Open Cypress to run specs one by one against a running `yarn dev`                                             |

### Integration tests

Cypress specs live in `cypress/e2e` and run in Chrome against the dev server, so they cover what the Vitest suites can't: whole pages, navigation between them, and React's development-only checks. `yarn build` doesn't run them; run `yarn test:e2e` before pushing.

`cypress:open` needs `yarn dev` running in another terminal. Failing runs save screenshots to `cypress/screenshots`, which git ignores.

### Screenshot tests

`cypress/visual` compares full-page screenshots of every page, in light and dark at 375, 768 and 1280 pixels wide, against the baselines in `cypress/snapshots/base`. They must match pixel for pixel, and fonts and anti-aliasing differ between machines, so the screenshots run only on GitHub Actions, in a pinned build of Chrome for Testing. Saved posts in `cypress/fixtures/posts.json` stand in for the live dev.to feed.

After a deliberate design change, refresh the baselines:

1. Push the change, then run the **Visual baselines** workflow on `main` from the Actions tab.
2. Download its `visual-baselines` artifact and unzip it into `cypress/snapshots/base`, replacing the old images.
3. Review the new images, then commit them.

The **Weekly update** workflow runs the build, the Cypress specs and the screenshot comparison on the `deps/weekly` branch. It moves `main` forward only when all of them pass, and reports any failure in a "Weekly update failed" issue.
