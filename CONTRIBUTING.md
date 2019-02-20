# Contributing

> Thank you for contributing. Contributions are always welcome, no matter how large or small.

## Table of Contents

- [Guidelines](#guidelines)
- [Pull Requests](#pull-requests)
- [Clone the Repository](#clone-repo)
- [Install Dependencies](#install-dependencies)
- [File Structure](#file-structure)

---

## Guidelines <a id="guidelines"></a>

As a contributor, here are the guidelines you should follow:

- [Code of conduct](https://github.com/seantrane/engineering/blob/master/CODE_OF_CONDUCT.md)
- [How can I contribute?](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#how-can-i-contribute)
- [Using the issue tracker](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#using-the-issue-tracker)
- [Submitting a Pull Request](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#submitting-a-pull-request)
- [Coding rules](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#coding-rules)
- [Working with code](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#working-with-code)

We also recommend to read [How to Contribute to Open Source](https://opensource.guide/how-to-contribute).

---

## Pull Requests <a id="pull-requests"></a>

Thank you for contributing.

- Create your branch from `master`.
- Ensure your [git commit messages follow the required format](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#git-commit-messages).
- Ensure your scripts are well-formed, well-documented and object-oriented.
- Ensure your scripts are stateless and can be reused by all.
- Update your branch, and resolve any conflicts, before making pull request.
- Fill in [the required template](https://github.com/seantrane/engineering/blob/master/PULL_REQUEST_TEMPLATE.md).
- Do not include issue numbers in the PR title.
- Include screenshots and animated GIFs in your pull request whenever possible.
- Follow the [style guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md) [applicable to the language](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#languages) or task.
- Include thoughtfully-worded, well-structured tests/specs. See the [Tests/Specs Style Guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#tests).
- Document new code based on the [Documentation Style Guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#documentation).
- End all files with a newline.

---

## Clone the Repository <a id="clone-repo"></a>

```bash
git clone git@github.com:seantrane/mean-stacker.git mean-stacker && cd mean-stacker
```

## Install Dependencies <a id="install-dependencies"></a>

```bash
# Using NPM:
npm install
# Using Yarn:
yarn install
```

---

## File Structure <a id="file-structure"></a>

```text
mean-stacker/
├─ e2e/                                      * end-to-end test directory
|   ├─ app.e2e-spec.ts                       * end-to-end tests
|   ├─ app.po.ts                             * helper functions for the configuration files
│   └─ tsconfig.e2e.json                     * E2E TypeScript configuration
│
├─ src/                                      * the source files that will be compiled to javascript
|   ├─ client/                               * Angular application source files
|   │   ├─ app/                              * WebApp directory
|   │   │   ├─ core/                         * Core Modules, Components
|   │   │   │   ├─ navbar/                   * NavbarComponent
|   │   │   │   ├─ sidebar-nav/              * SidebarNavComponent
|   │   │   │   ├─ core.module.ts            * CoreModule
|   │   │   │   ├─ module-import-guard.ts    * "Import Core modules in the AppModule only."
|   │   │   │   └─ README.md                 * CoreModule documentation
|   │   │   │
|   │   │   ├─ shared/                       * Shared Modules, Directives, Pipes
|   │   │   │   ├─ contracts/                * Shared Contracts/Interfaces
|   │   │   │   ├─ app-cookie.module.ts      * AppCookieModule
|   │   │   │   ├─ app-forms.module.ts       * AppFormsModule
|   │   │   │   ├─ app-http-client.module.ts * AppHttpClientModule
|   │   │   │   ├─ app-http.module.ts        * AppHttpModule
|   │   │   │   ├─ app-meta.module.ts        * AppMetaModule
|   │   │   │   ├─ app-routing.module.ts     * AppRoutingModule
|   │   │   │   ├─ highlight.directive.ts    * HighlightDirective
|   │   │   │   ├─ README.md                 * SharedModule documentation
|   │   │   │   ├─ shared.module.ts          * SharedModule
|   │   │   │   └─ website-title.pipe.ts     * WebsiteTitlePipe
|   │   │   │
|   │   │   ├─ users/                        * Users Module, Service, Components
|   │   │   │   ├─ README.md                 * UsersModule documentation
|   │   │   │   ├─ user-details/             * UserDetailsComponent
|   │   │   │   ├─ user-list/                * UserListComponent
|   │   │   │   ├─ user.imports.ts           * Entity/Interface imports for Users
|   │   │   │   ├─ user.service.spec.ts      * UserService Tests
|   │   │   │   ├─ user.service.ts           * UserService
|   │   │   │   └─ users.module.ts           * UsersModule
|   │   │   │
|   │   │   ├─ app.component.html            * AppComponent Template (HTML)
|   │   │   ├─ app.component.scss            * AppComponent Styles (Sass)
|   │   │   ├─ app.component.spec.ts         * AppComponent Tests
|   │   │   ├─ app.component.ts              * AppComponent
|   │   │   ├─ app.module.ts                 * AppModule is the main entry point into Angular's bootstrapping process
|   │   │   └─ app.routes.ts                 * application routes
|   │   │
|   │   ├─ assets/                           * static assets are served here
|   │   │   ├─ css/                          * style assets
|   │   │   ├─ icon/                         * the list of icons from www.favicon-generator.org
|   │   │   ├─ img/                          * app images (i.e.; logos)
|   │   │   ├─ humans.txt                    * for humans to know who the developers are
|   │   │   ├─ manifest.json                 * Android/Chrome icons manifest file
|   │   │   └─ robots.txt                    * for search engines to crawl your website
|   │   │
|   │   ├─ environments/                     * Environment configuration
|   │   │   ├─ environment.prod.ts           * PRODuction environment configuration
|   │   │   └─ environment.ts                * default environment configuration
|   │   │
|   |   ├─ _mixins.scss                      * App Style mixins
|   |   ├─ _variables.scss                   * App Style variables
|   |   ├─ index.html                        * the index page
|   |   ├─ main.ts                           * the entry file for the browser environment
|   |   ├─ polyfills.ts                      * the polyfills file for the browser environment
|   |   ├─ styles.scss                       * App Styles
|   |   ├─ test.ts                           * loads recursively all the .spec and framework files
|   |   ├─ tsconfig.app.json                 * App TypeScript configuration
|   |   ├─ tsconfig.spec.json                * Specs/Tests TypeScript configuration
|   |   └─ typings.d.ts                      * custom type definitions
│   |
|   ├─ server/                               * Express application source files
|   │   ├─ api/                              * API directory
|   │   │   ├─ users/                        * API: `Users`
|   │   │   │   ├─ index.ts                  * API: `Users` Router and exports-module
|   │   │   │   ├─ README.md                 * API: `Users` documentation
|   │   │   │   ├─ user.document.ts          * API: `Users` Mongoose/MongoDB Document interfaces
|   │   │   │   ├─ user.entity.ts            * API: `Users` Entity classes
|   │   │   │   ├─ user.interface.ts         * API: `Users` Interface classes
|   │   │   │   ├─ user.schema.ts            * API: `Users` Mongoose/MongoDB Schema
|   │   │   │   ├─ user.service.ts           * API: `Users` Service provider
|   │   │   │   └─ user.spec.ts              * API: `Users` Tests
|   │   │   │
|   │   │   ├─ api.spec.ts                   * API core tests
|   │   │   ├─ contracts.ts                  * Contracts/interfaces for the API
|   │   │   ├─ utils.ts                      * Common API utilities
|   │   │   └─ index.ts                      * API Router and exports-module
|   │   │
|   |   └─ index.ts                          * the Express application
│   |
|   └─ utils/                                * Utility source files
|       ├─ jsonapi-response.ts                   * API Response object
|       ├─ db-helper.ts                      * DB Helper utility
|       ├─ entity.spec.ts                    * BaseEntity/BaseCollection test cases
|       ├─ entity.ts                         * BaseEntity/BaseCollection classes
|       ├─ error.ts                          * Error Handler utility
|       ├─ index.ts                          * Utility exports-module
|       └─ metadata.ts                       * MetaData object
│
├─ .dockerignore                             * ignore files to improve docker daemon performance
├─ .editorconfig                             * keep developers/IDE's in sync
├─ .env.example                              * environment configuration variables template
├─ .gitignore                                * ignore files for git
├─ .markdownlint.yaml                        * Markdown lint rules and config
├─ .npmignore                                * ignore files for npm, when publishing packages
├─ .sass-lint.yml                            * Sass lint rules and config
├─ .travis.yml                               * Travis CI/CD configuration
├─ angular.json                              * Angular CLI configuration
├─ CONTRIBUTING.md                           * contribution guidelines
├─ CHANGLOG.md                               * changelog autogenerated by `@semantic-release/changelog`
├─ docker-compose.yml                        * Docker-compose configuration
├─ Dockerfile.local                          * Docker config for local development (maps project root as volume)
├─ Dockerfile.prod                           * Docker config for production (multi-stage for deployment)
├─ ecosystem.config.js                       * PM2 configuration
├─ karma.conf.js                             * Karma configuration to run unit tests
├─ newrelic.js                               * New Relic configuration file
├─ package-lock.json                         * npm dependency lock file
├─ package.json                              * npm package/dependency configuration
├─ protractor.conf.js                        * Protractor configuration to run end-to-end tests
├─ ROADMAP.md                                * package roadmap
├─ run                                       * Shell-scripting used for install, build, CI/CD, etc.
├─ sonar-project.properties                  * SonarQube configuration
├─ start                                     * Shell-script to start application
├─ tsconfig.json                             * Angular TypeScript configuration
├─ tsconfig.server.json                      * Express TypeScript configuration
├─ tslint.json                               * TypeScript Linter configuration
├─ typedoc.json                              * TypeScript documentation generator
└─ webpack.server.config.js                  * Webpack server config file
```

---

#### Happy coding!
