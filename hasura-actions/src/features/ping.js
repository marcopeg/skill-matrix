const routeHandler = (request, reply) => {
  request.log.info(JSON.stringify(request.body, null, 2));
  reply.send({
    message: "ok",
    timestamp: Date.now()
  });
};

module.exports = [
  {
    name: "ping",
    target: "$FASTIFY_ROUTE",
    handler: {
      method: "POST",
      url: "/act/ping",
      handler: routeHandler
    }
  }
];
