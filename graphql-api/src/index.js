const envalid = require("envalid");
const forrest = require("@forrestjs/core");

// Library Services
const serviceLogger = require("@forrestjs/service-logger");
const serviceFastify = require("@forrestjs/service-fastify");
const serviceHealthz = require("@forrestjs/service-fastify-healthz");
const serviceGql = require("@forrestjs/service-fastify-gql");

// Local Feature
const ping = require("./features/ping");

// Validate the environment
const env = envalid.cleanEnv(process.env, {
  LOG_LEVEL: envalid.str({
    desc: "Set the service log level",
    choices: ["error", "info", "verbose", "debug"],
    default: "info"
  }),
  HASURA_GRAPHQL_ENDPOINT: envalid.url({
    desc: "Target Hasura API endpoint"
  }),
  HASURA_GRAPHQL_AUTH_TOKEN: envalid.str({
    desc: "Hasura authentication token"
  })
});

forrest.run({
  settings: {
    logger: {
      level: env.LOG_LEVEL
    },
    hasura: {
      endpoint: env.HASURA_GRAPHQL_ENDPOINT,
      token: env.HASURA_GRAPHQL_AUTH_TOKEN
    }
  },
  services: [serviceLogger, serviceFastify, serviceHealthz, serviceGql],
  features: [ping]
});
