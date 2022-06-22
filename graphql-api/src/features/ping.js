/**
 * Extends the GraphQL service with a custom query
 * to monitor the uptime:
 */

const { gql } = require("apollo-server-fastify");

const pingActionHandler = () => {
  const typeDefs = gql`
    type PingRemote {
      message: String
      emotion: String
      timestamp: Float
    }

    extend type Query {
      ping_remote: PingRemote!
    }
  `;

  const resolvers = {
    Query: {
      ping_remote: () => ({
        message: "ok",
        emotion: "💩",
        timestamp: Date.now()
      })
    }
  };

  // registerSchema(typeDefs, resolvers);
  return { typeDefs, resolvers };
};

module.exports = {
  name: "ping",
  target: "$FASTIFY_GQL_EXTEND_SCHEMA",
  handler: pingActionHandler
};
