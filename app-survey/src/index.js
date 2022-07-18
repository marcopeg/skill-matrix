// Import Libraries:
import forrest from "@forrestjs/core";

// Import Services:
import reactRoot from "@forrestjs/react-root";
import reactMUI from "@forrestjs/react-mui";
import reactRouter from "@forrestjs/react-router";
import { hasuraClient } from "./services/hasura-client";
import { i18n } from "./services/i18n";

// Import Features:
import { layout } from "./features/layout";
import { auth } from "./features/auth";
import { app } from "./features/app";
import { survey } from "./features/survey";
import { surveyPageView } from "./features/survey-page-view";
import { surveyItemView } from "./features/survey-item-view";
import { questionTypes } from "./features/question-types";
import { switchLanguage } from "./features/switch-language";

const BASE_URL = process.env.REACT_APP_BASE_URL || `http://localhost:8080`;

forrest
  .run({
    settings: {
      i18n: {
        ns: ["translation", "survey"],
        fallbackLng: "en",
        saveMissing: true,
        backend: {
          loadPath:
            process.env.REACT_APP_I18NEXT_LOAD_PATH ||
            `${BASE_URL}/api/rest/i18next/locales/{{lng}}/{{ns}}`,
          addPath:
            process.env.REACT_APP_I18NEXT_ADD_PATH ||
            `${BASE_URL}/api/rest/i18next/keys`,
          parse: (data) => {
            try {
              return JSON.parse(data).hits[0].records;
            } catch (err) {
              return {};
            }
          },
          parsePayload: (namespace, key, fallbackValue) => {
            console.log("-----", namespace, key, fallbackValue);
            return { namespace, key };
          }
        }
      },
      hasuraClient: {
        endpoint:
          process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT ||
          `${BASE_URL}/v1/graphql`
      }
    },
    services: [reactRoot, reactMUI, reactRouter, hasuraClient, i18n],
    features: [
      layout,
      auth,
      app,
      survey,
      surveyPageView,
      surveyItemView,
      questionTypes,
      switchLanguage
    ]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));
