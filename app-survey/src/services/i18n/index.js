import { onInit } from "./on-init";
import { I18nWrapper } from "./I18nWrapper";

export const i18n = () => {
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
