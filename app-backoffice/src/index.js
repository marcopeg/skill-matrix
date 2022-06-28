// Import Libraries:
import forrest from "@forrestjs/core";

// Import Services:
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";
import reactMUI from "@forrestjs/react-mui";
import { hasuraClient } from "./services/hasura-client";

// Import Features:
import { layout } from "./features/layout";
import { auth } from "./features/auth";
import { app } from "./features/app";

forrest
  .run({
    settings: {
      hasuraClient: {
        endpoint:
          process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT ||
          `http://localhost:8080/v1/graphql`
      }
    },
    services: [reactRoot, reactMUI, reactRouter, hasuraClient],
    features: [layout, auth, app]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));
