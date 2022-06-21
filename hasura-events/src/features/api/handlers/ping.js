module.exports = (request, reply) => {
  request.log.info(JSON.stringify(request.body, null, 2));
  reply.send(`ok - ${Date.now()}`);
};
