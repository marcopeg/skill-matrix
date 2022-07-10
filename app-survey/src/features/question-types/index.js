import { QuestionStarV1 } from "./QuestionStarV1";

export const questionTypes = () => [
  {
    target: "$SURVEY_QUESTION_TYPE",
    handler: {
      type: "question:star@1",
      component: QuestionStarV1
    }
  }
];
