import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const onInit = async ({ getConfig, setContext }) => {
  const {
    backend = {},
    suspenseFallback = null,
    ...options
  } = getConfig("i18n", {});

  await i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init({
      debug: process.env.NODE_ENV === "development",
      ...options,
      backend: {
        allowMultiLoading: false,
        ...backend
      }
    });

  setContext("i18next.instance", i18next);
  setContext("i18next.suspenseFallback", suspenseFallback);
};
