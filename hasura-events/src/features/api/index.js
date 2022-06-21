const ping = require("./handlers/ping");

const serviceRegistryApi = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/evt/ping",
    handler: ping
  });
};

module.exports = [
  {
    name: "api",
    target: "$FASTIFY_PLUGIN",
    handler: ({ registerPlugin }) => registerPlugin(serviceRegistryApi)
  }
];
