const env = require("./jest.env")(); // Must go first to apply ENV defaults

const fastifyTestUtils = require("@forrestjs/service-fastify/test/globals");

const fastifyGlobals = fastifyTestUtils();

module.exports = () => ({
  ...fastifyGlobals,
  env
});
