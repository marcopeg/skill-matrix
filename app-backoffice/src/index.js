// Import Libraries:
import forrest from "@forrestjs/core";

// Import Services:
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";
import { hasuraClient } from "./services/hasura-client";

// Import Features:
import { auth } from "./features/auth";
import { app } from "./features/app";

forrest
  .run({
    settings: {
      hasuraClient: {
        endpoint: `http://localhost:8080/v1/graphql`
      }
    },
    services: [reactRoot, reactRouter, hasuraClient],
    features: [auth, app]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));
