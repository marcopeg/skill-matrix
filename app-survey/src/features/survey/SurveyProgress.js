import Box from "@mui/material/Box";

import { useSurvey } from "./use-survey";

export const SurveyProgress = () => {
  const { questions } = useSurvey();

  const answered = questions.filter(($) => $.score !== null);
  console.log(questions, answered);
  // return `progress ${answered.length}/${questions.length} ${
  //   answered.length / questions.length
  // }`;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "success.light"
      }}
    >
      <Box
        sx={{
          width: `${(answered.length / questions.length) * 100}%`,
          height: 2,
          backgroundColor: "success.dark"
        }}
      />
    </Box>
  );
};
