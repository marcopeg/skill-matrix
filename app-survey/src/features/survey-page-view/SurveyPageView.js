import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export const SurveyPageView = ({ questions, renderQuestion }) => {
  // Here some hooks should provide the division by page
  // then current page and current question...

  return (
    <>
      <Stack divider={<Divider orientation="horizontal" flexItem />}>
        {questions.map(($) =>
          renderQuestion($, {
            onConfirm: (e) => console.log("confirm value", e)
          })
        )}
      </Stack>
    </>
  );
};
