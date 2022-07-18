import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const onInit = async ({ getConfig, setContext, createExtension }) => {
  const { suspenseFallback = null, ...receivedOptions } = getConfig(
    "i18Next",
    {}
  );

  const { value: options } = createExtension.waterfall("$I18NEXT_OPTIONS", {
    debug: process.env.NODE_ENV === "development",
    ...receivedOptions
  });

  const i18n = i18next.createInstance();
  createExtension.serie("$I18NEXT_INSTANCE", { i18n });
  await i18n.use(LanguageDetector).use(initReactI18next).init(options);

  setContext("i18next.instance", i18n);
  setContext("i18next.suspenseFallback", suspenseFallback);
};
