import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Page from "../../components/Page";

import { useGetContext } from "@forrestjs/react-root";
import { useSurvey } from "./use-survey";

import { SurveySelect } from "./SurveySelect";
import { SurveyProgress } from "./SurveyProgress";

export const SurveyView = () => {
  const {
    viewMode,
    isLoading,
    isReady,
    isBeginning,
    isCompleted,
    showIntro,
    akIntro,
    ...api
  } = useSurvey();

  const IntroView = useGetContext("survey.intro.component");
  const CompletedView = useGetContext("survey.completed.component");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  // No view mode is set - alert
  if (!viewMode)
    return (
      <Alert severity="warning">
        <AlertTitle>
          Survey has no available <i>View Modes</i>
        </AlertTitle>
        Please add at least one <i>View Mode</i> as so to render the Survey
        questions.
      </Alert>
    );

  // Take care of the loading time here
  if (isLoading)
    return (
      <Stack direction="row" justifyContent="center" sx={{ mt: 10, mb: 10 }}>
        <CircularProgress />
      </Stack>
    );

  // It finished loading but something goes wrong
  if (!isReady)
    return (
      <Alert severity="warning">
        <AlertTitle>Oooops!</AlertTitle>
        Something went wrong while fetching your data!
      </Alert>
    );

  if (showIntro) return <IntroView {...api} ak={akIntro} />;
  if (isCompleted) return <CompletedView {...api} />;

  // Render current view mode and pass on the Survey APIs
  return (
    <Page
      title={viewMode.title || "Fill the Survey"}
      headerActions={
        isSmallScreen
          ? [<SurveySelect key="a1" />, <SurveyProgress key="a2" />]
          : null
      }
      footerActions={
        isSmallScreen
          ? null
          : [<SurveySelect key="a1" />, <SurveyProgress key="a2" />]
      }
    >
      <viewMode.component {...api} />
    </Page>
  );
};
