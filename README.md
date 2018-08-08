# MEAN Stacker

> MEAN Stacker is a MEAN stack starter kit.

[![Build Status](https://travis-ci.com/seantrane/mean-stacker.svg?branch=master)](https://travis-ci.com/seantrane/mean-stacker) [![dependencies Status](https://david-dm.org/seantrane/mean-stacker/status.svg)](https://david-dm.org/seantrane/mean-stacker) [![devDependencies Status](https://david-dm.org/seantrane/mean-stacker/dev-status.svg)](https://david-dm.org/seantrane/mean-stacker?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/seantrane/mean-stacker.svg)](https://greenkeeper.io/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Table of Contents

- [About the Service](#about)
  - [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Contributing](CONTRIBUTING.md)
- [License](#license)

---

## About the Service <a id="about"></a>

MEAN Stacker is a MEAN stack starter kit.

### Features <a id="features"></a>

- [Angular Style Guide](https://angular.io/guide/styleguide) compliant
- Behavior-driven unit testing with [Jasmine](https://github.com/jasmine/jasmine) and [Karma](https://karma-runner.github.io/)
- Bootstrap 3 support using [`bootstrap-sass`](https://github.com/twbs/bootstrap-sass) and [`ngx-bootstrap`](https://valor-software.com/ngx-bootstrap/#/getting-started)
- Code Coverage with [Istanbul](https://github.com/gotwarlost/istanbul) and [`nyc`](https://github.com/istanbuljs/nyc)
- Dockerized:
  - Docker for local development with hot-reloading support
  - [Multistage Dockerfile](https://docs.docker.com/develop/develop-images/multistage-build/) to separate _build_ from _production_ images
  - [Docker Compose](https://docs.docker.com/compose/) support enabled
- [E2E](http://www.protractortest.org/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-) testing using [Protractor](http://www.protractortest.org)
- Express.js security with HTTP headers using [Helmet](https://helmetjs.github.io/) middleware
- i18n/l10n support using [`ngx-translate`](https://github.com/ngx-translate/core)
- Linters for [TypeScript](http://www.typescriptlang.org/) ([TsLint](http://palantir.github.io/tslint/)), Angular ([Codelyzer](https://github.com/mgechev/codelyzer)) and Sass (`sass-lint`)
- [Node Express](https://expressjs.com/) server used to pass requests to [Angular](https://angular.io) client
- Rate-limiting middleware with [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- Server Side Rendering with [Angular Universal](https://angular.io/guide/universal)

---

## Install <a id="install"></a>

Your system will need access to;

- [`node`](https://nodejs.org/en/) v8+
- [`npm`](https://www.npmjs.com/) v3+

```bash
./run -i
# or
./run --install
```

### Build Docker

```bash
# If you just want to (re)build and start
# a docker container locally, just use:
npm run docker:start

# build new docker image (pure docker build, app must be pre-built):
npm run docker:build:prod
npm run docker:build
# commit changes to new docker image:
npm run docker:commit
# kill docker container:
npm run docker:kill
# remove docker container and image:
npm run docker:remove
# remove docker container:
npm run docker:rm
# remove docker image:
npm run docker:rmi
# run new docker container:
npm run docker:run
# build new docker image and run new container:
npm run docker:start:prod
npm run docker:start
# run docker test image:
npm run docker:test
```

## RUN CLI

There is a RUN CLI for performing various application operations.
It is accessible via a script in the root directory; `sh ./run`
This script is able to control most actions, from
setting ENV variables to building and deploying the application.

### Quick-start

```bash
# SPECIAL NOTE:
# `ENV` arguments can be provided as below on all commands.
./run --env=[ DEV | UAT | PROD | ... ]
# Install, Build, Test, E2E:
./run -ci
# Reporting:
./run --report
# Publish:
./run --publish
# Upload, Deploy:
./run --upload --deploy
./run -u -d
# SEMVER increment (will also run git-commit/tag/push):
./run --semver=[patch|minor|major]

# Debug the run script
./run --debug --ci -u -d --semver=patch
# After Git-Pull:
./run --clean --install
# Before Git-Push/Pull-Request:
./run --clean --ci
# After Pull-Request-Merge (increment 'develop' branch):
./run --semver=patch
# For CI/CD Pipeline:
./run --clean --ci --report --e2e --publish
# After Deploy-to-Production (increment 'develop' branch):
./run --semver=minor
```

### RUN Command Arguments

```bash
# Run the shell script, with options
./run \
  #
  # Turn on debug mode
  #
  --debug
  #
  # Set the ENV [local, dev, uat, prod]
  #
  --env=*
  #
  # Clean existing application build/test files
  #
  --clean
  #
  # Continuous Integration (CI)
  # ...Install, Build, Test, E2E
  #
  --ci
  #
  # Install the application
  #
  -i, --install
  #
  # Build/compile application
  #
  -b, --build
  #
  # Compile documentation
  #
  --docs
  #
  # Run lint/unit/integration/mock tests
  #
  -t, --test
  #
  # Run Reporting
  #
  # Codecov.io requires:
  # - 'CODECOV_TOKEN' env var
  #
  # SONAR scanner/reporting requires:
  # - 'SONAR_SCANNER_PATH' env var
  # - 'SONAR_SERVER_URL' env var
  # - 'sonar-project.properties' file
  #
  -r, --report
  #
  # Start the application
  #
  -s, --start
  #
  # Run End-to-End tests
  # - running e2e will automatically start (-s) the app
  #
  --e2e
  #
  # Increment the application version using SEMVER
  # Value is appended to `semver -i` command
  # See: https://github.com/npm/node-semver
  #
  --semver=*
  #
  # Publish the application (with NPM, etc.)
  #
  -p, --publish
  #
  # Push/upload the application (to AWS ECR/S3, respectively)
  #
  -u, --upload
  #
  # Deploy the application (with AWS Elastic Beanstalk)
  #
  -d, --deploy
```

## Usage <a id="usage"></a>

> :point_up: _more instructions coming soon._

---

## License <a id="license"></a>

MIT License

Copyright (c) 2018 Sean Trane Sciarrone

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
