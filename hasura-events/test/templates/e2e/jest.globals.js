const env = require("./jest.env")(); // Must go first to apply ENV defaults

const fastifyTestUtils = require("@forrestjs/service-fastify/test/globals");
const pgTestUtils = require("@forrestjs/service-pg/test/globals");

const fastifyGlobals = fastifyTestUtils();
const pgGlobals = pgTestUtils(fastifyGlobals);

module.exports = () => ({
  ...fastifyGlobals,
  ...pgGlobals,
  env
});
