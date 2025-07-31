# TS Project Starter Overview

Starting a new project with TypeScript.

General principles:
- Use strict type checking (enable `strict` in tsconfig.json)
- Use ESM as standard over CommonJS (all runtimes support it now)
- Use a bundler for production builds (there are still libraries that don't support ESM)
- Use a linter and formatter (ESLint + Prettier)
- Use modern tooling with excellent ESM support

## Recommended Tools

### Build Tool/Bundler
- **Vite**: Excellent for frontend projects (React, Vue, Svelte) due to its lightning-fast dev server and optimized builds with Rollup.
- **esbuild**: Extremely fast JavaScript/TypeScript bundler. Great for library development or backend projects where pure bundling speed is paramount.
- **tsup**: A higher-level wrapper around esbuild, specifically designed for TypeScript library bundling.
- **Rollup**: Strong choice for building libraries, especially if you need fine-grained control over output formats.

### Linter & Formatter
- **ESLint**: The dominant linter for JavaScript/TypeScript. Configure it with `@typescript-eslint/parser` and appropriate plugins.
- **Prettier**: An opinionated code formatter.

**Important note:** Understand [difference between linter and formatter](https://prettier.io/docs/comparison). Linters are for catching errors and enforcing coding rules, while formatters are for enforcing consistent formatting. Don't mix them up and [configure properly](https://prettier.io/docs/integrating-with-linters).

### Testing Framework
- **Vitest**: A modern, fast test runner powered by Vite. Excellent for unit and integration tests, especially in frontend projects. It's often seen as a faster, more integrated alternative to Jest.
- **Jest**: A mature and feature-rich testing framework, widely adopted. Still a very strong choice.
- **React Testing Library / Vue Testing Library**: For component testing in respective frameworks.
- **Playwright**: For end-to-end (e2e) testing.

## General purpose project template

Each project nature is different and will require tailored setup sooner or later. Tools and libraries are evolving fast and the easiest to setup the project is either:
- use an AI to generate a step by step setup guide based on your requirements and recommended tools
- use a boilerplate project template

Some example boilerplate projects:
- [janik6n's TS starter](https://github.com/janik6n/typescript-starter), [blog](https://janik6n.net/posts/my-batteries-included-typescript-starter-for-2025/)
- [React starter kit](https://github.com/kriasoft/react-starter-kit)
- [T3 create app](https://github.com/t3-oss/create-t3-app)

Use github search to find more (TS, pushed since 2025, >500 stars):
- [topic:boilerplate](https://github.com/search?q=topic%3Aboilerplate+topic%3Atypescript+pushed%3A%3E2025-01-01++stars%3A%3E500+language%3ATypeScript&type=repositories)
- [topic:template](https://github.com/search?q=topic%3Atemplate+topic%3Atypescript+pushed%3A%3E2025-01-01++stars%3A%3E500+language%3ATypeScript&type=repositories)


## Framework specific project templates

Every framework provides a project template. It's a good starting point and you can customize it to your needs.
- [Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Vite](https://vitejs.dev/guide)
- [Express](https://expressjs.com/en/starter/generator.html)
