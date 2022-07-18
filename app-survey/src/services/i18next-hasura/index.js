export const i18NextHasura = () => [
  {
    target: "$I18NEXT_OPTIONS",
    handler: (options, { getConfig }) => {
      console.log("***", options);
      const restUrl = getConfig("i18NextHasura.restUrl");
      console.log(restUrl);

      return {
        ...options,
        backend: {
          ...(options.backend || {}),
          loadPath: `${restUrl}/i18next/locales/{{lng}}/{{ns}}`,
          addPath: `${restUrl}/i18next/i18next/keys`,
          parse: (data) => {
            try {
              return JSON.parse(data).hits[0].records;
            } catch (err) {
              return {};
            }
          },
          parsePayload: (namespace, key) => ({ namespace, key })
        }
      };
    }
  }
];
