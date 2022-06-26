import "./index.css";

// Import Libraries:
import forrest from "@forrestjs/core";

// Import Services:
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";
import hasuraClient from "./services/hasura-client";

// Import Features:
import App from "./App";

forrest
  .run({
    settings: {
      hasuraClient: {
        endpoint: `http://localhost:8080/v1/graphql`
      }
    },
    services: [reactRoot, reactRouter, hasuraClient],
    features: [
      {
        target: "$REACT_ROOT_COMPONENT",
        handler: { component: App }
      }
    ]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));
