import { useGetContext } from "@forrestjs/react-root";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const SurveyQuestion = ({ question, ...props }) => {
  const questionTypes = useGetContext("survey.question.types.items");

  // Get custom template for the Question
  const matchFn = ($) => $.type === question.schema.__schema;
  const template = questionTypes.find(matchFn);
  if (template) return <template.component {...props} question={question} />;

  // Visual feedback while in development
  if ("development" === process.env.NODE_ENV)
    return (
      <Alert severity="warning">
        <AlertTitle>Question type not found</AlertTitle>
        <pre>{JSON.stringify(question, null, 2)}</pre>
      </Alert>
    );

  // Log an error in production and ignore the
  console.error("Question type not found", question);
  return null;
};
