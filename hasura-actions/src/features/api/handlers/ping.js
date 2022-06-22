module.exports = (request, reply) => {
  request.log.info(JSON.stringify(request.body, null, 2));
  reply.send({
    message: "ok",
    timestamp: Date.now()
  });
};
