import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { SurveyPageView } from "./SurveyPageView";

export const surveyPageView = () => [
  {
    target: "$SURVEY_RENDER_MODE",
    handler: {
      id: "page-view",
      icon: AssignmentOutlinedIcon,
      component: SurveyPageView
    }
  }
];
