# skill-matrix

This repo hosts a fully automated development environment that can run on any computer, as well as in the Cloud thanks to [GitPod](https://gitpod.io) or [GitHub Codespaces](https://github.com/features/codespaces).

## Features

- Low-code backend offered by [Hasura Engine](https://hasura.io)
- Multi-database migrations & data-seeding via [Hasura CLI]()
- Multi-database SQL Unit Tests via [PG Tap]()
- NodeJS micro-services (fully Dockerized)
- Unit Tests and End-to-End tests by [Jest]()
- ReactJS frontend (fully Dockerized)

👉 **It's Just a Boilerplate** 👈

Clone it, then do with this project whatever your mind can think of!

# How to Run the Project

> The following commands have been tested on Mac and Linux.

Clone the repo:

```bash
git clone git@github.com:marcopeg/skill-matrix.git && cd skill-matrix
```

Use the Make interface:

```bash
make start
```

Or run it via Docker Compose:

```bash
docker-compose up
```

👉 Else you can enjoy a **Cloud-Based Automated Workspace** and run it on GitPod.io:

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/marcopeg/skill-matrix)

# Services

This project rotates around Postgres and [Hasura Engine][hasura].

Hasura provides a CRUD interface towards Postgres (and other dbms) but lacks the ability to perform business logic.

Although a lot of business logic can be carried out on the DB by running _Server Side SQL Functions_, you may also need to run stuff in languages such as NodeJS or Java.

👉 **The classic Backend** 👈

In this project, I have created 3 NodeJS services that extends Hasura's capabilities using its 3 possible methods:

- [Hasura Event Triggers](https://hasura.io/docs/latest/graphql/core/event-triggers/index/)
- [Hasura Actions](https://hasura.io/docs/latest/graphql/core/actions/index/)
- [Remote Schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/)

### Hasura Events

It's a NodeJS service based on [ForrestJS][forrestjs] and [Fastify][fastify] that offers _REST APIs_ for the implementation of [Hasura Event Triggers](https://hasura.io/docs/latest/graphql/core/event-triggers/index/).

Please extend this App with all the Event Triggers that you may need to fulfill your **after-write business logic**.

### Hasura Actions

It's a NodeJS service based on [ForrestJS][forrestjs] and [Fastify][fastify] that offers _REST APIs_ for the implementation of [Hasura Actions](https://hasura.io/docs/latest/graphql/core/actions/index/).

Please extend this App with all the Actions that you may need to implement custom business logic that should be proxied through Hasura's API.

### GraphQL API

It's a NodeJS service based on [ForrestJS][forrestjs] and [Apollo Server][apollo-server] that offers a custom _GraphQL API_. Hasura uses this API via [Remote Schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

Please extend this App if you want to play with a fully custom GraphQL Server. But honestly, I believe that Actions are a better implementation of the same goal.

# JWT Tokens Authentication

In this project we use the [Hasura JWT Authentication](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/) method and we implement 3 roles:

- backend
- backoffice
- survey

👉 Some default tokens are hard-coded as project's default Environmental Variables, and also in the frontend apps, as so to provide an easy and immediate development experience.

It's just a boilerplate.

### Backend Role

This JWT is provided to the Backend Services and allows them to query Hasura on behalf of any user.

🔥 A token like this is quite powerful and dangerous, the Backend Service should **generate short-living tokens** and rotate them as much as possibile in order to maximize security.

Shape of the token:

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["backend"],
    "x-hasura-default-role": "backend"
  }
}
```

### Backoffice Role

This JWT is used as login to the Backoffice App and make super-user changes to the system.

The variable `x-hasura-admin-id` should be used for logging any backoffice activity by any authenticated administrator.

🔥 A token like this is quite powerful and dangerous, any Backoffice sessions should be short-lived (5 minutes?) and traced to an Admin itentity.

👉 Also, Backoffice Apps should be restricted to explicit Actions or Remote Schemas where custom business logic is being used to make sure adequate application logging is performed.

Shape of the token:

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["backoffice"],
    "x-hasura-default-role": "backoffice",
    "x-hasura-admin-id": "xxx"
  }
}
```

### Survey Role

This JWT is released to a specific user in association with the invite to fill a specific survey for the Skill Matrix app.

This is the most specific of the JWTs that we are going to use in this app, and it should provide a very targeted write-only access to the database.

👉 The Authentication Authority that releases this token should take care of syncronizing the token's `nbf` and `exp` to the Survey's `open_since` and `open_until` timestamps.

Shape of the token:

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["form"],
    "x-hasura-default-role": "form",
    "x-hasura-survey-id": "xxx",
    "x-hasura-user-id": "xxx"
  }
}
```

# SQL Unit Tests

Inside `hasura-migrations` there is a `Makefile` that helps running _SQL Unit Tests_ written in [PGTap](https://pgtap.org/).

## Setup the Test Database

The unit tests target a dedicated database that ships as a Docker container. Also, the unit test runner container needs to build before it can execute the tests.

```bash
make test-sql-start
```

Once you are done testing, run:

```bash
make test-sql-stop
```

## Run the Tests

A test run will build an entire Hasura's migration project, and then run the relative tests.

Each project is identified by a name, which corresponds to the subfolder that groups migrations:

- hasura-migrations
  - migrations/{project-name}/123_migration-name/up.sql
  - tests/{project-name}/foobar.test.sql

```bash
make test-sql project=foo
```

👉 Omit the `project` param to execute the `default` project

## More Actions Available

Please take a look at `hasura-migrations/Makefile` for more scripts and SQL Unit Testing utilites.

If you need inspiration for SQL Unit Testing, take a look at [Amazing Postgres](https://github.com/marcopeg/amazing-postgresql) project.

[forrestjs]: https://forrestjs.github.io/
[fastify]: https://www.fastify.io/
[apollo-server]: https://www.apollographql.com/docs/apollo-server/getting-started/
[hasura]: https://hasura.io/
