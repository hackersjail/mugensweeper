<h2 align="center"><img src="static/logo.png" alt="MugenSweeper" width="427"></h2>

<p align="center">
  <a href="https://app.netlify.com/sites/mugensweeper/deploys"><img src="https://api.netlify.com/api/v1/badges/7dfe5b91-df5e-49e8-9948-6db6e228d6f4/deploy-status" alt="Netlify Status"></a>
  <a href="https://circleci.com/gh/hackersjail/mugensweeper"><img src="https://badgen.net/circleci/github/hackersjail/mugensweeper/master?icon=circleci&label=build" alt="Build Status"></a>
  <a href="https://codecov.io/gh/hackersjail/mugensweeper"><img src="https://badgen.net/codecov/c/github/hackersjail/mugensweeper?icon=codecov&label=coverage" alt="Coverage Status"></a>
  <a href="https://nodejs.org/dist/latest-v10.x/docs/api/"><img src="https://badgen.net/badge/node/>%3D10.13.0/green" alt="Node.js Version"></a>
  <a href="https://github.com/hackersjail/mugensweeper/blob/master/LICENSE"><img src="https://badgen.net/badge/license/MIT/blue" alt="License"></a>
  <!-- <a href="#"><img src="https://badgen.net/badge/chat/join%20us/7289DA?icon=discord" alt="Chat"></a> -->
</p>

<p align="center">
  <a href="https://prettier.io/"><img src="https://badgen.net/badge/code%20style/Prettier/FF69B4" alt="Code style Prettier"></a>
  <a href="https://jestjs.io/"><img src="https://jestjs.io/img/jest-badge.svg" alt="Tested with Jest"></a>
  <a href="https://circleci.com/"><img src="https://badgen.net/badge//CircleCI/04AA51?icon=circleci" alt="CircleCI"></a>
  <a href="https://codecov.io/"><img src="https://badgen.net/badge//Codecov/E03997?icon=codecov" alt="Codecov"></a>
  <!-- <a href="https://discordapp.com/"><img src="https://badgen.net/badge//Discord/7289DA?icon=discord" alt="Discord"></a> -->
</p>

### Play MugenSweeper

<https://mugensweeper.netlify.com>

### Development

Node.js version 10.13.0 or higher is required.

#### Installation

Install dependencies.

```bash
$ npm install # Or yarn
```

#### Usage

Develop MugenSweeper.

```bash
# all
$ npm run dev # Or yarn dev

# API server only
$ npm run dev:api # Or yarn dev:api

# Client only
$ npm run dev:client # Or yarn dev:client
```

Testing scripts.

```bash
# Manual
$ npm test # Or yarn test

# Automatic
$ npm run test:watch # Or yarn test:watch

# Report test coverage
$ npm run test:coverage # Or yarn test:coverage
```

### Database

MugenSweeper depends on [MongoDB](https://docs.mongodb.com/).  
Please prepare MongoDB for development.

- Download  
  [MongoDB Download Center](https://www.mongodb.com/download-center/community)
- Cloud  
  [MongoDB Cloud Database Solutions](https://www.mongodb.com/cloud)
- Docker Compose

  ```bash
  # Start with MongoDB container only
  $ docker-compose up --detach mongo
  ```

### Environment Variables

MugenSweeper is using [dotenv](https://github.com/motdotla/dotenv#readme).  
To set environment variables, create an `.env` file.

#### MongoDB

Default: `mongodb://localhost:27017/mugensweeper`

```bash
# Example (Using MongoDB Atlas)
MONGO_URI=mongodb://<username>:<password>@cluster0-shard-00-00-iuxvg.mongodb.net:27017...
```

### Docker Compose

Build a development environment using Docker Compose.

```
# Starts the containers in the background and leaves them running.
$ docker-compose up --detach

# Get an interactive prompt.
$ docker-compose exec dev sh

# Develop MugenSweeper.
/usr/src/app # yarn dev
```

#### For Windows

Set Docker Machine's IP to `.env` file with `HOST` variable.

```bat
rem Get the IP address of a machine command
> docker-machine ip
```

```bash
# Example `.env` file
HOST=192.168.99.100
```

Windows uses polling for hot reloading.

```
# Develop MugenSweeper.
/usr/src/app # yarn docker:dev

# Testing scripts.
/usr/src/app # yarn docker:test
```
