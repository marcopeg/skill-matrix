import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import { SurveyItemView } from "./SurveyItemView";

export const surveyItemView = () => [
  {
    target: "$SURVEY_RENDER_MODE",
    handler: {
      id: "item-view",
      icon: CenterFocusStrongOutlinedIcon,
      component: SurveyItemView
    }
  }
];
