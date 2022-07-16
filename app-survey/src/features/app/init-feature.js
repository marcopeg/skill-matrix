export const onInitFeature = ({
  createExtension,
  getConfig,
  getContext,
  setContext
}) => {
  const contentToolbar = createExtension.sync("$APP_TOOLBAR").map(($) => $[0]);
  const contentView = createExtension.sync("$APP_VIEW").map(($) => $[0]);
  const appTitle = getConfig("app.title", "SurveyAPP");

  setContext("app", {
    title: appTitle,
    toolbar: {
      items: contentToolbar
    },
    view: {
      items: contentView
    }
  });
};
