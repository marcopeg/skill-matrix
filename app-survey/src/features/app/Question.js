import { QuestionDefault } from "./QuestionDefault";
// import { QuestionStar } from "./QuestionStar";

const types = {
  // "question:star@1": QuestionStar
};

export const Question = ({ schema, score, answer, ...question }) => {
  const { __schema, ...schemaData } = schema;

  const Cmp = types[__schema] || QuestionDefault;

  return <Cmp {...schemaData} initialValue={score} answer={answer} />;
};
