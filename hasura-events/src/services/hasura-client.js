const axios = require("axios");

class HasuraError extends Error {
  constructor(message, query, variables, endpoint, token) {
    super(message);
    this.name = "HasuraError";
    this.message = message;
    this.query = query;
    this.variables = variables;
    this.endpoint = endpoint;
    this.token = token;
  }
}

class HasuraRequestError extends HasuraError {
  constructor(message, query, variables, endpoint, token, error) {
    super(message, query, variables, endpoint, token);
    this.name = "HasuraRequestError";
    this.originalError = error;
  }
}

class HasuraResponseError extends HasuraError {
  constructor(message, query, variables, endpoint, token, response) {
    super(message, query, variables, endpoint, token);
    this.name = "HasuraResponseError";
    this.response = response;
  }
}

class HasuraClient {
  constructor(endpoint, token) {
    this.endpoint = endpoint;
    this.token = token;
  }

  async query(query, variables = {}) {
    try {
      const res = await axios.request({
        url: this.endpoint,
        method: "post",
        data: {
          query,
          variables
        },
        headers: {
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {})
        }
      });

      if (res.data.data) {
        return res.data.data;
      }

      if (res.data.errors) {
        throw new HasuraResponseError(
          res.data.errors[0].message,
          query,
          variables,
          this.endpoint,
          this.token,
          res
        );
      }

      throw new HasuraResponseError(
        "Unknown GraphQL response",
        query,
        variables,
        this.endpoint,
        this.token,
        res
      );
    } catch (err) {
      if (err instanceof HasuraError) {
        throw err;
      }

      throw new HasuraRequestError(
        err.message,
        query,
        variables,
        this.endpoint,
        this.token,
        err
      );
    }
  }
}

const hasuraClient = () => {
  return [
    {
      target: "$INIT_SERVICE",
      trace: __filename,
      priority: 1, // Must run before Fastify service
      handler: ({ getConfig, setContext }) => {
        const endpoint = getConfig("hasura.endpoint");
        const token = getConfig("hasura.token");
        const client = new HasuraClient(endpoint, token);
        setContext("hasura.client", client);
        setContext("hasura.query", client.query.bind(client));
      }
    },
    {
      target: "$FASTIFY_PLUGIN?",
      trace: __filename,
      handler: ({ decorateRequest }, { getContext }) => {
        const client = getContext("hasura.client");
        decorateRequest("hasura", client);
      }
    }
  ];
};

module.exports = hasuraClient;
