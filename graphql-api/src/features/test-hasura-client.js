const testHasuraClient = () => ({
  target: "$FASTIFY_ROUTE",
  handler: {
    method: "POST",
    url: "/test-hasura-client",
    handler: async (request, reply) => {
      const res = await request.hasura.query(
        "query { ping_action { timestamp }}"
      );

      reply.send(res);
    }
  }
});

module.exports = testHasuraClient;
