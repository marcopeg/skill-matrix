/**
 * Extends the GraphQL service with a custom query
 * to monitor the uptime:
 */

const { gql } = require("apollo-server-fastify");

const pingActionHandler = () => {
  const typeDefs = gql`
    type Ping {
      message: String
      emotion: String
      timestamp: Float
    }

    extend type Query {
      ping: Ping!
    }
  `;

  const resolvers = {
    Query: {
      ping: () => ({
        message: "+ok",
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
