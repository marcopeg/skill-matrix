import "./index.css";

// Import Libraries:
import forrest from "@forrestjs/core";

// Import Services:
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";

// Import Features:
import App from "./App";

forrest
  .run({
    services: [reactRoot, reactRouter],
    features: [
      {
        target: "$REACT_ROOT_COMPONENT",
        handler: { component: App }
      }
    ]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));
