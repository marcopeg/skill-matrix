import { useTranslation } from "react-i18next";
import { useQuery, gql } from "../../services/hasura-client";

const LOAD_LANGUAGES = gql`
  query getLanguages {
    items: i18n_languages {
      id
      label
    }
  }
`;

export const useLanguages = () => {
  const { i18n, t } = useTranslation("lang");
  const { isLoading, isSuccess, data } = useQuery(
    "loadLanguages",
    LOAD_LANGUAGES
  );

  return {
    isLoading,
    isSuccess,
    value: isSuccess ? i18n.language : "",
    setValue: i18n.changeLanguage,
    items: isSuccess
      ? data.items.map((item) => ({
          ...item,
          label: t(item.label)
        }))
      : []
  };
};
