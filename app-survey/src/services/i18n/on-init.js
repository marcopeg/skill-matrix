import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const onInit = async ({ getConfig, setContext }) => {
  const { backend = {}, ...options } = getConfig("i18n", {});

  await i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init({
      debug: process.env.NODE_ENV === "development",
      load: "languageOnly",
      fallbackLng: false,
      interpolation: {
        escapeValue: false
      },
      ...options,
      backend: {
        allowMultiLoading: false,
        ...backend
      }
    });

  setContext("i18next", i18next);
};
