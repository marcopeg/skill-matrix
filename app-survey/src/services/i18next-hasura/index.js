import HttpApi from "i18next-http-backend";
export const i18NextHasura = () => [
  {
    target: "$I18NEXT_OPTIONS",
    handler: (options, { getConfig }) => {
      const restUrl = getConfig("i18NextHasura.restUrl");
      const saveMissing = getConfig("i18NextHasura.saveMissing");

      return {
        ...options,
        ...(saveMissing ? { saveMissing: true } : {}),
        backend: {
          ...(options.backend || {}),
          allowMultiLoading: false,
          loadPath: `${restUrl}/i18next/locales/{{lng}}/{{ns}}`,
          addPath: `${restUrl}/i18next/keys`,
          parse: (data) => JSON.parse(data).hits[0].records,
          parsePayload: (namespace, key) => ({ namespace, key })
        }
      };
    }
  },
  {
    target: "$I18NEXT_INSTANCE",
    handler: ({ i18n }) => i18n.use(HttpApi)
  }
];
