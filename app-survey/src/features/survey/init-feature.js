export const onInitFeature = ({ createExtension, setContext }) => {
  const renderModes = createExtension
    .sync("$SURVEY_RENDER_MODE")
    .map(($) => $[0]);

  setContext("survey.render.modes.items", renderModes);
};
