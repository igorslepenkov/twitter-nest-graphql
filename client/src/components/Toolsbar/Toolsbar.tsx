import { List } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { ToolsbarItem } from "../ToolsbarItem";

export const Toolsbar = () => {
  return (
    <List>
      <ToolsbarItem
        text="Home"
        icon={<TwitterIcon color="primary" fontSize="large" />}
        twitter
      />

      <ToolsbarItem text="Browse" icon={<SearchIcon fontSize="large" />} />

      <ToolsbarItem text="Settings" icon={<SettingsIcon fontSize="large" />} />
    </List>
  );
};
