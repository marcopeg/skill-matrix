import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Page from "../../components/Page";

export const SurveyIntro = ({ ak, questions }) => {
  const { t } = useTranslation();

  const _t = (k) =>
    t(k, {
      questions_length: questions.length,
      total_time: questions.length * 30
    });

  return (
    <Page withPadding title={_t("survey.intro.title")}>
      <Typography variant="body1">{_t("survey.intro.questions")}</Typography>
      <Typography variant="body1">{_t("survey.intro.time")}</Typography>
      <Box sx={{ mt: 4 }}>
        <Button fullWidth variant="contained" onClick={ak}>
          {_t("survey.intro.start")}
        </Button>
      </Box>
      <Typography variant="body1">
        <i>{_t("survey.intro.resume")}</i>
      </Typography>
    </Page>
  );
};
