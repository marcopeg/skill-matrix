import { onInit } from "./on-init";
import { I18nWrapper } from "./I18nWrapper";

export const i18Next = ({ registerTargets }) => {
  registerTargets({
    I18NEXT_OPTIONS: "i18next/options",
    I18NEXT_INSTANCE: "i18next/instance"
  });

  return [
    {
      target: "$INIT_SERVICE",
      handler: onInit
    },
    {
      target: "$REACT_ROOT_WRAPPER",
      handler: { component: I18nWrapper }
    }
  ];
};
