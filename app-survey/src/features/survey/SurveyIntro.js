import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Page from "../../components/Page";

export const SurveyIntro = ({ ak, questions }) => {
  const { t } = useTranslation("survey");

  const _t = (k) =>
    t(`survey:${k}`, {
      questions_length: questions.length,
      total_time: questions.length * 30
    });

  return (
    <Page withPadding title={_t("intro.title")}>
      <Typography variant="body1">{_t("intro.questions")}</Typography>
      <Typography variant="body1">{_t("intro.time")}</Typography>
      <Box sx={{ mt: 4 }}>
        <Button fullWidth variant="contained" onClick={ak}>
          {_t("intro.start")}
        </Button>
      </Box>
      <Typography variant="body1">
        <i>{_t("intro.resume")}</i>
      </Typography>
    </Page>
  );
};
