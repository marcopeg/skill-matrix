import { SwitchLanguage } from "./SwitchLanguage";

export const switchLanguage = () => [
  {
    target: "$APP_TOOLBAR",
    handler: { component: SwitchLanguage }
  }
];
