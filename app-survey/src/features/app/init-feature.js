export const onInitFeature = ({ createExtension, setContext }) => {
  const contentToolbar = createExtension.sync("$APP_TOOLBAR").map(($) => $[0]);
  const contentView = createExtension.sync("$APP_VIEW").map(($) => $[0]);

  setContext("app", {
    toolbar: {
      items: contentToolbar
    },
    view: {
      items: contentView
    }
  });
};
