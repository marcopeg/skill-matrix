import React, { Suspense } from "react";
import { useGetContext } from "@forrestjs/react-root";
import { I18nextProvider } from "react-i18next";

export const I18nWrapper = ({ children }) => {
  const i18n = useGetContext("i18next.instance");
  const suspenseFallback = useGetContext("i18next.suspenseFallback");

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </I18nextProvider>
  );
};
