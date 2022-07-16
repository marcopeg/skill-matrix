import { useGetContext } from "@forrestjs/react-root";
import { I18nextProvider } from "react-i18next";

export const I18nWrapper = ({ children }) => {
  const i18n = useGetContext("i18next");
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
