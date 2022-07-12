import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useSurvey } from "./use-survey";

export const SurveySelect = () => {
  const { availableViewModes, viewMode, setViewMode, progress } = useSurvey();
  if (availableViewModes.length < 2) return null;

  // Hide selector if the survey is completed.
  if (progress === 100) return null;

  return (
    <Stack direction="row" spacing={2}>
      {availableViewModes.map((item) => (
        <IconButton
          key={item.id}
          onClick={() => setViewMode(item)}
          sx={{
            ...(item.id === viewMode.id ? { color: "primary.main" } : {})
          }}
        >
          <item.icon />
        </IconButton>
      ))}
    </Stack>
  );
};
