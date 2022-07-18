import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLanguages } from "./useLanguages";

export const SwitchLanguage = () => {
  const { items, value, setValue } = useLanguages();

  return (
    <FormControl>
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          color: "primary.contrastText",
          root: {
            border: "4px solid red"
          },
          "& .MuiSelect-icon": {
            color: "primary.contrastText"
          }
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
