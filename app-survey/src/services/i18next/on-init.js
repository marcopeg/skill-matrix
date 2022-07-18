import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const onInit = async ({ getConfig, setContext, createExtension }) => {
  const {
    backend = {},
    suspenseFallback = null,
    ...receivedOptions
  } = getConfig("i18Next", {});

  const { value: options } = createExtension.waterfall("$I18NEXT_OPTIONS", {
    debug: process.env.NODE_ENV === "development",
    ...receivedOptions,
    backend: {
      allowMultiLoading: false,
      ...backend
    }
  });

  const instance = i18next.createInstance();
  await instance
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init(options);

  setContext("i18next.instance", instance);
  setContext("i18next.suspenseFallback", suspenseFallback);
};
