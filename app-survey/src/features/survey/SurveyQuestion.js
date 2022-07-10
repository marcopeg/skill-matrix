import { useGetContext } from "@forrestjs/react-root";

export const SurveyQuestion = ({ question }) => {
  const questionTypes = useGetContext("survey.question.types.items");

  console.log(questionTypes);

  return <pre>{JSON.stringify(question, null, 2)}</pre>;
};
