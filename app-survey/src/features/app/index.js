import { onInitFeature } from "./init-feature";
import { App } from "./App";

export const app = ({ registerTargets }) => {
  registerTargets({
    APP_TOOLBAR: "app/toolbar",
    APP_VIEW: "app/view"
  });

  return [
    {
      target: "$INIT_FEATURE",
      handler: onInitFeature
    },
    {
      target: "$REACT_ROOT_COMPONENT",
      handler: { component: App }
    }
  ];
};
