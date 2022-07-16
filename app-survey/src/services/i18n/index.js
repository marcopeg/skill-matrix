import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nWrapper } from "./I18nWrapper";

const resources = {
  en: {
    translation: {
      survey: {
        intro: {
          time: "The process is going to take approximately {{ total_time }} seconds.",
          start: "Start!",
          title: "Welcome to the survey",
          resume:
            "You can stop the process at any point in time and come back to it when you have time to continue.",
          questions: "There are {{ questions_length }} questions in this survey"
        }
      }
    }
  },
  it: {
    translation: {
      users: { form: { fields: { name: "Nome:", surname: "Cognome:" } } }
    }
  }
};

export const i18n = () => {
  return [
    {
      target: "$INIT_SERVICE",
      handler: (_, { setContext }) => {
        i18next.use(initReactI18next).init({
          debug: true,
          resources,
          lng: "en",
          interpolation: {
            escapeValue: false
          }
        });

        setContext("i18next", i18next);
      }
    },
    {
      target: "$REACT_ROOT_WRAPPER",
      handler: { component: I18nWrapper }
    }
  ];
};

export default i18next;
