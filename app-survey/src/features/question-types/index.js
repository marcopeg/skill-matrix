import { QuestionStarV1 } from "./QuestionStarV1";
import { QuestionBoolV1 } from "./QuestionBoolV1";
import { QuestionScaleV1 } from "./QuestionScaleV1";
import { QuestionMultiV1 } from "./QuestionMultiV1";

export const questionTypes = () => [
  {
    target: "$SURVEY_QUESTION_TYPE",
    handler: {
      type: "question:star@1",
      component: QuestionStarV1
    }
  },
  {
    target: "$SURVEY_QUESTION_TYPE",
    handler: {
      type: "question:bool@1",
      component: QuestionBoolV1
    }
  },
  {
    target: "$SURVEY_QUESTION_TYPE",
    handler: {
      type: "question:scale@1",
      component: QuestionScaleV1
    }
  },
  {
    target: "$SURVEY_QUESTION_TYPE",
    handler: {
      type: "question:multi@1",
      component: QuestionMultiV1
    }
  }
];
