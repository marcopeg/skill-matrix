export const onInitFeature = ({ createExtension, setContext, getConfig }) => {
  const contentToolbar = createExtension.sync("$APP_TOOLBAR").map(($) => $[0]);

  const contentView = createExtension.sync("$APP_VIEW").map(($) => $[0]);

  console.log({ contentToolbar, contentView });

  setContext("app", {
    toolbar: {
      items: contentToolbar
    },
    view: {
      items: contentView
    }
  });
};
