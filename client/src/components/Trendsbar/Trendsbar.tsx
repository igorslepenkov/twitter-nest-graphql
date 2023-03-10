import { List, ListItem, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import { Searchbar } from "../Searchbar";

export const Trendsbar = () => {
  const wrapperStyles = {
    display: "flex",
    flexDirection: "column",
  };
  const trendsbarStyles = {
    display: "flex",
    flexDirection: "column",
    width: "330px",
    backgroundColor: "rgb(247, 249, 249)",
    borderRadius: "30px",
  };
  return (
    <Box sx={wrapperStyles}>
      <Searchbar id="trendsbar__searchbar" placeholder="Search trends" />
      <Box sx={trendsbarStyles}>
        <List>
          <ListItem>
            <ListItemButton>SomeTrends</ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>SomeTrends</ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>SomeTrends</ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
