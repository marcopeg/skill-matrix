# skill-matrix

Skill Matrix project based on Hasura &amp; ForrestJS

# How to Run the Project

> The following commands have been tested on Mac and Linux.

Clone the repo:

```bash
git clone git@github.com:forrestjs/skill-matrix.git && cd skill-matrix
```

Use the Make interface:

```bash
make start
```

Or run it via Docker Compose:

```bash
docker-compose up hasura-cli
```

👉 Else you can enjoy a **cloud-based automated Workspace** and run it on GitPod.io:

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/forrestjs/skill-matrix)

---

# Services

This project rotates around Postgres and [Hasura Engine][hasura].

Hasura provides a CRUD interface towards Postgres (and other dbms) but lacks the ability to perform business logic.

Although a lot of business logic can be carried out on the DB by running _Server Side SQL functions_, you may also need to run stuff in languages such as NodeJS or Java.

👉 The classic Backend App 👈

In this project, I have created 3 NodeJS services that extends Hasura's capabilities using the 3 possible methods:

- [Hasura Event Triggers](https://hasura.io/docs/latest/graphql/core/event-triggers/index/)
- [Hasura Actions](https://hasura.io/docs/latest/graphql/core/actions/index/)
- [Remote Schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/)

## Hasura Events

It's a NodeJS service based on [ForrestJS][forrestjs] and [Fastify][fastify] that offers _REST APIs_ for the implementation of [Hasura Event Triggers](https://hasura.io/docs/latest/graphql/core/event-triggers/index/).

Please extend this App with all the Event Triggers that you may need to fulfill your **after-write business logic**.

---

## Hasura Actions

It's a NodeJS service based on [ForrestJS][forrestjs] and [Fastify][fastify] that offers _REST APIs_ for the implementation of [Hasura Actions](https://hasura.io/docs/latest/graphql/core/actions/index/).

Please extend this App with all the Actions that you may need to implement custom business logic that should be proxied through Hasura's API.

---

## GraphQL API

It's a NodeJS service based on [ForrestJS][forrestjs] and [Apollo Server][apollo-server] that offers a custom _GraphQL API_. Hasura uses this API via [Remote Schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

Please extend this App if you want to play with a fully custom GraphQL Server. But honestly, I believe that Actions are a better implementation of the same goal.

---

[forrestjs]: https://forrestjs.github.io/
[fastify]: https://www.fastify.io/
[apollo-server]: https://www.apollographql.com/docs/apollo-server/getting-started/
[hasura]: https://hasura.io/
